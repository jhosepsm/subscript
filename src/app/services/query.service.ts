import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class QueryService {

  private http=inject(HttpClient)
         // constructor(public http: HttpClient) { }
          private apiUrl=environment.apiUrl+"/query";
          getQuery(objsql:any):Observable<void>{// Observable  Async 
           // console.log(this.apiUrl);
            return this.http.post<void>(`${this.apiUrl}`,objsql);
          }
       
  
}
