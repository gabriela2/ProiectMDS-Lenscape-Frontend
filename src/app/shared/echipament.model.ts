export class Echipament {
  id: number;
  numeEchipament: string;
  descriere: string;
  specificatii: string;
  producatorId: number;
  pret:number;
  anAparitie: Date;
  
  numeCategorie: string[];
  nume: string[];
  magazinId: number[];
  categorieId: number[];
  img: string;

  constructor(input?: any) {
    Object.assign(this, input);
  }
}
