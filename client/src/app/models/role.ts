/**
 */
export class Role {

    static fromJson(json: any) {
        if (!json) {
            return;
        }

        return new Role(
            json.id,
            json.roleName,
            json.description,
            new Date(json.createdAt),
            new Date (json.updatedAt)
        );
    }

    constructor(public id: number = null,
                public roleName: string = '',
                public description: string = '',
                public createdAt: Date = null,
                public updatedAt: Date = null) {
    }


    toJson(stringify?: boolean): any {
        var doc = {
            id: this.id,
            awardName: this.roleName,
            issuer: this.description,
            issueDate: this.createdAt,
            userId: this.updatedAt
        };

        return stringify ? JSON.stringify({resource: [doc]}) : doc;
    }
}
