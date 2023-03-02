import {Component, ElementRef, ViewChild} from "@angular/core";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {TweetService} from "../tweetservice/tweet.service";
import {Tweet} from "../model/tweet";
import {UserService} from "../tweetservice/user.service";

declare let window: any;

@Component({
    selector: 'newtweet',
    templateUrl: 'newtweet.component.html',
    styleUrls: ['newtweet.component.scss']
})
export class NewTweetComponent {

    public form: FormGroup;

    public image: any = null

    @ViewChild('fileInput') fileInput!: ElementRef;

    public constructor(
        public formBuilder: FormBuilder,
        public userService: UserService,
        public tweetService: TweetService
    ) {

        this.form = this.formBuilder.group({
            tweetcontent: [null, [
                Validators.max(140)]]
        });


    }

    public submit() {
        if(this.form.valid) {
            let user= this.userService.getUser('@jondoe');
            if(user != null) {
                let tweetcontent = this.form.get('tweetcontent')?.value;
                let tweet = new Tweet(new Date(), tweetcontent, user);
                if(this.image != null) {
                    const reader = new window.FileReader();
                    reader.readAsArrayBuffer(this.image);
                    reader.onloadend = () => {
                        window.Buffer = require('buffer/').Buffer;
                        tweet.imageBuffer = window.Buffer(reader.result);
                        this.tweetService.publishTweet(tweet);
                    }
                }
                else {
                    this.tweetService.publishTweet(tweet);
                }
                this.form.reset();
            }
        }
    }

    public onFileSelected(event: any) {

        this.image = event.target.files[0];

    }

}