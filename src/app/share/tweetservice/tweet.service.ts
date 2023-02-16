import {Injectable} from "@angular/core";
import {Tweet} from "../model/tweet";

@Injectable()
export class TweetService {

    public getTweets(): Tweet[] {
        let tweets: any[] = [];
        let tweet = new Tweet(new Date(), "Hello World", "John Doe", 0, [], [], []);
        tweets.push(tweet);
        tweet = new Tweet(new Date(), "This is the second tweet", "John Doe", 0, [], [], []);
        tweets.push(tweet);
        tweet = new Tweet(new Date(), "This is the third tweet", "John Doe", 0, [], [], []);
        tweets.push(tweet);
        tweet = new Tweet(new Date(), "This is the fourth tweet", "John Doe", 0, [], [], []);
        tweets.push(tweet);
        return tweets;
    }

}