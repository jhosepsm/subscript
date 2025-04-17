import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { Observable } from 'rxjs';
import { User } from '../interfaces/user';


@Injectable({
  providedIn: 'root'
})
export class UserService {
    private http=inject(HttpClient)
   // constructor(public http: HttpClient) { }
    private apiUrl=environment.apiUrl+"/user";
    private LocalUrl=environment.apiUrl;
    getUsers():Observable<User[]>{// Observable  Async 
     // console.log(this.apiUrl);
      return this.http.get<User[]>(this.apiUrl);
    }
    getUserById(id:number):Observable<User>{
      return this.http.get<User>(`${this.apiUrl}/${id}`);
    }
     createUser(user:Partial<User>):Observable<User>{
       return this.http.post<User>(this.apiUrl,user);
     }
     updateUser(id:number, user:Partial<User>):Observable<User>{
      return this.http.put<User>(`${this.apiUrl}/${id}`,user);
    }
    deleteUser(id:number):Observable<void>{
      return this.http.delete<void>(`${this.apiUrl}/${id}`);
    }
    changePassword(obj:any):Observable<void>{
      return this.http.put<void>(`${this.LocalUrl}changepass`,obj);
    }
     loginUser(user:string,password:string):Observable<User>{
      return this.http.get<User>(`${this.LocalUrl}login/${user}/${password}`);
    }
}
