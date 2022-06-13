import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../shared/api.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {
  options = ['Magazin', 'Categorie', 'Echipament'];
  selectedOption = 'Echipament';
  currentFormRef: any;
  addEchipamentForm: FormGroup;
  addCategorieForm: FormGroup;
  addMagazinForm: FormGroup;
  success: boolean;

  constructor(public fb: FormBuilder, private api: ApiService) { }


  ngOnInit() {

    this.addEchipamentForm = this.fb.group({
      numeEchipament: [null, Validators.required],
      descriere: [null, Validators.required],
      specificatii: [null, Validators.required],
      producatorId: [null, Validators.required],
      pret: [null, Validators.required],
      anAparitie: [null, Validators.required],
      categorieId: [null, Validators.required],
      magazinId: [null, Validators.required],
      img: [null]
    });
    this.addCategorieForm = this.fb.group({
      numeCategorie: [null, Validators.required],
      specificatii: [null, Validators.required],
      descriere: [null, Validators.required]
    });
    this.addMagazinForm = this.fb.group({
      nume: [null, Validators.required],
      adresa: [null, Validators.required],
    });

    this.currentFormRef = this.addEchipamentForm;

  }

  radioChange(event: any) {
    this.selectedOption = event.target.value;
    this.currentFormRef = this['add' + this.selectedOption + 'Form'];
    /*
      notatiile this.api si this[api] sunt echivalente

     folosind paratenze putem utiliza variabile

     this['add' + this.selectedOption + 'Form'] = this['addAlbumForm']  = this.addAlbumForm sau
                                                                        = this.addSongForm sau
                                                                        = this.addArtist
    */
  }

  add() {
    /*


    this.api['add' + this.selectedOption] = this.api['addAlbum'] = this.api.addAlbum sau
                                          = this.api['addSong] sau
                                          = this.api['addArtist]
    */
    this.api['add' + this.selectedOption](this.currentFormRef.value).subscribe(() => {

      this.currentFormRef.reset();
      this.success = true;
      setTimeout(() => {
        this.success = null;
      }, 3000);
    },
      (error: Error) => {
        console.log(error);
        this.currentFormRef.reset();
        this.success = false;
        setTimeout(() => {
          this.success = null;
        }, 3000);
      });

  }
}
