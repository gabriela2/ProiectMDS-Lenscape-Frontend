import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Categorie } from '../../shared/categorie.model';
import { ApiService } from '../../shared/api.service';


@Component({
  selector: 'app-edit-categorie-modal',
  templateUrl: './edit-categorie-modal.component.html',
  styleUrls: ['./edit-categorie-modal.component.css']
})
export class EditCategorieModalComponent {
  @ViewChild('editCategorieModal') modal: ModalDirective;
  @Output() change: EventEmitter<string> = new EventEmitter<string>();
  editCategorieForm: FormGroup;
  currentCategorie = new Categorie();

  constructor(public fb: FormBuilder, private api: ApiService) { }

  initialize(id: number): void {
    this.modal.show();
    this.api.getCategorie(id)
      .subscribe((data: Categorie) => {
        this.currentCategorie = data;
        this.initializeFrom(this.currentCategorie);
      },
        (error: Error) => {
          console.log('err', error);

        });
  }

  initializeFrom(currentCategorie: Categorie) {
    this.editCategorieForm = this.fb.group({
      numeCategorie: [currentCategorie.numeCategorie, Validators.required],
      specificatii: [currentCategorie.specificatii, Validators.required],
      descriere: [currentCategorie.descriere, Validators.required],
    });
  }

  editCategorie() {
    const editedCategorie = new Categorie({
      id: this.currentCategorie.id,
      numeCategorie: this.editCategorieForm.value.numeCategorie,
      specificatii: this.editCategorieForm.value.specificatii,
      descriere: this.editCategorieForm.value.descriere
    });

    this.api.editCategorie(editedCategorie)
      .subscribe(() => {
        this.change.emit('categorie');
        this.modal.hide();
      },
        (error: Error) => {
          console.log('err', error);
        });
  }

}



