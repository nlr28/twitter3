import {Component, Input} from '@angular/core';
import {Tweet} from "../model/tweet";

@Component({
  selector: 'tweet',
  templateUrl: './tweet.component.html',
  styleUrls: ['./tweet.component.scss']
})
export class TweetComponent {

  @Input()
  public content: any = null;

  public name = "John Doe";

  constructor() { }


}
