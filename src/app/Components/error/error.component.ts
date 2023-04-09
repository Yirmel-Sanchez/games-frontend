import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { UsersService } from 'src/app/Services/users.service';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.css']
})
export class ErrorComponent implements OnInit, OnDestroy {
  texto = '';
  tipoAlerta = 'info';
  mostrar = false;
  /*suscription: Subscription;
  suscription2: Subscription;

  constructor(private _usersService: UsersService) {
    this.suscription = this._usersService.getError().subscribe(data =>{
      this.mostrarMensaje();
      this.texto = data;
    });
    this.suscription2 = this._usersService.getTipoError().subscribe(data =>{
      this.mostrarMensaje();
      this.tipoAlerta = data;
    });
   }*/

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    //this.suscription.unsubscribe();
  }

  mostrarMensaje() {
    this.mostrar = true;
    setTimeout(() => {
      this.mostrar = false;
    }, 4000);  
  }

}
