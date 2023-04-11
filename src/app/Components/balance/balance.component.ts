import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ErrorService } from 'src/app/Services/error.service';
import { PaymentsService } from 'src/app/Services/payments.service';
import { UsersService } from 'src/app/Services/users.service';

declare let Stripe: any;

@Component({
  selector: 'app-balance',
  templateUrl: './balance.component.html',
  styleUrls: ['./balance.component.css']
})
export class BalanceComponent implements OnInit {

  cants: number[] = [5, 10, 20, 30, 40, 50];
  cantSel: string = "0";
  transactionId?: string
  stripe = Stripe("pk_test_51MvMJNAottYqiZ8FMHuVU1L5gheqe9WJNwsu0h7Ug80RIiEMrFfyUnbV4gjPkJmb2zaYPB6sNpzhZYmJ6GRqHuaf00UQmzEBfY");
  msgError: string = "";
  saldo: number = 0;


  constructor(private router: Router, private _paymentService: PaymentsService, private _errorService: ErrorService, private _usersService: UsersService) {}

  ngOnInit(): void {
    this.consultarSaldoUsuario();
  }

  back(): void {
    this.router.navigate(['/home']);
  }

  onSelect(): void {
    console.log('cantsel: ' + this.cantSel);
    const cantidad: number = parseInt(this.cantSel);
    if (cantidad > 0)
      this._paymentService.prepay(cantidad).subscribe(
        (data) => {
          console.log(data);
          this.transactionId = data.body
          this.showForm()
        },
        (error) => {
          console.log(error);
        }
      );
  }

  showForm(): void {
    let elements = this.stripe.elements()
    let style = {
      base: {
        color: "#32325d",
        fontSmoothing: "antialiased",
        fontSize: "16px",
        "::placeholder": {
          color: "#32325d"
        }
      },

      invalid: {
        color: "#fa755a",
        iconColor: "#fa755a"
      }
    }
    let card = elements.create("card", { style: style })
    card.mount("#card-element")
    card.on("change", (event: any) => {
      document.querySelector("button")!.disabled = event.empty;
      if (event.error) {
        this.setMessage(event.error.message);
      }
    });

    let self = this
    let form = document.getElementById("payment-form");
    form!.addEventListener("submit", function (event) {
      event.preventDefault();
      self.payWithCard(card);
    });
    form!.style.display = "block";

  }

  setMessage(message: string) {
    this.msgError = message;
    this._errorService.setError(message);
  }

  payWithCard(card: any) {
    let self = this
    this.stripe.confirmCardPayment(this.transactionId, {
      payment_method: {
        card: card
      }
    }).then((response: any) => {
      if (response.error) {
        alert(response.error.message);
      } else {
        if (response.paymentIntent.status === 'succeeded') {
          this._errorService.setSuccess("Pago exitoso");
          self._paymentService.confirm().subscribe(
            (data) => {
              console.log(data);
              this._errorService.setSuccess("Saldo actualizado correctamente");
              this.consultarSaldoUsuario();
            },
            (error) => {
              console.log(error);

              if(error.status == 402){
                this._errorService.setError("El pago no ha podido ser confirmado");
              }else if(error.status == 404){
                this._errorService.setError("No se ha encontrado el usuario para actualizar el saldo");
              }else if(error.status == 500){
                this._errorService.setError("Error en el servidor al actualizar el saldo");
              }else{
                this._errorService.setError("Error desconocido al actualizar el saldo");
              }
            }
          );
        }
      }
    });
  }

  consultarSaldoUsuario(): void {
    this._usersService.consultarSaldoUsuario().subscribe(
      (data) => {
        console.log(data);
        this.saldo = data.body.userBalance;
      },
      (error) => {
        console.log(error);
        this._errorService.setError("Error al consultar el saldo del usuario");
      }
    );
  }
}
