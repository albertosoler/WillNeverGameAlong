import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {EventService} from '../../services/event.service';
import { ActivatedRoute } from '@angular/router';
import { ElementRef, NgZone, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { } from 'googlemaps';
import { MapsAPILoader } from '@agm/core';



@Component({
  selector: 'app-new-event',
  templateUrl: './new-event.component.html',
  styleUrls: ['./new-event.component.css']
})
export class NewEventComponent implements OnInit {
  user_id:any;
  public latitude: number;
  public longitude: number;
  public searchControl: FormControl;
  public zoom: number;
  public places:any;
  author:string;
  name:Array<Object>;
  description:String;
  maxPart:Number;
  deporte:String;
  error:string;
  lat:Number;
  lng:Number;
  ciudad:String;
  calle:String;
  comunidad:String;
  date:String;



@ViewChild("search")
  public searchElementRef: ElementRef;



  constructor(public evento:EventService,private route: ActivatedRoute, private router:Router,private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.route.params.subscribe(body=>this.user_id = body.id)})
    this.zoom = 4;
    // this.latitude = 39.8282;
    // this.longitude = -98.5795;
    

    //create search FormControl
    this.searchControl = new FormControl();

    //set current position
    this.setCurrentPosition();

    //load Places Autocomplete
    this.mapsAPILoader.load().then(() => {
      let autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement, {
        types: ["address"]
      });
      autocomplete.addListener("place_changed", () => {
        this.ngZone.run(() => {
          //get the place result
          let place: google.maps.places.PlaceResult = autocomplete.getPlace();

          //verify result
          if (place.geometry === undefined || place.geometry === null) {
            return;
          }

          //set latitude, longitude and zoom
          this.latitude = place.geometry.location.lat();
          this.longitude = place.geometry.location.lng();
          this.lat=this.latitude;
          this.lng=this.longitude;
          this.zoom = 12;
          this.places = place.address_components;
          this.ciudad = this.places[1].long_name;
          this.calle = this.places[0].long_name;
          this.comunidad = this.places[3].long_name;
          console.log(this.places)
          console.log(this.ciudad)
          console.log(this.calle)
          console.log(this.comunidad)
        });
      });
    });
  }

  private setCurrentPosition() {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;
        this.zoom = 12;
      });
    }






}




  
  createEvent(form) {
    this.evento.createEvent(form.value)
      .subscribe(
        (evento) =>{
          console.log(evento.date)
           this.router.navigate(["/profile"])
           
         },
        (err) => this.error = err
      );
  }
}
