export class User {
  nombre: string = '';
  correo: string = '';
  pass: string = '';
  saldo: number = 0;
  
  constructor(nombre: string, correo: string, pass: string, saldo: number) {
    this.nombre = nombre;
    this.correo = correo;
    this.pass = pass;
    this.saldo = saldo;
  }
}