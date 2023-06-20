import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { AppComponent } from '../app.component';
import { PostService } from '../post.service';  // untuk post nya service
import { ChangeDetectorRef } from '@angular/core'; // untuk handle error setelah perubahan src di HTML

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PostComponent implements OnInit {
  userLogged:string = localStorage.getItem('username');

  constructor(private post: PostService, private app: AppComponent, private cdref: ChangeDetectorRef) { }

  ngOnInit() {
    this.listPost();
  }

  ngAfterContentChecked(): void {
    this.cdref.detectChanges(); 
  }

  // untuk post
  posts = [];
  status = [];
  likes = [];

  listPost() {
    this.post.postList(localStorage.getItem('username')).subscribe(
      (data) => { 
        this.posts = data; 
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

  getTimeStamp() {
    const current = new Date();
    return current.getTime();
  }
}
