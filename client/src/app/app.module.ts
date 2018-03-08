import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { HttpModule } from '@angular/http';
import { routes } from './routes';
import { RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { SessionService } from '../services/session.service';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { ProfileService } from '../services/profile.service';
import { ProfileComponent } from './profile/profile.component';
import { SingleEditComponent } from './single-edit/single-edit.component';
import { NewEventComponent } from './new-event/new-event.component';
import { EventService } from '../services/event.service';
import { AlleventsComponent } from './allevents/allevents.component';
import { MyeventComponent } from './myevent/myevent.component';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { DetailsEventComponent } from './details-event/details-event.component';
import { FileSelectDirective } from "ng2-file-upload";
import { AgmCoreModule } from '@agm/core';
import { ReactiveFormsModule } from '@angular/forms';





// import { AgmCoreModule } from '@agm/core';
// import { ReactiveFormsModule } from '@angular/forms';






@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SignupComponent,
    LoginComponent,
    HomeComponent,
    ProfileComponent,
    SingleEditComponent,
    NewEventComponent,
    AlleventsComponent,
    MyeventComponent,
    DetailsEventComponent,
    FileSelectDirective
    
    

 
 
  ],
  imports: [
    AgmCoreModule.forRoot({
      apiKey: "AIzaSyAHAbQFOgzkGcZ7T-yEcIWMX45fwWjzDdQ",
      libraries: ["places"]
    }),
    BrowserModule,
    HttpModule,
    FormsModule,
    BrowserModule,
    RouterModule.forRoot(routes),
    Ng2SearchPipeModule,
    ReactiveFormsModule,
 
    // AgmCoreModule.forRoot({
    //   apiKey: "AIzaSyD7cOx23S4UcF4ehuC6kC_yO8cdYQVnhy0",
    //   libraries: ["places"]
    // }),
    // ReactiveFormsModule

    
  ],
  providers: [SessionService, ProfileService,EventService],
  bootstrap: [AppComponent]
})
export class AppModule { }
