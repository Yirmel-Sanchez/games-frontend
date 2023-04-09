import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ErrorService } from 'src/app/Services/error.service';

@Component({
  selector: 'app-error-bar',
  templateUrl: './error-bar.component.html',
  styleUrls: ['./error-bar.component.css']
})
export class ErrorBarComponent implements OnInit, OnDestroy {

  texto = '';
  tipoAlerta = 'info';
  mostrar = false;
  suscription: Subscription;
  suscription2: Subscription;

  constructor(private _errorService: ErrorService) {
    this.suscription2 = this._errorService.getTipoError().subscribe(data =>{
      this.tipoAlerta = data;  
    });
    this.suscription = this._errorService.getError().subscribe(data =>{
      this.texto = data;
      this.mostrarMensaje();      
    });
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.suscription.unsubscribe();
  }

  mostrarMensaje() {
    this.mostrar = true;
    setTimeout(() => {
      this.mostrar = false;
    }, 4000);  
  }

}
