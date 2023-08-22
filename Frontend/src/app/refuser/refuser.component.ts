import { Component } from '@angular/core';
import { Demande } from '../models/demande';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DemandeService } from '../service/demande.service';

@Component({
  selector: 'app-refuser',
  templateUrl: './refuser.component.html',
  styleUrls: ['./refuser.component.css']
})
export class RefuserComponent {
  demandes!: Demande[];
  formValue!: FormGroup;
  pagedDemandes: Demande[] = [];
  currentPage = 1;
  itemsPerPage = 5 ;
  constructor(private demandeService: DemandeService,private formBuilder: FormBuilder){}
  ngOnInit(){
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
    this.demandeService.getListRefuser().subscribe(data => {
      this.demandes = data;
      this.pagedDemandes = this.demandes.slice(0, this.itemsPerPage);
    });
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
