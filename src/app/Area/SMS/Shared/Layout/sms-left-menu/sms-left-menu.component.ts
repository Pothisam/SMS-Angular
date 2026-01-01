import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GlobalService } from 'src/app/Global/Service/global.service';
import { IMenuItem } from 'src/app/Shared/framework/accordion/accordion.model';

@Component({
  selector: 'app-sms-left-menu',
  templateUrl: './sms-left-menu.component.html',
  styleUrls: ['./sms-left-menu.component.css'],
  standalone: false,
})
export class SmsLeftMenuComponent implements OnInit {
  src: string = '';
  panelOpenState = false;
  private retryCount = 0;
  constructor(private globalService: GlobalService, private router: Router) {}

  ngOnInit() {
    this.setMenuLogo();
    this.generatemenu();
  }
  closeMenu() {
    this.globalService.menutoggle();
  }
  generatemenu() {
    this.menu.push({ name: 'Dashboard', link: 'SMS/Dashboard' });
    this.menu.push({
      name: 'Management',
      subMenu: [
        { name: 'General Information', link: 'SMS/Institution' },
        { name: 'Class', link: 'SMS/Class' },
        { name: 'Section', link: 'SMS/Section' },
        { name: 'AcademicYear', link: 'SMS/AcademicYear' },
        { name: 'Holiday-Workingday', link: 'CMS/Holiday' },
      ],
    });
    this.menu.push({
      name: 'Staff',
      subMenu: [
        { name: 'Add Staff', link: 'SMS/AddStaff' },
        { name: 'View Staff', link: 'SMS/ViewStaffs' },
      ],
    });
    this.menu.push({
      name: 'Student',
      subMenu: [
        { name: 'Add Student', link: 'SMS/AddStudent' },
        { name: 'View Staff', link: 'SMS/ViewStudentList' },
      ],
    });
  }
  public menu: IMenuItem[] = [
    // ... other menu items
  ];

  private setMenuLogo() {
    if (this.globalService.GLSG('SMSToken') != null) {
      let userJSON = localStorage.getItem('SMSToken');
      if (userJSON !== null) {
        if (JSON.parse(userJSON).logoWithText == undefined) {
          if (this.retryCount < 3) {
            setTimeout(() => {
              this.retryCount++;
              this.setMenuLogo(); // Retry the operation
            }, 3000);
          }
        } else {
          this.src = JSON.parse(userJSON).logoWithText;
        }
      }
    }
  }
}
