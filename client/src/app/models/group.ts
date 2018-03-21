import {User} from './user';

export class Group {

    public owner: User;
    public members: User[] = [];

    static fromJson(json: any) {
        return new Group(
            json.id,
            json.groupName,
            json.avatarUrl,
            json.description,
            json.createdAt,
            json.updatedAt,
            json.UserId,
            json.owner,
            json.members
        );
    }

    constructor(public id: number = null,
                public groupName: string = null,
                public avatarUrl: string = null,
                public description: string = null,
                public createdAt: Date = null,
                public updatedAt: Date = null,
                public UserId: number = null,
                owner: User = null,
                members: User[] = []) {

        this.owner = User.parseJson(owner);

        for (let i = 0; i < members.length; i++) {
            this.members.push(User.parseJson(members[i]));
        }
    }
}
