import {Injectable} from '@angular/core';
import 'rxjs/add/operator/map';
import {User} from '../models/user';
import 'rxjs/add/operator/toPromise';
import {BaseService} from './base.service';
import {Observable} from 'rxjs/Observable';
import {AuthService} from './auth.service';
import {UserNotification} from '../models';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class UserService extends BaseService {
  isLoggedIn: boolean = false;

  // store the URL so we can redirect after logging in
  redirectUrl: string;

  constructor(protected http: HttpClient,
              private authService: AuthService) {
    super(http);
  }

  getUsers(): Observable<User[]> {
    return this.http.get('/api/users')
      .map(response => {
        let body: any = response;
        let users: User[] = [];
        for (let i = 0; i < body.length; i++) {
          users.push(User.parseJson(body[i]));
        }
        console.log('got users ', users);
        return users;
      });
  }

  updatePreference(user: User): Promise<any> {
    user.setPreferenceStr();
    console.debug('updating preferences - ', user.preferenceStr);
    return this.http.patch('/api/users/' + user.id, user)
      .toPromise()
      .then(resp => {
        const body: any = resp;

        console.log('update successful - ' + body);
        let currentUser: User = this.authService.getCurrentUser();
        if (currentUser.id === user.id) {
          console.debug('updated current user, set info to current session');
          sessionStorage.setItem('cti-user', JSON.stringify(user));
        }

        return body.data || {};
      })
      .catch(this.handleError);
  }

  register(user: User): Promise<User> {
    this.isLoggedIn = false;
    return this.http.post('/api/users', user)
      .toPromise()
      .then(resp => {
        const body: any = resp;
        return body.data || {};
      })
      .catch(this.handleError);
  }

  getNotifications(user: User): Promise<UserNotification[]> {
    return this.http.get('/api/user-notifications/user/' + user.id)
      .toPromise()
      .then(resp => {
        const body: any = resp;
        let notifications = [];
        for (let i = 0; i < body.length; i++) {
          notifications.push(UserNotification.parseUserNotificationJson(body[i]));
        }
        return notifications;
      })
      .catch(this.handleError);
  }

  getUnreadNotifications(user: User): Promise<UserNotification[]> {
    return this.http.get('/api/user-notifications/user/' + user.id + '/unread')
      .toPromise()
      .then(resp => {
        const body: any = resp;
        let notifications = [];
        for (let i = 0; i < body.length; i++) {
          notifications.push(UserNotification.parseUserNotificationJson(body[i]));
        }
        return notifications;
      })
      .catch(this.handleError);
  }

}
