import { Component } from '@angular/core';
import {User} from "../share/model/user";
import {UserService} from "../share/tweetservice/user.service";
import {Web3Service} from "../share/web3service/web3.service";
import {Tweet} from "../share/model/tweet";
import {TweetService} from "../share/tweetservice/tweet.service";
import {MatDialog} from "@angular/material/dialog";
import {EditProfileComponent} from "../edit-profile/edit-profile.component";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent {

  protected user! : User;
  public tweets: Tweet[] =[];

  constructor(protected userService: UserService, protected tweetService: TweetService,
              public dialog: MatDialog, protected web3Service : Web3Service) {
          this.user = userService.getUserInSession();

      this.tweetService.getTweetsForCurrentUser().then((tweets: Tweet[]) => {
          this.tweets = tweets;
      });

  }

/*  updateProfile(){
      /!*const dialogRef = this.dialog.open(EditProfileComponent,
          {
              data: { name: this.user?.name, avatar: this.user?.avatar, bio: this.user?.bio },
          });

      dialogRef.afterClosed().subscribe(result => {
          console.log(result.bio);
              //this.user = result.bio;
          if (this.user) {
              this.userService.updateUser(this.user);
          }

      });*!/
      const dialogRef = this.dialog.open(EditProfileComponent,
          {
              data: { name: this.user?.name, avatar: this.user?.avatar, bio: this.user?.bio },
          });

      dialogRef.afterClosed().subscribe((result: User) => {
          if(this.user) {
              this.user.name = result.name;
              this.user.avatarBuffer = result.avatar;
              this.user.bio = result.bio;

              this.userService.updateUser(this.user);
          }

      });

  }*/

    openDialog(): void {
        this.user = this.userService.getUserInSession();
        const dialogRef = this.dialog.open(EditProfileComponent,
            {
                data: this.userService.getUserInSession(),
            });

        dialogRef.afterClosed().subscribe(result => {
            console.log(result);
            this.user.name = result.name;
            if(result.avatarBuffer) {
                console.log("entre al buffer");
                this.user.avatarBuffer = result.avatarBuffer;
            }
            this.user.bio = result.bio;

            this.userService.updateUser(this.user);

        });
    }

}
