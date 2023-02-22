import {Injectable} from "@angular/core";
import {Tweet} from "../model/tweet";
import {Subject} from "rxjs";
import {UserService} from "./user.service";
import {User} from "../model/user";

@Injectable()
export class TweetService {

    public newTweets$ = new Subject();

    protected tweets: any[] = [];

    public constructor(protected userService: UserService) {

        let author: User | null = this.userService.getUser('@jondoe');

        if(author != null) {
            let tweet = new Tweet(new Date(), "Hello World", author, 0, [], [], []);
            this.tweets.push(tweet);
            tweet = new Tweet(new Date(), "This is the second tweet", author, 0, [], [], []);
            this.tweets.push(tweet);
            tweet = new Tweet(new Date(), "This is the third tweet", author, 0, [], [], []);
            this.tweets.push(tweet);
            tweet = new Tweet(new Date(), "This is the fourth tweet", author, 0, [], [], []);
            this.tweets.push(tweet);
        }
    }

    public publishTweet(tweet: Tweet): void {
        //append the tweet at the very beginning of this.tweet array:
        this.tweets.unshift(tweet);
        this.newTweets$.next(true);
    }

    public getTweets(): Tweet[] {
        let returnValue: Tweet[] = [];
        this.tweets.forEach(tweet => {
            returnValue.push(tweet);
        });
        return returnValue;

    }

}