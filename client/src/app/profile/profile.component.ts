import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {ProfileService} from "../../services/profile.service";
import { SessionService } from '../../services/session.service';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  nameId:any;
  error:string;
 
  constructor(public service:ProfileService,public session:SessionService,  private router:Router) {
    this.service.getUserInfo().subscribe(list => this.nameId = list.user);

  }


  ngOnInit() {

  

}

logout(){
  this.session.logout()
  .catch(e => this.error = e)
  .subscribe(        (user) => {
    this.router.navigate(['/home'])
    console.log(user)
  },
  (err) => this.error = err
);
}





}
