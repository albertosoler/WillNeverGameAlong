import { Component, OnInit } from '@angular/core';
// import { SessionService } from '../../services/session.service';
// import { Router } from '@angular/router';
// import { FileSelectDirective } from "ng2-file-upload";
import { FileUploadModule } from 'ng2-file-upload';
import { FileUploader } from 'ng2-file-upload';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent  {

//   uploader: FileUploader = new FileUploader({
//     url: `/api/auth/signup`
//   });
 }
//   newPhone = {
//     username: String,
//     password:String,
//     email:String,
//     city:String,
//     country:String,
    
//   };

//   error:string;
//   feedback: string;
  


//   constructor(public session:SessionService, private router:Router) { }

//   ngOnInit() {


//     this.uploader.onSuccessItem = (item, response) => {
//       this.feedback = JSON.parse(response).message;
//     };

//     this.uploader.onErrorItem = (item, response, status, headers) => {
//       this.feedback = JSON.parse(response).message;
//     };
//   }
//   signup(form) {
   
//     // this.session.signup(form.value)
//     //   .subscribe(
//     //     (user) =>{
//     //        this.router.navigate(["/"])
//     //        console.log("create")
//     //      },
//     //     (err) => this.error = err
//     //   );
//       this.uploader.onBuildItemForm = (item, form) => {
//         form.append('name', this.newPhone.username);
//         form.append('password', this.newPhone.password);
//         form.append('email', this.newPhone.email);
//         form.append('country', this.newPhone.country);
//         form.append('city', this.newPhone.city);
//       };
  
//       this.uploader.uploadAll();
//     }
     
// }
  


