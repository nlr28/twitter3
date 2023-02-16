import {Component, OnDestroy} from '@angular/core';
import {Tweet} from "../share/model/tweet";
import {TweetService} from "../share/tweetservice/tweet.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-main-feed',
  templateUrl: './main-feed.component.html',
  styleUrls: ['./main-feed.component.scss']
})
export class MainFeedComponent implements OnDestroy {

  public tweets: Tweet[] =[];
  public subscriptions: Subscription[] = new Array<Subscription>();

  public subscription: Subscription = new Subscription();

  public constructor(public tweetService: TweetService) {
    this.tweets = this.tweetService.getTweets();

    this.subscription = this.tweetService.newTweets$.subscribe(() => {
      this.tweets = this.tweetService.getTweets();
    });

  }

  public ngOnDestroy() {
    //this.subscriptions.forEach(subscription => { subscription.unsubscribe(); });
    this.subscription.unsubscribe();
  }


}
