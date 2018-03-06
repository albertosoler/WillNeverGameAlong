
import { Component, OnInit } from '@angular/core';
import { EventService } from '../../services/event.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ElementRef, NgZone, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { } from 'googlemaps';
import { MapsAPILoader } from '@agm/core';

@Component({
  selector: 'app-details-event',
  templateUrl: './details-event.component.html',
  styleUrls: ['./details-event.component.css']
})
export class DetailsEventComponent implements OnInit {
eventos:any;
evento={};
eventid:any;
public latitude: number;
public longitude: number;
public searchControl: FormControl;
public zoom: number;


@ViewChild("search")
  public searchElementRef: ElementRef;



  constructor(public eventserv:EventService,private router:Router,private route: ActivatedRoute,private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone) { 

}






  ngOnInit() {
    this.route.params.subscribe(params => {
      this.getEvent(params['id']);
    });
    this.route.params.subscribe(params => {
      this.route.params.subscribe(body=>this.eventid = body.id)
    });



      this.zoom = 12;
      // this.latitude = 39.8282;
      // this.longitude = -98.5795;
  
      //create search FormControl
      this.searchControl = new FormControl();
  
      //set current position
      // this.setCurrentPosition();
  
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
            this.zoom = 12;
          });
        });
      });
    }
  
    // private setCurrentPosition() {
    //   if ("geolocation" in navigator) {
    //     navigator.geolocation.getCurrentPosition((position) => {
    //       this.latitude = position.coords.latitude;
    //       this.longitude = position.coords.longitude;
    //       this.zoom = 12;
    //     });
    //   }

    // }

  

    getEvent(id) {
      this.eventserv.get(id)
        .subscribe((evento) => {
          this.eventos = evento;
        });
      }
  

  joinEvent(evento){
    this.eventserv.joinEvent(this.eventid,evento).subscribe( m => {
      console.log(m);
      this.router.navigate(['/profile']);
    });
  }
}