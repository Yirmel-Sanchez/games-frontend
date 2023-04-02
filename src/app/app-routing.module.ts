import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './Components/login/login.component';
import { RegisterComponent } from './Components/register/register.component';
import { SelectGameComponent } from './Components/select-game/select-game.component';
import { StartGameComponent } from './Components/start-game/start-game.component';
import { WaitRoomComponent } from './Components/wait-room/wait-room.component';
import { ResultComponent } from './Components/result/result.component';
import { BalanceComponent } from './Components/balance/balance.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'home', component: SelectGameComponent },
  { path: 'start-game/:id', component: StartGameComponent},
  { path: 'waiting-room/:id', component: WaitRoomComponent},
  { path: 'result/:id', component: ResultComponent},
  { path: 'balance', component: BalanceComponent},
  { path: '**', redirectTo: ''}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
