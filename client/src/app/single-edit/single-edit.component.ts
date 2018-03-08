import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';
import {ProfileService} from "../../services/profile.service";

@Component({
  selector: 'app-single-edit',
  templateUrl: './single-edit.component.html',
  styleUrls: ['./single-edit.component.css']
})
export class SingleEditComponent implements OnInit {


  user={};
  user_id:any;

  constructor(public service:ProfileService,  private router:Router,private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.route.params.subscribe(body=>this.user_id = body.id)
      
    });
  }

  edit(user){
    console.log(this.user_id)
    this.service.edit(user, this.user_id)
      .subscribe((user) => {
        console.log(user);
        this.router.navigate(['/profile']);
      });
  }
  

  deletePhone(){
    this.service.remove(this.user_id).subscribe( m => {
      this.router.navigate(['/']);
    });
  }






}
