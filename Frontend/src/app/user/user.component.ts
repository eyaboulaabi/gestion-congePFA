import { Salarie } from './../models/salarie';
import { Component, OnInit } from '@angular/core';
import { SalarieService } from '../service/salarie.service';
import { FormGroup, FormBuilder , Validators} from '@angular/forms';
import { ViewChild } from '@angular/core';


declare var window: any;
@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  @ViewChild('myModal') myModal: any;

  formModal: any;
  salaries!: Salarie[];
  showAdd!:boolean ;
  showUpdate!:boolean ;
  formValue!:FormGroup;
  salariemodelobj : Salarie= new Salarie ;
  pagedDemandes: Salarie[] = [];
  currentPage = 1;
  itemsPerPage = 5 ;

  constructor(private salarieService: SalarieService,
              private formBuilder:FormBuilder,
              ) { }


  ngOnInit(): void {
    this.getSalaries();
    this.formModal = new window.bootstrap.Modal(
      document.getElementById("exampleModal")
    );
    this.formValue = this.formBuilder.group(
      {
        username:['',Validators.required],
        email:['',Validators.required],
        password:['',Validators.required],
        role:['',Validators.required]
      }
    );
    this.pageChanged(1);
  }
  openModal() {
   this.formModal.show();
  }


  doSomething(){
    this.formModal.hide();
  }
  private getSalaries() {
    this.salarieService.getSalarieList().subscribe(data => {
      this.salaries = data;
      this.pagedDemandes = this.salaries.slice(0, this.itemsPerPage);

    })
  }

  add(){
    this.showAdd=true;
    this.showUpdate=false ;
  }

  edit(data:any){
    this.showAdd=false;
    this.showUpdate=true;
    this.salariemodelobj.id= data.id;

  this.formValue.controls['username'].setValue(data.username)
  this.formValue.controls['email'].setValue(data.email)
  this.formValue.controls['password'].setValue(data.password)
  this.formValue.controls['role'].setValue(data.role)
  }


  
  addSalarie(){
    this.salariemodelobj.username=this.formValue.value.username ;
    this.salariemodelobj.email=this.formValue.value.email;
    this.salariemodelobj.password=this.formValue.value.password ;
    this.salariemodelobj.role=this.formValue.value.role ;

    this.salarieService.createSalarie(this.salariemodelobj).subscribe(res=>{
      console.log(res);
      this.formValue.reset();
      alert("Record added sucessfully");
      this.formModal.hide();
      this.getSalaries();

    },
    err=>{
      alert("Somthing went worng !!");
    })
  }
  deleteSalarie(salarie:Salarie){
    this.salarieService.deleteSalarie(salarie.id).subscribe((resp)=>{
      console.log(resp);
      alert("Record deleted successfully ");
      this.getSalaries();
    },
    err =>{
      console.log(err);
      alert("something went wrong ");
    }
    );
  }
    editSalarie() {
      this.salariemodelobj.username = this.formValue.value.username;
      this.salariemodelobj.email = this.formValue.value.email;
      this.salariemodelobj.password = this.formValue.value.password;
      this.salariemodelobj.role = this.formValue.value.role;
    
      this.salarieService.updateSalarie(this.salariemodelobj).subscribe(
        res => {
          this.formValue.reset();
      alert("Record added sucessfully");
      this.formModal.hide();
      this.getSalaries();
        },
        err => {
          alert("Something went wrong");
        }
      );
    }
    totalPages: number = 0; // Initialize totalPages property
    pageChanged(pageNumber: number) {
      if (this.salaries) {
          const startIndex = (pageNumber - 1) * this.itemsPerPage;
          const endIndex = Math.min(startIndex + this.itemsPerPage, this.salaries.length);
    
          this.pagedDemandes = this.salaries.slice(startIndex, endIndex);
          this.currentPage = pageNumber;
    
          // Calculate the total number of pages
          this.totalPages = Math.ceil(this.salaries.length / this.itemsPerPage);
      }
    }
    
  }
