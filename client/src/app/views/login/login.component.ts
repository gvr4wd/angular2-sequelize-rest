import { Component } from '@angular/core';
import {User} from '../../models/user';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';
import {environment} from '../../../environments/environment';

@Component({
  templateUrl: 'login.component.html'
})
export class LoginComponent {

    private user = new User(null, environment.USERNAME, environment.PASSWORD);
    private loginPromise: Promise<any>;
    private loginFailed = false;

    constructor(private authService: AuthService, public router: Router) {
    }

    login() {
        this.loginPromise = this.authService.login(this.user).then(
            resp => {
                // Get the redirect URL from our auth service
                // If no redirect has been set, use the default
                const redirect = this.authService.redirectUrl ? this.authService.redirectUrl : '/dashboard';
                // Redirect the user
                this.router.navigate([redirect]);

            },
            error => {
                this.loginFailed = true;
                console.error('error logging in!');
            }
        );

    }

    register() {
        this.router.navigate(['/register']);
    }

}
