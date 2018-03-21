import {Injectable} from '@angular/core';
import 'rxjs/add/operator/map';
import {User} from '../models/user';
import 'rxjs/add/operator/toPromise';
import {BaseService} from './base.service';
import {Observable} from 'rxjs/Observable';
import {UserNotification} from '../models';
import {HttpClient} from '@angular/common/http';
import {Logger} from '../shared/logger';

@Injectable()
export class UserService extends BaseService {
  isLoggedIn: boolean = false;

  // store the URL so we can redirect after logging in
  redirectUrl: string;

  constructor(protected http: HttpClient, logger: Logger) {
    super(http, logger);
  }

  getUsers(): Observable<User[]> {
    return this.http.get('/api/users')
      .map(response => {
        let body: any = response;
        let users: User[] = [];
        for (let i = 0; i < body.length; i++) {
          users.push(User.parseJson(body[i]));
        }
        this.logger.info('got users ', users);
        return users;
      });
  }

  updatePreference(user: User): Promise<any> {
    user.setPreferenceStr();
    this.logger.debug('updating preferences - ', user.preferenceStr);
    return this.http.patch('/api/users/' + user.id, user)
      .toPromise()
      .then(resp => {
        const body: any = resp;

        this.logger.info('update successful - ' + body);
        let currentUser: User = this.getCurrentUser();
        if (currentUser.id === user.id) {
          this.logger.debug('updated current user, set info to current session');
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

  login(user: User): Promise<User> {
    this.isLoggedIn = false;
    return this.http.post('api/users/login', user)
      .toPromise()
      .then(resp => {
        const body = resp;
        // store in session storage
        let user: User = User.parseJson(resp);
        this.logger.info('setting user - ', user);
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
      this.logger.info('user is logged in');
      return true;
    } else {
      this.logger.info('user is not logged in');
      return false;
    }
  }
}
