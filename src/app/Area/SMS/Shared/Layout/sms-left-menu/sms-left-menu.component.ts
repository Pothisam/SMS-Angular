import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GlobalService } from 'src/app/Global/Service/global.service';
import { IMenuItem } from 'src/app/Shared/framework/accordion/accordion.model';

@Component({
  selector: 'app-sms-left-menu',
  templateUrl: './sms-left-menu.component.html',
  styleUrls: ['./sms-left-menu.component.css'],
  standalone: false
})
export class SmsLeftMenuComponent implements OnInit {
  src: string = '';
  panelOpenState = false;
  private retryCount = 0;
  constructor(private globalService: GlobalService,
    private router: Router) { }

  ngOnInit() {
    this.setMenuLogo();
    this.generatemenu();
  }
  closeMenu() {
    this.globalService.menutoggle();
  }
  generatemenu() {
    this.menu.push({ name: 'Dashboard', link: 'CMS/Dashboard' });
    this.menu.push({
              name: 'Management',
              subMenu: [
                { name: 'General Information', link: 'CMS/Institution' },
                { name: 'Department', link: 'CMS/Department' },
                { name: 'Course', link: 'CMS/Course' },
                { name: 'Section', link: 'CMS/Section' },
                { name: 'Batch', link: 'CMS/Batch' },
                { name: 'Holiday-Workingday', link: 'CMS/Holiday' },
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
