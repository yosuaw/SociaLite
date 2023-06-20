import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  login(username:string, password:string): Observable<any> {
    let body = new HttpParams();
    body = body.set('username', username);
    body = body.set('password', password);
    return this.http.post("https://ubaya.fun/hybrid/160419015/Project_UAS/login.php", body);
  }

  register(name:string, email:string, username:string, password:string): Observable<any> {
    let body = new HttpParams();
    body = body.set('name', name);
    body = body.set('email', email);
    body = body.set('username', username);
    body = body.set('password', password);
    return this.http.post("https://ubaya.fun/hybrid/160419015/Project_UAS/register.php", body);
  }

  listUser() {
    return this.http.get("https://ubaya.fun/hybrid/160419015/Project_UAS/listuser.php");
  }

  getProfile(username:string): Observable<any> {
    let body = new HttpParams();
    body = body.set('username', username);
    return this.http.post("https://ubaya.fun/hybrid/160419015/Project_UAS/profile.php", body);
  }

  editProfile(username:string, password:string, name:string, email:string, bio:string, image:string, status: number) {
    let body = new HttpParams();
    body = body.set('username', username);
    body = body.set('password', password);
    body = body.set('name', name);
    body = body.set('email', email);
    body = body.set('bio', bio);
    body = body.set('image', image);
    body = body.set('status', status);
    return this.http.post("https://ubaya.fun/hybrid/160419015/Project_UAS/editprofile.php", body);
  }

  constructor(private http:HttpClient) { }
}
