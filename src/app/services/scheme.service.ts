import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { Observable } from 'rxjs';
import { Scheme } from '../interfaces/scheme';

@Injectable({
  providedIn: 'root'
})
export class SchemeService {

  private http=inject(HttpClient)
        // constructor(public http: HttpClient) { }
         private apiUrl=environment.apiUrl+"/scheme";
         getSchemes():Observable<Scheme[]>{// Observable  Async 
          // console.log(this.apiUrl);
           return this.http.get<Scheme[]>(this.apiUrl);
         }
         getSchemeById(id:string):Observable<Scheme>{
           return this.http.get<Scheme>(`${this.apiUrl}/${id}`);
         }
          createScheme(user:Partial<Scheme>):Observable<Scheme>{
            return this.http.post<Scheme>(this.apiUrl,user);
          }
          updateScheme(id:string, scheme:Partial<Scheme>):Observable<Scheme>{
           return this.http.put<Scheme>(`${this.apiUrl}/${id}`,scheme);
         }
         deleteScheme(id:string):Observable<void>{
           return this.http.delete<void>(`${this.apiUrl}/${id}`);
         }
}
