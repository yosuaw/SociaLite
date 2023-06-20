import { Component, OnInit } from '@angular/core';
import { NavParams, PopoverController } from '@ionic/angular'; // untuk param nya popover
import { Router } from '@angular/router'; // untuk navigate route
import { PostService } from '../post.service'; // untuk panggil method nya post service
import { ToastController } from '@ionic/angular'; // munculin toast klo berhasil login

@Component({
  selector: 'app-popover',
  templateUrl: './popover.component.html',
  styleUrls: ['./popover.component.scss'],
})
export class PopoverComponent implements OnInit {
  idpost:number = 0;
  idxpost:number = 0; 
  constructor(private navParams: NavParams, private router: Router, private post:PostService, private popover: PopoverController,
    private toastController:ToastController) {}

  ngOnInit() {
    this.idpost = this.navParams.get('postId');
    this.idxpost = this.navParams.get('postIndex');
  }

  async showToast(msg:string) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 1500
    });
    toast.present();
  }

  editPost() {
    this.router.navigate(['/editpost/' +this.idpost]);
    this.popover.dismiss();
  }

  deletePost() {
    this.post.deletePost(this.idpost).subscribe(
      (data) => {
       this.showToast(data['result']);
       this.popover.dismiss();
       this.router.navigate(['/post']);
      }
    );
  }
}
