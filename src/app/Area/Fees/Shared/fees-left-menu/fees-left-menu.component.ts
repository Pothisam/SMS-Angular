import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SMSService } from 'src/app/Area/SMS/Shared/Layout/SMS.service';
import { GlobalService } from 'src/app/Global/Service/global.service';
import { IMenuItem } from 'src/app/Shared/framework/accordion/accordion.model';

@Component({
  selector: 'app-fees-left-menu',
  templateUrl: './fees-left-menu.component.html',
  styleUrls: ['./fees-left-menu.component.scss'],
  standalone: false,
})
export class FeesLeftMenuComponent implements OnInit {
  src: string = '';
  panelOpenState = false;
  private retryCount = 0;
  constructor(
    private globalService: GlobalService,
    private router: Router,
    private smsservice: SMSService,
  ) {}
  closeMenu() {
    this.globalService.menutoggle();
  }
  public menu: IMenuItem[] = [
    // ... other menu items
  ];
  ngOnInit() {
    this.setMenuLogo();
    this.generatemenu();
  }
  private setMenuLogo() {
    if (this.globalService.GLSG('FeesToken') != null) {
      let userJSON = localStorage.getItem('FeesToken');
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
  generatemenu() {
    this.menu.push({ name: 'Dashboard', link: 'Fees/Dashboard' });
    this.menu.push({
      name: 'Manage Fees',
      subMenu: [
        { name: 'Add Fees Type', link: 'Fees/AddFeesType' },
        { name: 'Generate Fees', link: 'Fees/GenerateFees' },
      ],
    });
  }
}
