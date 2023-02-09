import { Component } from '@angular/core';
import {Tweet} from "./share/model/tweet";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'twitter-web3';

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
