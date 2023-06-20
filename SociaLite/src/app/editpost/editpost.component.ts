import { Component, OnInit } from '@angular/core';
import { PostService } from '../post.service'; // untuk post service
import { ActivatedRoute } from '@angular/router'; // untuk httpparams
import { AppComponent } from '../app.component'; // untuk akses toast nya appcomponent

@Component({
  selector: 'app-editpost',
  templateUrl: './editpost.component.html',
  styleUrls: ['./editpost.component.scss'],
})
export class EditpostComponent implements OnInit {
  title:string = "";
  caption:string = "";
  imgUrl:string = "";
  date:string = "";
  username:string = "";

  constructor(private post:PostService, private route:ActivatedRoute, private app:AppComponent) { }

  ngOnInit() {
    this.loadDetailPost();
  }

  loadDetailPost() {
    var id = this.route.snapshot.params['id'];
    this.post.loadDetailPost(localStorage.getItem('username'), id).subscribe(
      (data) => { 
        this.title = data[0]["title"];
        this.caption = data[0]["caption"];
        this.imgUrl = data[0]["image"];
        this.date = data[0]["date"];
        this.username = data[0]["username"];
      }
    );
  }

  editPost() {
    var id = this.route.snapshot.params['id'];
    this.post.editPost(this.title, this.caption, id).subscribe(
      (data) => { 
        this.app.showToast(data['result']);
      }
    );
  }
}
