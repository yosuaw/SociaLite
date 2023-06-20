import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { AppComponent } from '../app.component';
import { ActivatedRoute } from '@angular/router';
import { PostService } from '../post.service';
import {ChangeDetectorRef } from '@angular/core'; // untuk handle error setelah perubahan src di HTML

@Component({
  selector: 'app-detailpost',
  templateUrl: './detailpost.component.html',
  styleUrls: ['./detailpost.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DetailpostComponent implements OnInit {
  loggedUser:string = localStorage.getItem("username");
  id:number = 0;
  title:string = "";
  caption:string = "";
  imgUrl:string = "";
  date:string = "";
  username:string = "";
  likes:number = 0;
  status:number = 0;
  comments = [];
  profileUrl:string = "";
  newcomment:string = "";
  newreply:string = "";
  replyStatus = [];

  constructor(public app: AppComponent, public ps: PostService, public route: ActivatedRoute, private cdref: ChangeDetectorRef) { }

  ngOnInit() {
    this.id = parseInt(this.route.snapshot.params['id']);
    this.ps.loadDetailPost(localStorage.getItem('username'), this.id).subscribe(
      (data) => { 
        this.title = data[0]["title"];
        this.caption = data[0]["caption"];
        this.imgUrl = data[0]["image"];
        this.date = data[0]["date"];
        this.username = data[0]["username"];
        this.status = data[0]["status"];
        this.likes = data[0]["like"];
        this.profileUrl = data[0]['profilepic'];
      }
    );
    this.loadComment();
  }

  ngAfterContentChecked() {
    this.cdref.detectChanges(); 
  }

  likeClicked(id: number, status: number) {
    if(status == 0) {
      this.ps.addLike(localStorage.getItem('username'), id).subscribe(
        (data) => { 
          if (data['result'] == 'success') {
            this.status = 1;
            this.likes += 1;
          } else {
            this.app.showToast("Connection error!");
          }
        }
      );
    } else {
      this.ps.removeLike(localStorage.getItem('username'), id).subscribe(
        (data) => { 
          if (data['result'] == 'success') {
            this.status = 0;
            this.likes -= 1;
          } else {
            this.app.showToast("Connection error!");
          }
        }
      );
    }
  }

  loadComment() {
    this.ps.loadComment(this.id).subscribe(
      (data) => { 
        this.comments = data;

        var i=0;
        this.comments.forEach(element => {
          this.replyStatus[this.comments[i]['idcomment']] = 0;
          i++;
        });
      }
    );
  }

  addComment() {
    this.ps.addComment(this.id, this.newcomment, this.loggedUser).subscribe(
      (data) => {
        this.ps.loadComment(this.id).subscribe(
          (data) => { 
            this.comments.push(data[data.length-1]);
            this.newcomment = "";
            this.replyStatus[data[data.length-1]['idcomment']] = 0;
            this.app.showToast('Comment added');
          }
        );
      }
    )
  }

  addReply(idx:number, idcomment:number) {
    this.ps.addReply(idcomment,this.loggedUser, this.newreply).subscribe(
      (data) => {
        this.ps.loadComment(this.id).subscribe(
          (data) => { 
            var replyLength = data[idx]['reply'].length - 1;
            this.comments[idx]['reply'].push(data[idx]['reply'][replyLength]);
            this.newreply = "";
            this.app.showToast('Reply added');
          }
        ); 
      }
    )
  }

  replyComment(index:number) {
    var i =0;
    this.comments.forEach(element => {
      if (this.comments[i]['idcomment'] != index) {
        this.replyStatus[this.comments[i]['idcomment']] = 0;
      }
      i++;
    });

    this.newreply = "";

    if (this.replyStatus[index] == 1) 
      this.replyStatus[index] = 0;
    else
      this.replyStatus[index] = 1;
  }

  getTimeStamp() {
    const current = new Date();
    return current.getTime();
  }
}
