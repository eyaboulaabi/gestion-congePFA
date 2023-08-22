import { Observable, map } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Demande } from '../models/demande';

@Injectable({
  providedIn: 'root'
})
export class DemandeService {
  private baseURL='http://localhost:8080';

  constructor(private httpClient: HttpClient) { }

  getList():Observable<Demande[]>{
    const url = `${this.baseURL}/demandes/liste`;
      return this.httpClient.get<Demande[]>(url);

   }
   getListEnCours():Observable<Demande[]>{
    const url = `${this.baseURL}/demandes/en-cours`;
      return this.httpClient.get<Demande[]>(url);

   }
   getListRefuser():Observable<Demande[]>{
    const url = `${this.baseURL}/demandes/refusees`;
      return this.httpClient.get<Demande[]>(url);
   }
   getListTerminer():Observable<Demande[]>{
    const url = `${this.baseURL}/demandes/terminees`;
      return this.httpClient.get<Demande[]>(url);
   }

   createDemande(data:any){
    const url = `${this.baseURL}/demandes/ajouter`;
    return this.httpClient.post<any>(url,data).
    pipe(map((res:any)=>{
      return res ;
    }))
   }
   
   updateDemande(data:any){
    return this.httpClient.put(`${this.baseURL}/demandes/update/${data.id}`, data);
  }

  updateRefuser(data:any){
    return this.httpClient.put(`${this.baseURL}/demandes/refuser/${data.id}`, data);
  }
  updateAccepter(data:any){
    return this.httpClient.put(`${this.baseURL}/demandes/accepter/${data.id}`, data);
  }
 
 

}
