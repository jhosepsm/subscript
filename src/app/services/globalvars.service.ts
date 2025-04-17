import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GlobalvarsService {
  private _userCurrent:string[]=[];
  private _userlogged:boolean=false;
  get credentials()
  {
    return [...this._userCurrent];
  } 
  getCredentials(){
    return [...this._userCurrent];
  }
  ClearUserData(){
    this._userCurrent=[];
  }
  addUserData(data:string){
    this._userCurrent.push(data);
  }
  LogUser(){
    this._userlogged=true;
  }
  LogOutUser(){
    this._userlogged=false;
  }
  CheckLoginUser(){
    return this._userlogged;
  }
  constructor() { }
}
