import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { Observable } from 'rxjs';
import { Company } from '../interfaces/company';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {
 private http=inject(HttpClient)
       // constructor(public http: HttpClient) { }
        private apiUrl=environment.apiUrl+"/company";
        getCompanies():Observable<Company[]>{// Observable  Async 
         // console.log(this.apiUrl);
          return this.http.get<Company[]>(this.apiUrl);
        }
        getCompanyById(id:string):Observable<Company>{
          return this.http.get<Company>(`${this.apiUrl}/${id}`);
        }
         createCompany(company:Partial<Company>):Observable<Company>{
           return this.http.post<Company>(this.apiUrl,company);
         }
         updateCompany(id:string, company:Partial<Company>):Observable<Company>{
          return this.http.put<Company>(`${this.apiUrl}/${id}`,company);
        }
        deleteCompany(id:string):Observable<void>{
          return this.http.delete<void>(`${this.apiUrl}/${id}`);
        }
}
