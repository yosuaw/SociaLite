import { Component } from '@angular/core';

import { ToastController } from '@ionic/angular'; // munculin toast klo berhasil login
import { Router } from '@angular/router'; // untuk navigate route


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  username;

  ngOnInit() {
    this.username = localStorage.getItem("username");

    if (this.username == null) {
      this.router.navigate(['/login']);
    } else {
      this.router.navigate(['/post']);
    }
  }

  async showToast(msg:string) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 1500
    });
    toast.present();
  }

  getTimeStamp() {
    const current = new Date();
    return current.getTime();
  }

  openMenu() {
    this
  }

  constructor(private toastController: ToastController, private router: Router) { }

  async logout() {
    localStorage.removeItem('username');
    
    this.username = null;
    this.ngOnInit();
  }
}
