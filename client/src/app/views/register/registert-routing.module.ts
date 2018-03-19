import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {RegisterComponent} from './register.component';
import { ReactiveFormsModule } from '@angular/forms';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Registration'
    },
    component: RegisterComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes), ReactiveFormsModule,],
  exports: [RouterModule]
})
export class RegistertRoutingModule {}
