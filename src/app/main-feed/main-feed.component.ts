import { Component } from '@angular/core';
import {Tweet} from "../share/model/tweet";
import {TweetService} from "../share/tweetservice/tweet.service";

@Component({
  selector: 'app-main-feed',
  templateUrl: './main-feed.component.html',
  styleUrls: ['./main-feed.component.scss']
})
export class MainFeedComponent {

  public tweets: Tweet[] =[];

  public constructor(public tweetService: TweetService) {
    this.tweets = this.tweetService.getTweets();
  }


}
