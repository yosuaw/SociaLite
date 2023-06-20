import { Component, OnInit } from '@angular/core';
import { AppComponent } from '../app.component';
import { UserService } from '../user.service';
import { Storage } from '@ionic/storage-angular';
import { Router } from '@angular/router'; // untuk navigate route

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  username:string="";
  password:string="";
  passwordType: string = 'password';
  passwordIcon: string = 'eye';

  constructor(private app: AppComponent, private userService: UserService, private storage:Storage, private router: Router) { }

  ngOnInit() {}

  hideShowPassword() {
    if(this.passwordType == "password") {
      this.passwordType = "text";
      this.passwordIcon = "eye-off";
    } else {
      this.passwordType = "password";
      this.passwordIcon = "eye";
    }
  }
  
  login() {
    this.userService.login(this.username, this.password).subscribe(
      (data) => {
        if (data['result'] == 'success') {
          this.app.showToast("Login success!");
          localStorage.setItem("username", this.username);
          this.app.username = localStorage.getItem("username");
          this.router.navigate(['/post']);
        } else {
          this.app.showToast("Username or Password is incorrect!");
        }
      }
    );
  }

  goRegister() {
    this.router.navigate(['/register']);
  }
}
