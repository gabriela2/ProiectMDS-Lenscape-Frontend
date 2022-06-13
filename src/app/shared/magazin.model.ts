export class Magazin {
   id: number;
   nume: string;
   adresa: string;

  constructor(input?: any) {
    Object.assign(this, input);
  }
}
