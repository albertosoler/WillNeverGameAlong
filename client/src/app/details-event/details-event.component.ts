
import { Component, OnInit } from '@angular/core';
import { EventService } from '../../services/event.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-details-event',
  templateUrl: './details-event.component.html',
  styleUrls: ['./details-event.component.css']
})
export class DetailsEventComponent implements OnInit {
eventos:any;
evento={};
user_id:any;


  constructor(public eventserv:EventService,private router:Router,private route: ActivatedRoute) { 
    this.eventserv.getAllEvent().subscribe(soler=>this.eventos = soler)

}

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.route.params.subscribe(body=>this.user_id = body.id)
      
  })
}

  joinEvent(evento){
    this.eventserv.joinEvent(this.user_id,evento).subscribe( m => {
      console.log(m);
      this.router.navigate(['/profile']);
    });
  }
}