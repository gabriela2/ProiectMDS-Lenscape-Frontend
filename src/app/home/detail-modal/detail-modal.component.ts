import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { Echipament } from '../../shared/echipament.model';
import { ApiService } from '../../shared/api.service';
import { CartService } from '../../shared/cart.service';

@Component({
  selector: 'app-detail-modal',
  templateUrl: './detail-modal.component.html',
  styleUrls: ['./detail-modal.component.css']
})
export class DetailModalComponent implements OnInit {
  @ViewChild('detailModal') modal: ModalDirective;
  echipament = new Echipament();
  producator: string;
  stoc: number[];
 

  constructor(private api: ApiService, private cart: CartService) { }

  ngOnInit() {}

  initialize(id: number): void {
    this.getEchipament(id);
    this.modal.show();
  }

  getProducator(id: number) {
    this.api.getProducator(id)
      .subscribe((data: any) => {
        this.producator = data.numeProducator;
      },
        (err: Error) => {
          console.log('err', err);

        });
  }


  getEchipament(id: number) {
    this.api.getEchipament(id)
      .subscribe((data: Echipament) => {
        this.echipament = data;
        this.echipament.id = id;
      
        if (!data.img) {
          this.echipament.img = 'https://i.ibb.co/0cBJC3N/3.jpg';
        }
        this.getProducator(this.echipament.producatorId);
      },
        (err: Error) => {
          console.log('err', err);

        });
  }

  addToCart(echipament: Echipament) {
    this.cart.add(echipament);
    this.modal.hide();
  }
}
