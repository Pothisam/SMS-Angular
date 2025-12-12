import { Component } from '@angular/core';
import { GlobalService } from 'src/app/Global/Service/global.service';
import { Router } from '@angular/router';
import { IMenuItem } from 'src/app/Shared/framework/accordion/accordion.model';
import { UserService } from '../../../User/User.service';
import { Cmspermission } from '../../../User/Login/Permission/cmspermission';

@Component({
  selector: 'app-cms-left-menu',
  templateUrl: './cms-left-menu.component.html',
  styleUrls: ['./cms-left-menu.component.scss'],
  standalone: false,
})
export class CmsLeftMenuComponent {
  src: string = '';
  panelOpenState = false;
  constructor(
    private globalService: GlobalService,
    private router: Router,
    private userservice: UserService,
  ) {}
  private retryCount = 0;
  ngOnInit() {
    this.setMenuLogo();
    this.generatemenu();
  }
  closeMenu() {
    this.globalService.menutoggle();
  }
  generatemenu() {
    if (this.globalService.GLSG('CMSToken') != null) {
      this.userservice.getPermission().subscribe({
        next: (response) => {
          const permission: Cmspermission = response.data;
          this.menu = [];
          this.menu.push({ name: 'Dashboard', link: 'CMS/Dashboard' });
          if (permission['Management']) {
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
          if (permission['Staff']) {
            this.menu.push({
              name: 'Staff',
              subMenu: [
                { name: 'Add Staff', link: 'CMS/AddStaff' },
                { name: 'View Staff', link: 'CMS/ViewStaffList' },
              ],
            });
          }
          if (permission['Student']) {
            this.menu.push({
              name: 'Student',
              subMenu: [
                { name: 'Application Form', link: 'CMS/ApplicationForm' },
                { name: 'Add Student', link: 'CMS/AddStudent' },
                { name: 'View Student', link: 'CMS/ViewStudentlist' },
              ],
            });
          }
          this.menu.push({
            name: 'Report',
            subMenu: [
              {
                name: 'Export Student Details',
                link: 'CMS/ExportStudentDetails',
              },
              {
                name: 'Student Status Report',
                link: 'CMS/StudentStatusReport',
              },
              { name: 'Adminssion Report', link: 'CMS/AdminssionReport' },
              { name: 'Concession Report', link: 'CMS/ConcessionReport' },
              { name: 'ScholarShip Report', link: 'CMS/ScholarShipReport' },
              { name: 'Staff Export Details', link: 'CMS/StaffExportDetails' },
              { name: 'Staff Status Report', link: 'CMS/StaffStatusReport' },
              { name: 'Transfer Certificate Report', link: 'CMS/TransferCertificateReport' },
            ],
          });
        },
      });
    }
  }
  public menu: IMenuItem[] = [
    // ... other menu items
  ];

  private setMenuLogo() {
    if (this.globalService.GLSG('CMSToken') != null) {
      let userJSON = localStorage.getItem('CMSToken');
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
