import {Component, OnInit} from '@angular/core';
import {UserService} from '../../services/user.service';
import {User} from '../../models';
import {Logger} from '../../shared/logger';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  users: User[] = [];

  constructor(private logger: Logger,
              private userService: UserService) {
  }

  ngOnInit() {
    this.loadUsers();
  }

  loadUsers() {
    this.logger.debug('getting users...');
    this.userService.getUsers().subscribe(
      users => {
        this.logger.debug('users - ', users);
        this.users = users;
      },
      error => {
        console.log(error);
      }
    );
  }
}
