
import {Injectable} from '@angular/core';
import {Echipament} from './echipament.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  echipaments: Echipament[] =[];


  constructor() {

  }

  add(echipament: Echipament){
    this.echipaments.push(echipament);

  }

  get() {
    return this.echipaments;
  }


}
