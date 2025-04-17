import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { Observable } from 'rxjs';
import { Branch } from '../interfaces/branch';

@Injectable({
  providedIn: 'root'
})
export class BranchService {

   private http=inject(HttpClient)
     // constructor(public http: HttpClient) { }
      private apiUrl=environment.apiUrl+"/branch";
      getBranches():Observable<Branch[]>{// Observable  Async 
       // console.log(this.apiUrl);
        return this.http.get<Branch[]>(this.apiUrl);
      }
      getBranchById(id:string):Observable<Branch>{
        return this.http.get<Branch>(`${this.apiUrl}/${id}`);
      }
       createBranch(user:Partial<Branch>):Observable<Branch>{
         return this.http.post<Branch>(this.apiUrl,user);
       }
       updateBranch(id:string, user:Partial<Branch>):Observable<Branch>{
        return this.http.put<Branch>(`${this.apiUrl}/${id}`,user);
      }
      deleteBranch(id:string):Observable<void>{
        return this.http.delete<void>(`${this.apiUrl}/${id}`);
      }
    
}
