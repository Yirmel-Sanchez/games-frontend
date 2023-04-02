import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.css']
})
export class ResultComponent implements OnInit {

  ganador: string = "";
  id: string = "";

  constructor(private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.id = params['id'];
    });

    this.ganador = this.peticionGanador();
  }
  peticionGanador(): string {
    return "Jugador 1";
  }

  goHome(): void {
    this.router.navigate(['/home']);
  }
}
