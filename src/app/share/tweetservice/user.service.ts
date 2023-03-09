import {Injectable} from "@angular/core";
import {User} from "../model/user";
import {Web3Service} from "../web3service/web3.service";
import {Subject} from "rxjs";

@Injectable()
export class UserService {

    public anonymousUser = new User('Jhon Doe', '', 'https://pbs.twimg.com/profile_images/1481281375835725825/rZzCEFm3_400x400.jpg');

    protected userInSession: any;

    public userInSessionChanged$ = new Subject();

    public constructor(protected web3Service: Web3Service) {
        this.userInSession = this.anonymousUser; //by default;
        this.web3Service.status$.subscribe(async (status) => {
            if(status == true) {
                this.userInSession = this.buildUser(await this.web3Service.getUserInSession());
            }
            else {
                this.userInSession = this.anonymousUser;
            }
            this.userInSessionChanged$.next(this.userInSession);
        });
    }

    public async updateUser(user: User): Promise<void> {
        await this.web3Service.updateUser(user);
    }

    public async getUser(address: string) {
        let user = this.anonymousUser; //by default
        try {
            user = this.buildUser(await this.web3Service.getUser(address));
        }
        catch(error) {
            //nothing
        }
        return user;
    }

    public buildUser(userFromWeb3: any) {
        let user = new User(userFromWeb3.name,
                            userFromWeb3.bio,
                      'https://mysupercoolipfs.infura-ipfs.io/ipfs/' + userFromWeb3.avatar);
        return user;
    }

    public getUserInSession() {
        return this.userInSession;
    }


}
