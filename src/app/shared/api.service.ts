import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Magazin } from './magazin.model';
import { Categorie } from './categorie.model';
import { Echipament } from './echipament.model';


@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) {}

  header = new HttpHeaders({
    'Content-Type': 'application/json'
  });
  baseUrl = 'https://localhost:44344/api';
 
  getEchipament(id: number) {
    return this.http.get(this.baseUrl + '/echipament/' + id.toString(), { headers: this.header });
  }

  getMagazin(id: number) {
    return this.http.get(this.baseUrl + '/magazin/' + id.toString(), { headers: this.header });
  }

  getCategorie(id: number) {
    return this.http.get(this.baseUrl + '/categorie/' + id.toString(), { headers: this.header });
  }

  getProducator(id: number) {
    return this.http.get(this.baseUrl + '/producator/' + id.toString(), { headers: this.header });
  }



  getEchipaments() {
    return this.http.get(this.baseUrl + '/echipament', { headers: this.header });
  }

  getMagazins() {
    return this.http.get(this.baseUrl + '/magazin', { headers: this.header });
  }

  getCategories() {
    return this.http.get(this.baseUrl + '/categorie', { headers: this.header });
  }



  addMagazin(magazin: Magazin) {
    return this.http.post(this.baseUrl + '/magazin', magazin, { headers: this.header });
  }

  addCategorie(categorie: Categorie) {
    return this.http.post(this.baseUrl + '/categorie', categorie, { headers: this.header });
  }

  addEchipament(echipament) {
    return this.http.post(this.baseUrl + '/echipament', {

      'numeEchipament': echipament.numeEchipament,
      'descriere':echipament.descriere,
      'specificatii': echipament.specificatii,
      'producatorId': echipament.producatorId,
      'pret':echipament.pret,
      'anAparitie':echipament.anAparitie,
      'magazinId': JSON.parse('[' + echipament.magazinId + ']'),
      'categorieId':  JSON.parse('[' + echipament.categorieId + ']'),
      'img': echipament.img
    }, { headers: this.header });

  }



  deleteEchipament(id: number) {
    return this.http.delete(this.baseUrl + '/echipament/' + id.toString(), { headers: this.header });
  }

  deleteMagazin(id: number) {
    return this.http.delete(this.baseUrl + '/magazin/' + id.toString(), { headers: this.header });
  }

  deleteCategorie(id: number) {
    return this.http.delete(this.baseUrl + '/categorie/' + id.toString(), { headers: this.header });
  }




  
  editEchipament(echipament: Echipament) {

    return this.http.put(this.baseUrl + '/echipament/' + echipament.id.toString(), echipament, { headers: this.header });
  }

  editCategorie(categorie: Categorie) {
    return this.http.put(this.baseUrl + '/categorie/' + categorie.id.toString(), categorie, { headers: this.header });
  }

  editMagazin(magazin: Magazin) {
    return this.http.put(this.baseUrl + '/magazin/' + magazin.id.toString(), magazin, { headers: this.header });
  }

}

