import { Routes } from '@angular/router';

import {AppComponent} from "./app.component"
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { HomeComponent } from './home/home.component'
import { ProfileComponent } from './profile/profile.component';
import { SingleEditComponent } from './single-edit/single-edit.component';
import { NewEventComponent } from './new-event/new-event.component';
import { AlleventsComponent } from './allevents/allevents.component';
import { DetailsEventComponent } from './details-event/details-event.component';
import { MyeventComponent } from './myevent/myevent.component';




export const routes: Routes = [
    { path: '', component: HomeComponent  },
    { path: 'login', component: LoginComponent },
    { path: 'signup', component: SignupComponent },
    { path: 'profile', component: ProfileComponent},
    {path : 'profile/edit/:id', component: SingleEditComponent},
    {path : 'event/newEvent', component: NewEventComponent},
    {path: 'event/allshow', component: AlleventsComponent},
    {path: 'event/join/:id', component: DetailsEventComponent},
    {path: 'event/myshow', component: MyeventComponent},
    // { path: 'threads/:id', component: ThreadDetailComponent},
    { path: '**', redirectTo: '' }
];