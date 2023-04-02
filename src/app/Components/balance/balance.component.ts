import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-balance',
  templateUrl: './balance.component.html',
  styleUrls: ['./balance.component.css']
})
export class BalanceComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  actualizarSaldo(): void {
    
  }

  back(): void {
    this.router.navigate(['/home']);
  }
}
