export class Categorie {
  id: number;
  numeCategorie: string;
  specificatii: string;
  descriere: string;
  echipamentCategorie: string;

  constructor(input?: any) {
    Object.assign(this, input);
  }
}
