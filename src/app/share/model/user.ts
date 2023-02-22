import {Tweet} from "./tweet";


export class User {

    protected _id: string;

    set id(value: any) {
        this._id = value;
    }

    get id(): any {
        return this._id;
    }

    protected _name: string;

    set name(value: any) {
        this._name = value;
    }

    get name(): any {
        return this._name;
    }

    protected _picture: string;

    set picture(value: any) {
        this._picture = value;
    }

    get picture(): any {
        return this._picture;
    }

    protected tweets: Tweet[];

    protected followers: User[];

    protected following: User[];

    public constructor(id: string, name: string, picture: string) {
        this._id = id;
        this._name = name;
        this._picture = picture;
        this.tweets = [];
        this.followers = [];
        this.following = [];
    }


}