import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';

import { RegisterComponent } from './register/register.component'; // buat component register
import { PostComponent } from './post/post.component'; // untuk component post
import { AddpostComponent } from './addpost/addpost.component'; // untuk tambah post
import { EditpostComponent } from './editpost/editpost.component'; // untuk edit post
import { FindComponent } from './find/find.component';
import { ProfileComponent } from './profile/profile.component';
import { DetailpostComponent } from './detailpost/detailpost.component';
import { EditprofileComponent } from './editprofile/editprofile.component';

const routes: Routes = [
  { path:'login', component:LoginComponent },
  { path:'register', component:RegisterComponent },
  { path:'post', component:PostComponent },
  { path:'addpost', component:AddpostComponent},
  { path:'editpost/:id', component:EditpostComponent},
  { path:'find', component:FindComponent},
  { path:'profile/:username', component:ProfileComponent},
  { path:'detailpost/:id', component:DetailpostComponent},
  { path:'editprofile', component:EditprofileComponent}
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
