import { Component } from '@angular/core';
import {Tweet} from "../share/model/tweet";

@Component({
  selector: 'app-main-feed',
  templateUrl: './main-feed.component.html',
  styleUrls: ['./main-feed.component.scss']
})
export class MainFeedComponent {

  public tweets: Tweet[] =[];

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


}
