import { Component, OnInit } from '@angular/core';
import { SessionService } from '../../services/session.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  username: string;
  error:string;
  password:string;
  email:string;
  city:string;
  country:string;


  constructor(public session:SessionService, private router:Router) { }

  ngOnInit() {
  }
  signup(form) {
    this.session.signup(form.value)
      .subscribe(
        (user) =>{
           this.router.navigate(["/"])
           console.log("create")
         },
        (err) => this.error = err
      );
  }

}
