import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Magazin } from '../../shared/magazin.model';
import { ApiService } from '../../shared/api.service';

@Component({
  selector: 'app-edit-magazin-modal',
  templateUrl: './edit-magazin-modal.component.html',
  styleUrls: ['./edit-magazin-modal.component.css']
})
export class EditMagazinModalComponent {
  @ViewChild('editMagazinModal') modal: ModalDirective;
  @Output() change: EventEmitter<string> = new EventEmitter<string>();
  editMagazinForm: FormGroup;
  currentMagazin = new Magazin();

  constructor(public fb: FormBuilder, private api: ApiService) {}

  initialize(id: number): void {

    this.modal.show();
    this.api.getMagazin(id)
      .subscribe((data: Magazin) => {
        this.currentMagazin = data;
        this.initializeFrom(this.currentMagazin);
      },
        (error: Error) => {
          console.log('err', error);
        });
  }

  initializeFrom(currentMagazin: Magazin) {
    this.editMagazinForm = this.fb.group({
      nume: [currentMagazin.nume, Validators.required],
      adresa: [currentMagazin.adresa, Validators.required],
    });
  }

  editMagazin() {
    const editedMagazin = new Magazin({
      id: this.currentMagazin.id,
      nume: this.editMagazinForm.value.nume,
      adresa: this.editMagazinForm.value.adresa
    });

    this.api.editMagazin(editedMagazin)
      .subscribe(() => {
        this.change.emit('magazin');
        this.modal.hide();
      },
        (error: Error) => {
          console.log('err', error);
        });

  }

}
