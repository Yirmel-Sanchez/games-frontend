import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Partida1Component } from './partida1.component';

describe('Partida1Component', () => {
  let component: Partida1Component;
  let fixture: ComponentFixture<Partida1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Partida1Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Partida1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
