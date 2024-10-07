import { IUserDomain } from "@domain";

export class UserDomain {
    public user_id: string;
    public nick_name: string;
    constructor(args: IUserDomain) {
        this.user_id = args.user_id;
        this.nick_name = args.nick_name;
    }
}
