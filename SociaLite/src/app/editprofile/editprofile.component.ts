import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { AppComponent } from '../app.component';
import { UserService } from '../user.service';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx'; // untuk camera
import {ChangeDetectorRef } from '@angular/core'; // untuk handle error setelah perubahan src di HTML

@Component({
  selector: 'app-editprofile',
  templateUrl: './editprofile.component.html',
  styleUrls: ['./editprofile.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EditprofileComponent implements OnInit {
  username: string = "";
  password: string = "";
  name: string = "";
  email: string = "";
  bio: string = "";
  imagebefore: string = "";
  image: string = "";
  passwordType: string = 'password';
  passwordIcon: string = 'eye';
  status: number = 0;
  options: CameraOptions = {
    quality: 100,
    destinationType: this.camera.DestinationType.DATA_URL,
    encodingType: this.camera.EncodingType.JPEG,
    mediaType: this.camera.MediaType.PICTURE,
    sourceType: this.camera.PictureSourceType.CAMERA,
    saveToPhotoAlbum: true
  };
  constructor(private userService: UserService, private app: AppComponent, public camera:Camera, private cdref: ChangeDetectorRef) { }

  ngOnInit() {
    this.getProfile();
  }

  ngAfterContentChecked() {
    this.cdref.detectChanges(); 
  }

  hideShowPassword() {
    if(this.passwordType == "password") {
      this.passwordType = "text";
      this.passwordIcon = "eye-off";
    } else {
      this.passwordType = "password";
      this.passwordIcon = "eye";
    }
  }

  ambilFoto() {
    this.camera.getPicture(this.options).then(
      (imageData) => {
         let base64Image = 'data:image/jpeg;base64,' + imageData;
         this.image = base64Image;
      }
      , (err) => {
        // kalau error
      }
    );
  }

  getProfile() {
    var timestamp = this.app.getTimeStamp();
    this.userService.getProfile(localStorage.getItem('username')).subscribe(
      (data) => { 
        if (data['result'] == 'success') {
          this.username = data['data']['username'];
          this.password = data['data']['password'];
          this.name = data['data']['name']; 
          this.email = data['data']['email']; 
          this.bio = data['data']['bio']; 
          this.imagebefore = "https://ubaya.fun/hybrid/160419015/Project_UAS/images/" + data['data']['image'] + "?" + timestamp;
          this.image = "https://ubaya.fun/hybrid/160419015/Project_UAS/images/" + data['data']['image'] + "?" + timestamp;
          
          if(data['data']['image'] != "") {
            this.status = 1;
          } else {
            this.imagebefore = "https://cdn-icons-png.flaticon.com/128/847/847969.png" + "?" + timestamp;
            this.image = "https://cdn-icons-png.flaticon.com/128/847/847969.png" + "?" + timestamp;
          }
        } 
      }
    );
  }

  editProfile() {
    if(this.image == this.imagebefore) {
      this.status = 0;
    } else {
      this.status = 1;
    }
    this.userService.editProfile(this.username, this.password, this.name, this.email, this.bio, this.image, this.status).subscribe(
      (data) => { 
        this.app.showToast(data['result']);
      }
    );
  }
}
