import {Injectable} from '@angular/core';
import 'rxjs/add/operator/map';
import {User} from '../models/user';
import 'rxjs/add/operator/toPromise';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class AuthService {
  isLoggedIn: boolean = false;

  // store the URL so we can redirect after logging in
  redirectUrl: string;

  constructor(private http: HttpClient) {

  }

  login(user: User): Promise<User> {
    this.isLoggedIn = false;
    return this.http.post('api/users/login', user)
      .toPromise()
      .then(resp => {
        const body = resp;
        // store in session storage
        let user: User = User.parseJson(resp);
        console.log('setting user - ', user);
        sessionStorage.setItem('cti-user', JSON.stringify(user));
        this.isLoggedIn = true;
        return user;
      })
      .catch(this.handleError);
  }

  getCurrentUser(): User {
    let user = JSON.parse(sessionStorage.getItem('cti-user'));
    return User.parseJson(user);
  }

  logout(): void {
    this.isLoggedIn = false;
    sessionStorage.removeItem('cti-user');
  }

  isInSession(): boolean {
    if (sessionStorage.getItem('cti-user')) {
      console.log('user is logged in');
      return true;
    } else {
      console.log('user is not logged in');
      return false;
    }
  }

  protected handleError(error: Response | any) {
    // In a real world app, we might use a remote logging infrastructure
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);
    return Promise.reject(errMsg);
  }
}
