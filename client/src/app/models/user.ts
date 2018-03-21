import {UserNotification} from './user-notification';
import {Role} from './role';
import {Group} from './group';

export class User {

  public preference: Preference;
  public notifications: UserNotification[] = [];

  static parseJson(user: any): User {
    const roles: Role[] = [];
    const groups: Group[] = [];
    if (!user) {
      return null;
    }
    if (user.roles) {
      for (let i = 0; i < user.roles.length; i++) {
        roles.push(Role.fromJson(user.roles[i]));
      }
    }
    if (user.groups) {
      for (let i = 0; i < user.groups.length; i++) {
        groups.push(Group.fromJson(user.groups[i]));
      }
    }

    return new User(user.id, user.login, user.password, user.firstName, user.lastName, user.email, user.avatar,
      user.preferenceStr, user.jwtToken,
      user.permission, user.notifications,
      groups, roles);
  }

  constructor(public id: number = null,
              public login: string = null,
              public password: string = null,
              public firstName: string = null,
              public lastName: string = null,
              public email: string = null,
              public avatar: string = null,
              public preferenceStr: string = null,
              public jwtToken: string = null,
              public permissions: object[] = [],
              notifications: object[] = [],
              public groups: Group[] = [],
              public roles: Role[] = []) {

    this.preference = Preference.parseString(this.preferenceStr);

    for (let i = 0; i < notifications.length; i++) {
      if (notifications[i].hasOwnProperty('UserNotification')) {
        this.notifications.push(UserNotification.parseNotificationJson(notifications[i]));
      } else {
        this.notifications.push(UserNotification.parseJson(notifications[i]));
      }
    }
  }

  getFullName(): string {
    return this.firstName + ' ' + this.lastName;
  }

  setPreferenceStr() {
    this.preferenceStr = this.preference.toString();
  }

  hasRole(roleName: string): boolean {
    for (let i = 0; i < this.roles.length; i++) {
      if (this.roles[i].roleName === roleName) {
        return true;
      }
    }
    return false;
  }
}

export class Preference {
  public notifyNewWarningProblems: boolean = false;
  public notifyUpdateWarningProblems: boolean = false;
  public notifyDeleteWarningProblems: boolean = false;
  public notifyWarningProblemStatusChanges: boolean = false;
  public notifyNewIndicatorsObservables: boolean = false;
  public notifyUpdateIndicatorsObservables: boolean = false;
  public notifyDeleteIndicatorsObservables: boolean = false;
  public notifyIndicatorsObservablesStatusChanges: boolean = false;
  public notifyAnalysisResults: boolean = false;
  public notifyAnalysisSummary: boolean = false;
  public notifySuccessfulIngest: boolean = false;
  public notifyIngestorFailures: boolean = false;

  static parseString(preferenceStr: string) {
    return new Preference(preferenceStr);
  }

  constructor(preferenceStr: string) {
    let preferenceObj: any;
    if (typeof preferenceStr === 'string') {
      try {
        preferenceObj = JSON.parse(preferenceStr);
      } catch (error) {
        console.error('error parsing preferenceStr');
      }
    } else {
      preferenceObj = preferenceStr;
    }
    for (let key in preferenceObj) {
      if (this.hasOwnProperty(key)) {
        this[key] = preferenceObj[key];
      } else {
        console.warn('key - ', key, ' doesn\'t exist on preference');
      }
    }
  }

  toString(): string {
    return JSON.stringify(this);
  }
}
