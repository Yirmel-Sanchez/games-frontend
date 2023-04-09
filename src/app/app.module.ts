import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegisterComponent } from './Components/register/register.component';
import { LoginComponent } from './Components/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SelectGameComponent } from './Components/select-game/select-game.component';
import { NavbarComponent } from './Components/navbar/navbar.component';
import { StartGameComponent } from './Components/start-game/start-game.component';
import { WaitRoomComponent } from './Components/wait-room/wait-room.component';
import { ResultComponent } from './Components/result/result.component';
import { BalanceComponent } from './Components/balance/balance.component';
import { PartidaComponent } from './Components/partida/partida.component';
import { TableroComponent } from './Components/tablero/tablero.component';
import { ErrorComponent } from './Components/error/error.component';
import { ErrorBarComponent } from './Components/error-bar/error-bar.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    SelectGameComponent,
    NavbarComponent,
    StartGameComponent,
    WaitRoomComponent,
    ResultComponent,
    BalanceComponent,
    PartidaComponent,
    TableroComponent,
    ErrorComponent,
    ErrorBarComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
