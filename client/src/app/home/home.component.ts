import { Component, OnInit } from '@angular/core';
import { SessionService } from '../../services/session.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  error:string;
  username:string;
  password:string;
  email:string;
  city:string;
  country:string;
  constructor(private session:SessionService, private router:Router) { }

  ngOnInit() {
  }
  logout(){
    this.session.logout()
    .catch(e => this.error = e)
    .subscribe();
  }
  login() {
    this.session.login(this.username, this.password)
      .subscribe(
        (user) => {
          this.router.navigate(['/profile'])
         
        },
        (err) => this.error = err
      );
  }
  signup(form) {
    this.session.signup(form.value)
      .subscribe(
        (user) =>{
           this.router.navigate(["/profile"])
           console.log("create")
         },
        (err) => this.error = err
      );
     
}

}




 

