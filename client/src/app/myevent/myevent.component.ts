

import { Component, OnInit } from '@angular/core';
import { EventService } from '../../services/event.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-myevent',
  templateUrl: './myevent.component.html',
  styleUrls: ['./myevent.component.css']
})

export class MyeventComponent implements OnInit {
miseventos:any;



  constructor(public eventserv:EventService,private router:Router,private route: ActivatedRoute) { 
    this.eventserv.getMyEvent().subscribe(soler=>this.miseventos = soler)

}

  ngOnInit() {
    
}

}
