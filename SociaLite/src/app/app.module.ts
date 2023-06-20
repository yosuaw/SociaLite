import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { RegisterComponent } from './register/register.component'; // buat component register
import { FormsModule } from '@angular/forms'; // untuk two-way binding
import { UserService } from './user.service'; // service untuk login dan register
import { HttpClientModule } from '@angular/common/http'; // mendapat data dari server
import { IonicStorageModule } from '@ionic/storage-angular'; // untuk local storage
import { RouterModule, Routes } from '@angular/router'; // untuk routing
import { LoginComponent } from './login/login.component'; // untuk login
import { PostComponent } from './post/post.component'; // untuk halaman list post semua user
import { AddpostComponent } from './addpost/addpost.component'; // untuk tambah post
import { Camera } from '@ionic-native/camera/ngx'; // untuk plugin camera
import { PostService } from './post.service'; // untuk service nya post
import { EditpostComponent } from './editpost/editpost.component'; // untuk edit post
import { FindComponent } from './find/find.component'; // untuk component find
import { Ng2SearchPipeModule } from 'ng2-search-filter'; // untuk search bar
import { ProfileComponent } from './profile/profile.component'; // untuk component profile
import { DetailpostComponent } from './detailpost/detailpost.component'; // untuk detailpost component
import { EditprofileComponent } from './editprofile/editprofile.component'; // untuk edit profile
import { PopoverController } from '@ionic/angular'; // untuk pop-over
import { PopoverComponent } from './popover/popover.component'; // untuk popover component


@NgModule({
  declarations: [AppComponent, RegisterComponent, LoginComponent, PostComponent, AddpostComponent, EditpostComponent,
  FindComponent, ProfileComponent, DetailpostComponent, EditprofileComponent, PopoverComponent],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule, FormsModule, HttpClientModule, IonicStorageModule.forRoot(),
  RouterModule, Ng2SearchPipeModule],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }, PostService, UserService, Camera, PopoverController],
  bootstrap: [AppComponent],
})
export class AppModule {}
