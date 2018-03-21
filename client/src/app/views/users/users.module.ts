import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersComponent } from './users.component';
import {UsersRoutingModule} from './users-routing.module';
import {DataTableModule} from 'angular2-datatable';

@NgModule({
  imports: [
    CommonModule,

    DataTableModule,

    UsersRoutingModule
  ],
  declarations: [UsersComponent]
})
export class UsersModule { }
