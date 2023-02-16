import {Injectable} from "@angular/core";
import {Tweet} from "../model/tweet";
import {Subject} from "rxjs";

@Injectable()
export class TweetService {

    public newTweets$ = new Subject();

    protected tweets: any[] = [];

    public constructor() {
        let tweet = new Tweet(new Date(), "Hello World", "John Doe", 0, [], [], []);
        this.tweets.push(tweet);
        tweet = new Tweet(new Date(), "This is the second tweet", "John Doe", 0, [], [], []);
        this.tweets.push(tweet);
        tweet = new Tweet(new Date(), "This is the third tweet", "John Doe", 0, [], [], []);
        this.tweets.push(tweet);
        tweet = new Tweet(new Date(), "This is the fourth tweet", "John Doe", 0, [], [], []);
        this.tweets.push(tweet);
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