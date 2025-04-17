import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { Observable } from 'rxjs';
import { Category } from '../interfaces/category';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private http=inject(HttpClient)
       // constructor(public http: HttpClient) { }
        private apiUrl=environment.apiUrl+"/category";
        getCategories():Observable<Category[]>{// Observable  Async 
         // console.log(this.apiUrl);
          return this.http.get<Category[]>(this.apiUrl);
        }
        getCategoryById(id:string):Observable<Category>{
          return this.http.get<Category>(`${this.apiUrl}/${id}`);
        }
         createCategory(user:Partial<Category>):Observable<Category>{
           return this.http.post<Category>(this.apiUrl,user);
         }
         updateCategory(id:string, user:Partial<Category>):Observable<Category>{
          return this.http.put<Category>(`${this.apiUrl}/${id}`,user);
        }
        deleteCategory(id:string):Observable<void>{
          return this.http.delete<void>(`${this.apiUrl}/${id}`);
        }
}
