import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {UsersComponent} from './users.component';
import {EditUserComponent} from './edit-user/edit-user.component';
import {ViewUserComponent} from './view-user/view-user.component';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Users Page'
    },
    component: UsersComponent,
  },
  {
    data: {
      title: 'Edit User'
    },
    path: ':id/edit',
    component: EditUserComponent,
  },
  {
    data: {
      title: 'View User'
    },
    path: ':id/view',
    component: ViewUserComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule {
}
