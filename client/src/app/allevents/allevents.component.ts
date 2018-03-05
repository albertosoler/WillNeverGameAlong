import { Component, OnInit } from '@angular/core';
import { EventService } from '../../services/event.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-allevents',
  templateUrl: './allevents.component.html',
  styleUrls: ['./allevents.component.css']
})
export class AlleventsComponent implements OnInit {
eventos:any;


  constructor(public eventserv:EventService,private router:Router,private route: ActivatedRoute) { 
    this.eventserv.getAllEvent().subscribe(soler=>this.eventos = soler)

}

  ngOnInit() {

}


}


