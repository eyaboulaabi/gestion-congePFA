import { Observable, map } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Salarie } from '../models/salarie';

@Injectable({
  providedIn: 'root'
})
export class SalarieService {
 
  private baseURL='http://localhost:8080';
  constructor(private httpClient: HttpClient) {
   }
   getSalarieList():Observable<Salarie[]>{
    const url = `${this.baseURL}/salaries/read`;
      return this.httpClient.get<Salarie[]>(url);

   }
   createSalarie(data:any){
    const url = `${this.baseURL}/salaries/create`;
    return this.httpClient.post<any>(url,data).
    pipe(map((res:any)=>{
      return res ;
    }))
   }

   updateSalarie(data:any){
    return this.httpClient.put(`${this.baseURL}/salaries/update/${data.id}`, data);
  }

   deleteSalarie(id:number){
      return this.httpClient.delete(this.baseURL +'/salaries/delete?id='+id);
   }


   
}
