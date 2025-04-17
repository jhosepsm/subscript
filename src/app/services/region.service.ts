import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { Observable } from 'rxjs';
import { Region } from '../interfaces/region';

@Injectable({
  providedIn: 'root'
})
export class RegionService {

  private http=inject(HttpClient)
       // constructor(public http: HttpClient) { }
        private apiUrl=environment.apiUrl+"/region";
        getRegions():Observable<Region[]>{// Observable  Async 
         // console.log(this.apiUrl);
          return this.http.get<Region[]>(this.apiUrl);
        }
        getRegionById(id:string):Observable<Region>{
          return this.http.get<Region>(`${this.apiUrl}/${id}`);
        }
         createRegion(user:Partial<Region>):Observable<Region>{
           return this.http.post<Region>(this.apiUrl,user);
         }
         updateRegion(id:string, user:Partial<Region>):Observable<Region>{
          return this.http.put<Region>(`${this.apiUrl}/${id}`,user);
        }
        deleteRegion(id:string):Observable<void>{
          return this.http.delete<void>(`${this.apiUrl}/${id}`);
        }
      
}
