import {NgModule} from '@angular/core';
import {LoginComponent} from './login.component';

import {LoginRoutingModule} from './login-routing.module';
import {FormsModule} from '@angular/forms';
import {AuthService} from '../../services/auth.service';
import {HttpClientModule} from '@angular/common/http';

@NgModule({
  imports: [
    HttpClientModule,
    FormsModule,
    LoginRoutingModule
  ],
  declarations: [
    LoginComponent
  ],
  providers: [
    AuthService
  ]
})
export class LoginModule { }
