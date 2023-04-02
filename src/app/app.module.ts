import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegisterComponent } from './Components/register/register.component';
import { LoginComponent } from './Components/login/login.component';
import { FormsModule } from '@angular/forms';
import { SelectGameComponent } from './Components/select-game/select-game.component';
import { NavbarComponent } from './Components/navbar/navbar.component';
import { StartGameComponent } from './Components/start-game/start-game.component';
import { WaitRoomComponent } from './Components/wait-room/wait-room.component';
import { ResultComponent } from './Components/result/result.component';
import { BalanceComponent } from './Components/balance/balance.component';

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
    BalanceComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
