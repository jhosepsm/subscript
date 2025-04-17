import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { Observable } from 'rxjs';
import { Deposit } from '../interfaces/deposit';


@Injectable({
  providedIn: 'root'
})
export class DepositService {

  private http=inject(HttpClient)
         // constructor(public http: HttpClient) { }
          private apiUrl=environment.apiUrl+"/deposit";
          getDeposits(month:string,year:string):Observable<Deposit[]>{// Observable  Async 
           // console.log(this.apiUrl);
           // return this.http.get<Deposit[]>(this.apiUrl);
            return this.http.get<Deposit[]>(`${this.apiUrl}/${month}/${year}`);
          }
          getDepositById(id:string):Observable<Deposit>{
            return this.http.get<Deposit>(`${this.apiUrl}/${id}`);
          }
           createDeposit(deposit:Partial<Deposit>):Observable<Deposit>{
             return this.http.post<Deposit>(this.apiUrl,deposit);
           }
           updateDeposit(id:string, deposit:Partial<Deposit>):Observable<Deposit>{
            return this.http.put<Deposit>(`${this.apiUrl}/${id}`,deposit);
          }
          deleteDeposit(id:string):Observable<void>{
            return this.http.delete<void>(`${this.apiUrl}/${id}`);
          }
}
