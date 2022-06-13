import { Component, OnInit, ViewChild } from '@angular/core';
import { Echipament } from '../shared/echipament.model';
import { ApiService } from '../shared/api.service';
import { DetailModalComponent } from './detail-modal/detail-modal.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  echipaments: Echipament[] = [];
  searchText: string;
  title: string;

  @ViewChild('detailModal') detailModal: DetailModalComponent;


  constructor(private api: ApiService) { }

  ngOnInit() {
    this.api.getEchipaments().subscribe((data: Echipament[]) => {

      for (let i = 0; i < data.length; i++) {
        this.api.getEchipament(data[i].id).subscribe((info: Echipament) => {
          info.id = data[i].id;
          if (!info.img) {
           info.img = 'https://i.ibb.co/JKjjDtx/vinyl-record-mid.jpg';
          }
        
          this.echipaments.push(info);
        },
          (e: Error) => {
            console.log('err', e);
          });
      }
    },
      (er: Error) => {
        console.log('err', er);
      });
  }

  showDM(id: number): void {
    this.detailModal.initialize(id);
  }

}
