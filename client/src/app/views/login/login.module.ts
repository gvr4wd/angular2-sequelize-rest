import {NgModule} from '@angular/core';
import {LoginComponent} from './login.component';

import {LoginRoutingModule} from './login-routing.module';
import {FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {UserService} from '../../services/user.service';
import {AlertModule} from 'ngx-bootstrap';
import {CommonModule} from '@angular/common';

@NgModule({
  imports: [
    HttpClientModule,
    CommonModule,
    FormsModule,

    AlertModule.forRoot(),

    LoginRoutingModule
  ],
  declarations: [
    LoginComponent
  ],
  providers: [
    UserService
  ]
})
export class LoginModule { }
