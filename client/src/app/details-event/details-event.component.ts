
import { Component, OnInit } from '@angular/core';
import { EventService } from '../../services/event.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ElementRef, NgZone, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { } from 'googlemaps';
import { MapsAPILoader } from '@agm/core';
import { SessionService } from '../../services/session.service';
import { BoundCallbackObservable } from 'rxjs/observable/BoundCallbackObservable';

@Component({
  selector: 'app-details-event',
  templateUrl: './details-event.component.html',
  styleUrls: ['./details-event.component.css']
})
export class DetailsEventComponent implements OnInit {
eventos:any;
arrPar: Array<string>;
bool: boolean = true;
user;
evento={};
eventid:any;
public latitude: number;
public longitude: number;
public searchControl: FormControl;
public zoom: number;


@ViewChild("search")
  public searchElementRef: ElementRef;



  constructor(public  session:SessionService , public eventserv:EventService,private router:Router,private route: ActivatedRoute,private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone) { 
      this.user = this.session.getUser();
    this.session.getUserEvent()
      .subscribe(user => {
        this.user = user
      
      });

  }






  ngOnInit() {

    this.route.params.subscribe(params => {
      this.getEvent(params['id']);
      this.eventserv.get(params['id']).subscribe( m => {
        console.log("esto es h")
        this.arrPar = m.participantes;
        
        this.arrPar.forEach( p => {
          if (p === this.user._id) {
            this.bool = false;
          }
        })
      })
    });
    
    this.route.params.subscribe(params => {
      this.route.params.subscribe(body=> {this.eventid = body.id
      console.log(this.eventid)})
      
    });


    console.log(this.eventid);

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
      this.arrPar = m.participantes;

      this.router.navigate(['/profile']);
    });


    }
  remove(){
    console.log("entraaaa remove 2");
  this.eventserv.remove(this.eventid).subscribe(h =>{
  this.router.navigate(['/profile']);
  console.log(this.eventid)
  })
}
removePart(eventos){
  console.log(this.user._id)
  this.eventserv.removePart(eventos, this.eventid)
    .subscribe((user) => {
      console.log(user);
      this.router.navigate(['/profile']);
    });
  }

  }
