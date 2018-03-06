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
  author:string;
  name:String;
  description:String;
  maxPart:Number;
  deporte:String;
  error:string;
  lat:Number;
  lng:Number;
  date:String;
  direction:String;


@ViewChild("search")
  public searchElementRef: ElementRef;



  constructor(public evento:EventService,private route: ActivatedRoute, private router:Router,private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.route.params.subscribe(body=>this.user_id = body.id)})
      console.log(this.user_id)
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
