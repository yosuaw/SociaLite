import { Component, OnInit } from '@angular/core';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx'; // untuk camera
import { AppComponent } from '../app.component';
import { PostService } from '../post.service';

@Component({
  selector: 'app-addpost',
  templateUrl: './addpost.component.html',
  styleUrls: ['./addpost.component.scss'],
})
export class AddpostComponent implements OnInit {
  title:string = "";
  caption:string = "";
  imageUrl:string = "";
  options: CameraOptions = {
    quality: 100,
    destinationType: this.camera.DestinationType.DATA_URL,
    encodingType: this.camera.EncodingType.JPEG,
    mediaType: this.camera.MediaType.PICTURE,
    sourceType: this.camera.PictureSourceType.CAMERA,
    saveToPhotoAlbum: true
  };

  constructor(public camera:Camera, private post:PostService, private app:AppComponent) { }

  ngOnInit() {}

  hapusFoto() {
    this.imageUrl = "";
  }

  ambilFoto() {
    this.camera.getPicture(this.options).then(
     (imageData) => {
        let base64Image = 'data:image/jpeg;base64,' + imageData;
        this.imageUrl = base64Image;
     }
     , (err) => {
     }
    );
  }

  addPost() {
    if (this.imageUrl != "" && this.title != "" && this.caption != "") {
      this.post.addPost(this.title, this.caption, this.imageUrl, localStorage.getItem('username')).subscribe(
        (data) => { 
          this.app.showToast(data['result']);
        }
      );
    } else if (this.imageUrl == ""){
      this.app.showToast('Please take a photo first!');
    } else if (this.title == "" || this.caption == "") {
      this.app.showToast('Please fill all the blank spaces');
    }
  }
}
