import {NgModule} from '@angular/core';
import {LoginComponent} from './login.component';

import {LoginRoutingModule} from './login-routing.module';
import {FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {UserService} from '../../services/user.service';
import {AlertModule} from 'ngx-bootstrap';
import {CommonModule} from '@angular/common';
import {LOG_LOGGER_PROVIDERS, Logger} from '../../shared/logger';

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
    // Logger
    Logger,
    LOG_LOGGER_PROVIDERS,

    UserService
  ]
})
export class LoginModule { }
