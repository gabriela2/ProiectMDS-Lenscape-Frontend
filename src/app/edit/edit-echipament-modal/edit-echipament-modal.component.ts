import { Component, EventEmitter, Output, ViewChild } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../../shared/api.service';
import { Echipament } from '../../shared/echipament.model';
import { ModalDirective } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-edit-echipament-modal',
  templateUrl: './edit-echipament-modal.component.html',
  styleUrls: ['./edit-echipament-modal.component.css']
})
export class EditEchipamentModalComponent {
  @ViewChild('editEchipamentModal') modal: ModalDirective;
  @Output() change: EventEmitter<string> = new EventEmitter<string>();
  editEchipamentForm: FormGroup;
  currentEchipament = new Echipament();


  constructor(public fb: FormBuilder, private api: ApiService) { }

  initialize(id: number): void {
    this.modal.show();
    this.api.getEchipament(id)
      .subscribe((data: Echipament) => {
        this.currentEchipament = data;
        this.currentEchipament.id = id;
        this.initializeFrom(this.currentEchipament);
      },
        (error: Error) => {
          console.log('err', error);

        });
  }

  initializeFrom(currentEchipament: Echipament) {
    this.editEchipamentForm = this.fb.group({
      numeEchipament: [currentEchipament.numeEchipament, Validators.required],
      descriere: [currentEchipament.descriere, Validators.required],
      specificatii: [currentEchipament.specificatii, Validators.required],
      producatorId: [currentEchipament.producatorId, Validators.required],
      pret: [currentEchipament.pret, Validators.required],
      anAparitie: [currentEchipament.anAparitie, Validators.required],
      categorieId: ['', Validators.required],
      magazinId: ['', Validators.required],
      img: [currentEchipament.img],
    });
  }

  editEchipament() {
    const editedEchipament = new Echipament({
      id: this.currentEchipament.id,
      numeEchipament: this.editEchipamentForm.value.numeEchipament,
      descriere: this.editEchipamentForm.value.descriere,
      specificatii: this.editEchipamentForm.value.specificatii,
      producatorId: this.editEchipamentForm.value.producatorId,
      pret: this.editEchipamentForm.value.pret,
      anAparitie: this.editEchipamentForm.value.anAparitie,
      magazinId: this.transformInNumberArray(this.editEchipamentForm.value.magazinId),
      categorieId: this.transformInNumberArray(this.editEchipamentForm.value.categorieId),
      img: this.editEchipamentForm.value.img
    });

    this.api.editEchipament(editedEchipament)
      .subscribe(() => {
        this.change.emit('echipament');
        this.modal.hide();
      },
        (error: Error) => {
          console.log('err', error);
        });
  }

  transformInNumberArray(string: string) {
    return JSON.parse('[' + string + ']');
  }

}
