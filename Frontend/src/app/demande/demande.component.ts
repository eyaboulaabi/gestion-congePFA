import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Demande } from '../models/demande';
import { DemandeService } from '../service/demande.service';
import * as $ from 'jquery';
import 'datatables.net';

declare const bootstrap: any; // Déclarez la variable bootstrap

@Component({
  selector: 'app-demande',
  templateUrl: './demande.component.html',
  styleUrls: ['./demande.component.css']
})

export class DemandeComponent implements OnInit {
  searchText: string = '';
  showAdd!: boolean;
  showUpdate!: boolean;
  formModal: any;
  formValue!: FormGroup;
  demandes!: Demande[];
  demandemodelobj: Demande = new Demande;
  pagedDemandes: Demande[] = [];
    currentPage = 1;
    itemsPerPage = 5 ;

  @ViewChild('myModal') myModal: any;

  constructor(
    private formBuilder: FormBuilder,
    private demandeService: DemandeService,
  ) { }

  ngOnInit(): void {
   
    this.getDemande();
    this.formModal = new bootstrap.Modal(
      document.getElementById("exampleModal")
    );
    this.formValue = this.formBuilder.group({
      nomSalarie: ['', Validators.required],
      dateDebut: ['', Validators.required],
      dateFin: ['', Validators.required],
      type: ['', Validators.required],
      description: ['', Validators.required],
      etat: ['', Validators.required]
    });
    this.pageChanged(1);

  }
  add() {
    this.showAdd = true;
    this.showUpdate = false;
  }
  edit(data: Demande) {
    this.showAdd = false;
    this.showUpdate = true;
    this.openModal();
    this.demandemodelobj.id = data.id
    this.formValue.controls['nomSalarie'].setValue(data.nomSalarie)
    this.formValue.controls['dateDebut'].setValue(data.dateDebut)
    this.formValue.controls['dateFin'].setValue(data.dateFin)
    this.formValue.controls['type'].setValue(data.type)
    this.formValue.controls['description'].setValue(data.description)
    this.formValue.controls['etat'].setValue(data.etat)
  }


  doSomething() {
    this.formModal.hide();
  }
  openModal() {
    if (this.formModal) {
      this.formModal.show();
    }
  }
  private getDemande() {
    this.demandeService.getList().subscribe(data => {
      this.demandes = data;
      this.pagedDemandes = this.demandes.slice(0, this.itemsPerPage);
      this.filterDemandes();
    });
  }
  filterDemandes() {
    if (this.searchText) {
      this.pagedDemandes = this.demandes.filter(demande =>
        demande.nomSalarie.toLowerCase().includes(this.searchText.toLowerCase()) ||
        demande.type.toLowerCase().includes(this.searchText.toLowerCase()) ||
        demande.description.toLowerCase().includes(this.searchText.toLowerCase())
      ).slice(0, this.itemsPerPage);
    } else {
      this.pageChanged(this.currentPage); // Use existing pagination logic if no search text
    }
  }
  addDemande() {
    const dateDebut = new Date(this.formValue.value.dateDebut);
    const dateFin = new Date(this.formValue.value.dateFin);
    const differenceInTime = dateFin.getTime() - dateDebut.getTime();
    const differenceInDays = differenceInTime / (1000 * 3600 * 24);
    
    if (differenceInDays > 20) {
      alert("La période demandée dépasse la limite autorisée de 20 jours entre la date de début et la date de fin. Veuillez sélectionner une période de congé valide.");
      return;
    }

    this.demandemodelobj.nomSalarie = this.formValue.value.nomSalarie;
    this.demandemodelobj.dateDebut = this.formValue.value.dateDebut;
    this.demandemodelobj.dateFin = this.formValue.value.dateFin;
    this.demandemodelobj.type = this.formValue.value.type;
    this.demandemodelobj.description = this.formValue.value.description;
    this.demandemodelobj.etat = "En cours";

    this.demandeService.createDemande(this.demandemodelobj).subscribe(res => {
      console.log(res);
      this.formValue.reset();
      alert("Enregistrement ajouté avec succès");
      this.formModal.hide();
      this.formModal.hide();
      this.getDemande();
    }, err => {
      alert("Quelque chose s'est mal passé!!");
    }
    )
  }


  editDemande() {
    this.demandemodelobj.nomSalarie = this.formValue.value.nomSalarie;
    this.demandemodelobj.dateDebut = this.formValue.value.dateDebut;
    this.demandemodelobj.dateFin = this.formValue.value.dateFin;
    this.demandemodelobj.type = this.formValue.value.type;
    this.demandemodelobj.description = this.formValue.value.description;
    this.demandemodelobj.etat = this.formValue.value.etat;

    this.demandeService.updateDemande(this.demandemodelobj).subscribe(
      res => {
        this.formValue.reset();
        alert("Record added sucessfully");
        this.formModal.hide();
        this.getDemande();
      },
      err => {
        alert("Something went wrong");
      }
    );
  }
totalPages: number = 0; // Initialize totalPages property

pageChanged(pageNumber: number) {
  if (this.demandes) {
      const startIndex = (pageNumber - 1) * this.itemsPerPage;
      const endIndex = Math.min(startIndex + this.itemsPerPage, this.demandes.length);

      this.pagedDemandes = this.demandes.slice(startIndex, endIndex);
      this.currentPage = pageNumber;

      // Calculate the total number of pages
      this.totalPages = Math.ceil(this.demandes.length / this.itemsPerPage);
  }
}



}
