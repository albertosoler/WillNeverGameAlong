
import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Observable } from 'rxjs/Rx';
import { environment }  from '../environments/environment';



export interface Evento{
  _id:string,
  author:string,
  name:String,
  description:String,
  direction:String,
  maxPart:Number,
  deporte: String,
  location: {
    lat: Number,
    lng: Number
},
  date:String,
  time:String,
  img:string 
}


@Injectable()
export class EventService {
  BASEURL:string= environment.BASEURL;
  options:object = {withCredentials:true};
  constructor(private http: Http) {
}
private evento:Evento;

handleError(e) {
  console.log(e);
  return Observable.throw(e.json().message);
}
///Crear evento Funciona
createEvent(evento:Evento):Observable<Evento>{
  console.log("entroooo");
  return this.http.post(`${this.BASEURL}/event/newEvent`, evento, this.options)
      .map(res => res.json())
      .catch(this.handleError);
  }

///Mostrar todos los eventos funciona
getAllEvent():Observable<any>{
  console.log("eventos entrooo todos")
  return this.http.get(`${this.BASEURL}/event/allshow`, this.options)
  .map((res) => res.json())
  .catch(this.handleError);
}
///Mostrar mis eventos
getMyEvent():Observable<any>{
  console.log("entro en servicio de mis eventos")
  return this.http.get(`${this.BASEURL}/event/myshow`, this.options)
  .map((res)=>res.json())
  .catch(this.handleError);
}
get(id) {
  return this.http.get(`${this.BASEURL}/event/join/${id}`)
    .map((res) => res.json());
}

///Unirme a un evento Funciona

joinEvent(eventid,evento):Observable<any>{
  console.log("entro servicio")
  return this.http.post(`${this.BASEURL}/event/join/${eventid}`,evento, this.options)
  .map((res) => res.json())
  .catch(this.handleError);
}

editEvent(evento,eventid):Observable<any> {
  return this.http.put(`${this.BASEURL}/event/edit/${eventid}`,evento,this.options)
    .map((res) => res.json())
    .catch(this.handleError);
}


remove(eventid) {
  console.log("entraaaa servicio remove")
  return this.http.post(`${this.BASEURL}/event/delete/${eventid}`,this.options)
    .map((res) => res.json());
    
}
removePart(evento,eventid) {
  console.log("entra al servicio borrar part")
  return this.http.put(`${this.BASEURL}/event/deletepart/${eventid}`,evento,this.options)
  .map((res) =>res.json())
  .catch(this.handleError);
}


}