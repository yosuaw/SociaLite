import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private http:HttpClient) { }

  postList(username:string): Observable<any> {
    let body = new HttpParams();
    body = body.set('username', username);
    return this.http.post("https://ubaya.fun/hybrid/160419015/Project_UAS/post.php", body);
  }

  addLike(username:string, id:number): Observable<any> {
    let body = new HttpParams();
    body = body.set('username', username);
    body = body.set('id', id);
    return this.http.post("https://ubaya.fun/hybrid/160419015/Project_UAS/addlike.php", body);
  }

  removeLike(username:string, id:number): Observable<any> {
    let body = new HttpParams();
    body = body.set('username', username);
    body = body.set('id', id);
    return this.http.post("https://ubaya.fun/hybrid/160419015/Project_UAS/removelike.php", body);
  }

  addPost(title:string, caption:string, url:string, username:string): Observable<any> {
    let body = new HttpParams();
    body = body.set('title', title);
    body = body.set('caption', caption);
    body = body.set('url', url);
    body = body.set('username', username);
    return this.http.post("https://ubaya.fun/hybrid/160419015/Project_UAS/addpost.php", body);
  }

  loadDetailPost(username:string, id:number): Observable<any> {
    let body = new HttpParams();
    body = body.set('username', username);
    body = body.set('id', id);
    return this.http.post("https://ubaya.fun/hybrid/160419015/Project_UAS/detailpost.php", body);
  }

  editPost(title:string, caption:string, id:number): Observable<any> {
    let body = new HttpParams();
    body = body.set('title', title);
    body = body.set('caption', caption);
    body = body.set('id', id);
    return this.http.post("https://ubaya.fun/hybrid/160419015/Project_UAS/editpost.php", body);
  }

  deletePost(id:number): Observable<any> {
    let body = new HttpParams();
    body = body.set('id', id);
    return this.http.post("https://ubaya.fun/hybrid/160419015/Project_UAS/deletepost.php", body);
  }

  specificPostList(username:string, userlogged:string): Observable<any> {
    let body = new HttpParams();
    body = body.set('username', username);
    body = body.set('userlogged', userlogged);
    return this.http.post("https://ubaya.fun/hybrid/160419015/Project_UAS/specificpost.php", body);
  }

  loadComment(id:number): Observable<any> {
    let body = new HttpParams();
    body = body.set('id', id);
    return this.http.post("https://ubaya.fun/hybrid/160419015/Project_UAS/loadcomment.php", body);
  }
  
  addComment(id:number, comment:string, username:string): Observable<any> {
    let body = new HttpParams();
    body = body.set('id', id);
    body = body.set('comment', comment);
    body = body.set('username', username);
    return this.http.post("https://ubaya.fun/hybrid/160419015/Project_UAS/addcomment.php", body)
  }

  addReply(id:number, username:string, comment:string) {
    let body = new HttpParams();
    body = body.set('id', id);
    body = body.set('username', username);
    body = body.set('comment', comment);
    return this.http.post("https://ubaya.fun/hybrid/160419015/Project_UAS/addreply.php", body)
  }
}
