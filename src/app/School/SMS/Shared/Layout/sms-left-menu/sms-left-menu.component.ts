import { Component, OnInit } from '@angular/core';
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
  constructor(private globalService: GlobalService) {}
  public menu: IMenuItem[] = [];
  ngOnInit() {
    this.menu.push({ name: 'Dashboard', link: 'SMS/Dashboard' });
  }
  closeMenu() {
    this.globalService.menutoggle();
  }
}
