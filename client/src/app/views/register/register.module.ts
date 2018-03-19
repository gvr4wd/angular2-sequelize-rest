import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RegistertRoutingModule} from './registert-routing.module';
import {RegisterComponent} from './register.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  imports: [
    CommonModule,
    RegistertRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  declarations: [
    RegisterComponent
  ]
})
export class RegisterModule { }
