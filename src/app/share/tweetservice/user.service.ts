import {Injectable} from "@angular/core";
import {User} from "../model/user";

@Injectable()
export class UserService {

    protected users: User[] = [];

    public constructor() {
        let user = new User('@jondoe', 'Jhon Doe', 'https://pbs.twimg.com/profile_images/1481281375835725825/rZzCEFm3_400x400.jpg');
        this.users.push(user);
    }

    public getUser(id: string): User | null {
        let user = this.users.filter(user => user.id === id);
        if(user.length > 0) {
            return user[0];
        }
        return null;
    }


}