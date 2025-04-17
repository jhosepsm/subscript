import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { Observable } from 'rxjs';
import { Council } from '../interfaces/council';

@Injectable({
  providedIn: 'root'
})
export class CouncilService {
private http=inject(HttpClient)
       // constructor(public http: HttpClient) { }
        private apiUrl=environment.apiUrl+"/council";
        getCouncils():Observable<Council[]>{// Observable  Async 
         // console.log(this.apiUrl);
          return this.http.get<Council[]>(this.apiUrl);
        }
        getCouncilById(id:string):Observable<Council>{
          return this.http.get<Council>(`${this.apiUrl}/${id}`);
        }
         createCouncil(user:Partial<Council>):Observable<Council>{
           return this.http.post<Council>(this.apiUrl,user);
         }
         updateCouncil(id:string, user:Partial<Council>):Observable<Council>{
          return this.http.put<Council>(`${this.apiUrl}/${id}`,user);
        }
        deleteCouncil(id:string):Observable<void>{
          return this.http.delete<void>(`${this.apiUrl}/${id}`);
        }
}
