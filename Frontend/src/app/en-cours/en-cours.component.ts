import { Component, OnInit, ViewChild } from '@angular/core';
import { Demande } from '../models/demande';
import { DemandeService } from '../service/demande.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
declare const bootstrap: any; // Déclarez la variable bootstrap
@Component({
  selector: 'app-en-cours',
  templateUrl: './en-cours.component.html',
  styleUrls: ['./en-cours.component.css']
})
export class EnCoursComponent {
  
  demandes!: Demande[];
  formValue!: FormGroup;
  formModal: any;
  demandemodelobj: Demande = new Demande;
  showAdd!: boolean;
  showUpdate!: boolean;
  pagedDemandes: Demande[] = [];
    currentPage = 1;
    itemsPerPage = 5 ;
  @ViewChild('myModal') myModal: any;

  constructor(private demandeService: DemandeService,private formBuilder: FormBuilder){}
  ngOnInit(){
    this.formModal = new bootstrap.Modal(
      document.getElementById("exampleModal")
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
    this.pageChanged(1);
  }
  getDemande() {
    this.demandeService.getListEnCours().subscribe(data => {
      this.demandes = data;
      this.pagedDemandes = this.demandes.slice(0, this.itemsPerPage);

    });
  }
  doSomething() {
    this.formModal.hide();
  }
  openModal() {
    if (this.formModal) {
      this.formModal.show();
    }
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
