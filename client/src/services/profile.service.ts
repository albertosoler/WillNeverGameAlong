import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Observable } from 'rxjs/Rx';
import { environment }  from '../environments/environment';


export interface User{
  _id:string,
  username:string,
  password:string,
  direction:String,
  email:string,
  age:number,
  country:String,
  city:String
  imgUrl: { 
  type: String, 
  default: "../../../server/public/img/user-placeholder.png" }  
}

@Injectable()
export class ProfileService {
  BASEURL:string= environment.BASEURL;
  options:object = {withCredentials:true};
  constructor(private http: Http) {
}
private user:User;

handleError(e) {
  console.log(e);
  return Observable.throw(e.json().message);
}

getUserInfo():Observable<any>{
  return this.http.get(`${this.BASEURL}/profile`, this.options)
  .map((res) => res.json())
  .catch(this.handleError);
}

edit(user,userid):Observable<any> {
  console.log(user);
  return this.http.put(`${this.BASEURL}/edit/${userid}`,user,this.options)
    .map((res) => res.json())
    .catch(this.handleError);
}
remove(userid) {
  return this.http.post(`${this.BASEURL}/delete/${userid}`,this.options)
    .map((res) => res.json());
}



}


