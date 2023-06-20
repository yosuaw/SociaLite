import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AppComponent } from '../app.component';
import { PostService } from '../post.service';
import { UserService } from '../user.service';
import { PopoverController, } from '@ionic/angular'; // untuk pop-over
import { PopoverComponent } from '../popover/popover.component';
import {ChangeDetectorRef } from '@angular/core'; // untuk handle error setelah perubahan src di HTML

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProfileComponent implements OnInit {
  loggedUser: string = localStorage.getItem('username');
  username: string = "";
  name: string = "";
  email: string = "";
  bio: string = "";
  image: string = "";
  // untuk post
  posts = [];
  status = [];
  likes = [];
  existPost:boolean = false;

  constructor(private route: ActivatedRoute, private userService: UserService, private post: PostService, private app: AppComponent,
    private popover: PopoverController, private cdref: ChangeDetectorRef) {
      this.ngOnInit();
  }

  ngOnInit() {
    this.username = this.route.snapshot.params['username'];
    this.getProfile();
    this.listPost();
  }

  ngAfterContentChecked(): void {
    this.cdref.detectChanges(); 
  }

  getTimeStamp() {
    const current = new Date();
    return current.getTime();
  }

  getProfile() {
    this.userService.getProfile(this.username).subscribe(
      (data) => { 
        if (data['result'] == 'success') {
          this.name = data['data']['name']; 
          this.email = data['data']['email']; 
          this.bio = data['data']['bio']; 
          this.image = data['data']['image'];
        } 
      }
    );
  }

  listPost() {
    this.post.specificPostList(this.username, localStorage.getItem('username')).subscribe(
      (data) => { 
        this.posts = data; 
        if(this.posts.length > 0) {
          this.existPost = true;
        }
        
        this.posts.forEach(element => {
          this.status[element['id']] = element['status'];
          this.likes[element['id']] = element['like'];
        });
      }
    );
  }

  likeClicked(id: number, status: number) {
    if(status == 0) {
      this.post.addLike(localStorage.getItem('username'), id).subscribe(
        (data) => { 
          if (data['result'] == 'success') {
            this.status[id] = 1;
            this.likes[id] += 1
          } else {
            this.app.showToast("Connection error!");
          }
        }
      );
    } else {
      this.post.removeLike(localStorage.getItem('username'), id).subscribe(
        (data) => { 
          if (data['result'] == 'success') {
            this.status[id] = 0;
            this.likes[id] -= 1;
          } else {
            this.app.showToast("Connection error!");
          }
        }
      );
    }
  }

  async CreatePopover(id: number, index: number) {
    const pop = await this.popover.create({
      component: PopoverComponent,
      translucent: true,
      componentProps: {
        "postId": id,
        "postIndex": index
      }
    });
    return await pop.present();
  }
}
