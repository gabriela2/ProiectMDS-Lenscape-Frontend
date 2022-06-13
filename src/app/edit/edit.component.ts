import { Component, OnInit, ViewChild } from '@angular/core';
import { ApiService } from '../shared/api.service';
import { Echipament } from '../shared/echipament.model';
import { Categorie } from '../shared/categorie.model';
import { Magazin } from '../shared/magazin.model';
import { EditEchipamentModalComponent } from './edit-echipament-modal/edit-echipament-modal.component';
import { EditCategorieModalComponent } from './edit-categorie-modal/edit-categorie-modal.component';
import { EditMagazinModalComponent } from './edit-magazin-modal/edit-magazin-modal.component';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  echipaments: Echipament[] = [];
  categories: Categorie[] = [];
  magazins: Magazin[] = [];



  @ViewChild('editEchipamentModal') editEchipamentModal: EditEchipamentModalComponent;
  @ViewChild('editCategorieModal') editCategorieModal: EditCategorieModalComponent;
  @ViewChild('editMagazinModal') editMagazinModal: EditMagazinModalComponent;


  constructor(private api: ApiService) { }

  ngOnInit() {
    this.getEchipaments();
    this.getCategories();
    this.getMagazins();
  }

  getEchipaments() {
    this.api.getEchipaments()
      .subscribe((data: Echipament[]) => {
        this.echipaments = [];

        for (let i = 0; i < data.length; i++) {
          this.api.getEchipament(data[i].id)
            .subscribe((info: Echipament) => {
              info.id = data[i].id;
              this.echipaments.push(info);
            },
              (e: Error) => {
                console.log('err', e);
              });
        }

      },
        (error: Error) => {
          console.log('err', error);

        });
  }

  getCategories() {

    this.api.getCategories()
      .subscribe((data: Categorie[]) => {
        this.categories = data;
      },
        (error: Error) => {
          console.log('err', error);
        });
  }

  getMagazins() {
    this.api.getMagazins()
      .subscribe((data: Magazin[]) => {
        this.magazins = data;
      },
        (error: Error) => {
          console.log('err', error);

        });
  }

  deleteEchipament(id: number) {
    this.api.deleteEchipament(id)
      .subscribe(() => {
        this.getEchipaments();
      },
        (error: Error) => {
          console.log(error);
        });
  }

  deleteCategorie(id: number) {
    this.api.deleteCategorie(id)
      .subscribe(() => {
        this.getCategories();
      },
        (error: Error) => {
          console.log(error);
        });
  }

  deleteMagazin(id: number) {
    this.api.deleteMagazin(id)
      .subscribe(() => {
        this.getMagazins();
      },
        (error: Error) => {
          console.log(error);
        });

  }

  showM1(id: number) {
    this.editEchipamentModal.initialize(id);
  }

  showM2(id: number) {
    this.editCategorieModal.initialize(id);
  }

  showM3(id: number) {
    this.editMagazinModal.initialize(id);
  }

  onEditFinished(event: string) {
    if (event === 'echipament') {
      this.getEchipaments();
    }
    if (event === 'categorie') {
      this.getCategories();
    }
    if (event === 'magazin') {
      this.getMagazins();
    }


  }

}
