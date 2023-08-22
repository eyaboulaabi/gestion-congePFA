import { NotificationService } from './../service/notification.service';
import { DemandeService } from './../service/demande.service';
import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Demande } from '../models/demande';
import { ToastrService } from 'ngx-toastr';
declare const bootstrap: any; // Déclarez la variable bootstrap
@Component({
  selector: 'app-demande-admin',
  templateUrl: './demande-admin.component.html',
  styleUrls: ['./demande-admin.component.css']
})

export class DemandeAdminComponent {
  showAdd!: boolean;
  showUpdate!: boolean;
  demandes!: Demande[];
  formValue!: FormGroup;
  searchText: string = '';
  formModal: any;
  formModal2: any;
  @ViewChild('myModal') myModal: any;
  @ViewChild('myModal2') myModal2: any;
  demandemodelobj: Demande = new Demande;
  constructor(private demandeService: DemandeService,
    private formBuilder: FormBuilder,
    private notificationService:NotificationService) { }
  ngOnInit() {
    this.formModal = new bootstrap.Modal(
      document.getElementById("exampleModal")
    );
    this.formModal2 = new bootstrap.Modal(
      document.getElementById("exampleModal2")
    );
    this.getDemande();
    this.formValue = this.formBuilder.group({
      nomSalarie: ['', Validators.required],
      dateDebut: ['', Validators.required],
      dateFin: ['', Validators.required],
      type: ['', Validators.required],
      description: ['', Validators.required],
      etat: ['', Validators.required]
    });
  }
  getDemande() {
    this.demandeService.getListEnCours().subscribe(data => {
      this.demandes = data;
    });
  }
  get filteredDemandes() {
    return this.demandes.filter(demande =>
      demande.nomSalarie.toLowerCase().includes(this.searchText.toLowerCase())
    );
  }
  doSomething() {
    this.formModal.hide();
  }
  doSomething2() {
    this.formModal2.hide();
  }
  openModal() {
    if (this.formModal) {
      this.formModal.show();
    }
  }
  openModal2(data: Demande) {
    if (this.formModal2) {
      this.formModal2.show();
      this.demandemodelobj.id = data.id
      this.formValue.controls['nomSalarie'].setValue(data.nomSalarie)
      this.formValue.controls['dateDebut'].setValue(data.dateDebut)
      this.formValue.controls['dateFin'].setValue(data.dateFin)
      this.formValue.controls['type'].setValue(data.type)
      this.formValue.controls['description'].setValue(data.description)
      this.formValue.controls['etat'].setValue(data.etat)
    }
  }
  accepter(data: Demande) {
    console.log('Accepter method called'); // Ajoutez ce log pour vérifier si la méthode est appelée

    this.showAdd = true;
    this.showUpdate = false;
    this.demandemodelobj.id = data.id;
    this.openModal();
    this.demandeService.updateAccepter(data).subscribe(
      (response) => {
        console.log('Demande acceptée avec succès'); // Ajoutez ce log pour vérifier si la mise à jour réussit
        // Show success notification
        this.notificationService.showNotification('Demande acceptée avec succès.');
      },
      (error) => {
        console.error('Erreur lors de l\'acceptation de la demande:', error); // Ajoutez ce log pour afficher les erreurs

        // Show error notification
        this.notificationService.showNotification('Erreur lors de l\'acceptation de la demande.');
      }
    );
  }
  refuser(data: Demande) {
    this.showAdd = false;
    this.showUpdate = true;
    this.openModal();
    this.demandemodelobj.id = data.id;

    this.demandeService.updateRefuser(data).subscribe(
      (response) => {
        // Show success notification
        this.notificationService.showNotification('Demande refusée avec succès.');
      },
      (error) => {
        // Show error notification
        this.notificationService.showNotification('Erreur lors du refus de la demande.');
      }
    );
    }


  validerAction() {
    if (this.showAdd) {
      // Logique pour accepter la demande (appelez le service approprié)
      this.demandeService.updateAccepter(this.demandemodelobj).subscribe(response => {
        // Gérer la réponse, rafraîchir la liste des demandes, etc.
        this.getDemande();
        // Cacher le modal
        this.formModal.hide();

      });
    } else if (this.showUpdate) {
      this.demandeService.updateRefuser(this.demandemodelobj).subscribe(
        (response) => {
          this.getDemande();
          this.formModal.hide();
        },
        (error) => {
        }
      );
    }
  }

}
