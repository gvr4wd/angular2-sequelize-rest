import {Component} from '@angular/core';
import {User} from '../../models/user';
import {Router} from '@angular/router';
import {environment} from '../../../environments/environment';
import {UserService} from '../../services/user.service';
import {Logger} from '../../shared/logger';

@Component({
  templateUrl: 'login.component.html'
})
export class LoginComponent {

  private user = new User(null, environment.USERNAME, environment.PASSWORD);
  private loginPromise: Promise<any>;
  private loginError: string = null;

  constructor(public router: Router,
              private userService: UserService,
              private logger: Logger) {
  }

  login() {
    this.loginPromise = this.userService.login(this.user).then(
      resp => {
        this.logger.debug('login success?');
        // Get the redirect URL from our auth service
        // If no redirect has been set, use the default
        const redirect = this.userService.redirectUrl ? this.userService.redirectUrl : '/dashboard';
        // Redirect the user
        this.router.navigate([redirect]);

      },
      error => {
        this.loginError = "Login failed";
        this.logger.error('error logging in!');
      }
    );

  }

  register() {
    this.router.navigate(['/register']);
  }

}
