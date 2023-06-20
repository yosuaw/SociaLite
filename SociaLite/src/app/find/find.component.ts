import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import {ChangeDetectorRef } from '@angular/core'; // untuk handle error setelah perubahan src di HTML

@Component({
  selector: 'app-find',
  templateUrl: './find.component.html',
  styleUrls: ['./find.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FindComponent implements OnInit {
  searchTerm: string;
  listUser = [];

  constructor(private userService: UserService, private cdref: ChangeDetectorRef) { }

  ngOnInit() {
    this.getList();
  } 

  ngAfterContentChecked(): void {
    this.cdref.detectChanges(); 
  }

  getList() {
    this.userService.listUser().subscribe(
      (data) => {
        if (data['result'] == 'success') {
          this.listUser = data['data']; 
        } 
      }
    );
  }

  getTimeStamp() {
    const current = new Date();
    return current.getTime();
  }
}
