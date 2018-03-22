import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersComponent } from './users.component';
import {UsersRoutingModule} from './users-routing.module';
import {DataTableModule} from 'angular2-datatable';
import {PopoverModule} from 'ngx-bootstrap';
import { ViewUserComponent } from './view-user/view-user.component';
import { EditUserComponent } from './edit-user/edit-user.component';
import { UserFormComponent } from './edit-user/user-form/user-form.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,

    DataTableModule,
    PopoverModule.forRoot(),

    UsersRoutingModule
  ],
  declarations: [UsersComponent, ViewUserComponent, EditUserComponent, UserFormComponent]
})
export class UsersModule { }
