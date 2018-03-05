import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {EventService} from '../../services/event.service'

// import { ElementRef, NgZone, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
// import { AgmCoreModule } from "@agm/core";
// import { } from 'googlemaps';
// import { MapsAPILoader } from '@agm/core';

@Component({
  selector: 'app-new-event',
  templateUrl: './new-event.component.html',
  styleUrls: ['./new-event.component.css']
})
export class NewEventComponent implements OnInit {

  author:string;
  name:String;
  description:String;
  maxPart:Number;
  deporte:String;
  error:string;
  lat:String;
  Lng:String;
  date:String;
  

  constructor(public evento:EventService, private router:Router) { }

  ngOnInit() {





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
