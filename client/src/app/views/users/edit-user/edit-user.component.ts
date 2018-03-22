import { Component, OnInit } from '@angular/core';
import {UserService} from '../../../services/user.service';
import {ActivatedRoute} from '@angular/router';
import {User} from '../../../models';
import {Logger} from '../../../shared/logger';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss']
})
export class EditUserComponent implements OnInit {

  private sub: any;
  private user: User;

  constructor(private route: ActivatedRoute,
              private userService: UserService,
              private logger: Logger) {
    this.sub = this.route.params.subscribe(params => {
      const id: number = +params['id']; // (+) converts string 'id' to a number
      if (isNaN(id)) {
        // new
        this.user = new User();
      } else {
        // edit
        this.getUser(id);
      }
    });
  }

  ngOnInit() {
  }

  getUser (id) {
    this.logger.debug ('getting user - ', id);
    this.userService.getUser(id).then(
      resp => this.user = resp
    );
  }

}
