import { Component, OnInit } from '@angular/core';
import { AppComponent } from '../app.component';
import { UserService } from '../user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  username:string = "";
  password:string = "";
  name:string = "";
  email:string = "";
  passwordType: string = 'password';
  passwordIcon: string = 'eye';

  constructor(private app:AppComponent, private userService: UserService, private router: Router) { }

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

  register() {
    if (this.username == "" || this.password == "" || this.name == "") {
      this.app.showToast('Please fill all the required fields!');
    } else {
      this.userService.register(this.name, this.email, this.username, this.password).subscribe(
        (data) => { 
          if (data['result'] == 'success'){
            this.app.showToast(data['message']);
            this.router.navigate(['/login']);
          } else {
            this.app.showToast(data['message']);
          }
        }
      );
    }
  }

  goBack() {
    this.router.navigate(['/login']);
  }
}
