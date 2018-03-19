export class UserNotification {

    static parseJson(userNotification: any): UserNotification {
        return new UserNotification(userNotification.id, userNotification.readFlag, new Date(userNotification.createdAt),
            new Date(userNotification.updatedAt),
            userNotification.title, userNotification.text, userNotification.source,
            userNotification.sourceId);
    }

    static parseUserNotificationJson(userNotification: any): UserNotification {
        return new UserNotification(userNotification.id, userNotification.readFlag, new Date(userNotification.createdAt),
            new Date(userNotification.updatedAt),
            userNotification.Notification.title, userNotification.Notification.text, userNotification.Notification.source,
            userNotification.Notification.sourceId);
    }

    /**
     * parse Notification into UserNotification
     * @param notification
     * @returns {UserNotification}
     */
    static parseNotificationJson(notification: any): UserNotification {
        return new UserNotification(notification.UserNotification.id, notification.UserNotification.readFlag,
            new Date(notification.UserNotification.createdAt), new Date(notification.UserNotification.updatedAt),
            notification.title, notification.text, notification.source, notification.sourceId);
    }

    constructor(public id: number = null,
                public readFlag: boolean = false,
                public createdAt: Date = null,
                public updatedAt: Date = null,
                // embedded object notification
                public title: string = null,
                public text: string = null,
                public source: string = null,
                public sourceId: number) {
    }

    getTypeInitial(): string {
        return this.source.charAt(0);
    }

    getLink(): string {
        return this.source + '/' + this.sourceId;
    }
}
