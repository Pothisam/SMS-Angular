import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Cmspermission } from 'src/app/Area/CMS/User/Login/Permission/cmspermission';
import { UserService } from 'src/app/Area/CMS/User/User.service';
import { GlobalService } from 'src/app/Global/Service/global.service';
import { IMenuItem } from 'src/app/Shared/framework/accordion/accordion.model';
import { StaffService } from '../../../User/Staff.service';
import { StaffLoginDetails } from 'src/app/Modules/Staff/User/StaffDetails';

@Component({
  selector: 'app-staff-left-menu',
  templateUrl: './staff-left-menu.component.html',
  styleUrls: ['./staff-left-menu.component.css'],
  standalone: false,
})
export class StaffLeftMenuComponent implements OnInit {
  src: string = '';
  panelOpenState = false;

  constructor(
    private globalService: GlobalService,
    private router: Router,
    private staffService: StaffService,
  ) {}
  private retryCount = 0;
  ngOnInit() {
    this.setMenuLogo();
    this.generatemenu();
  }
  public menu: IMenuItem[] = [
    // ... other menu items
  ];
  closeMenu() {
    this.globalService.menutoggle();
  }
  generatemenu() {
    if (this.globalService.GLSG('StaffToken') != null) {
      this.staffService.getStaffDetails().subscribe({
        next: (response) => {
          if (response.data != null) {
            const permission: StaffLoginDetails = response.data;
            this.menu = [];
            this.menu.push({ name: 'Dashboard', link: 'Staff/Dashboard' });

            if (permission.designationCode === 101) {
              this.menu.push({
                name: 'Department',
                subMenu: [
                  { type: 'header', name: 'HOD', cssClass: 'text-danger px-3' },
                  { name: 'Add Class Incharge', link: 'Staff/ClassIncharge' },
                  {
                    name: 'Fees Defaulters Report',
                    link: 'Staff/FeesDefaultersReport',
                  },
                  { name: 'Issue TC', link: 'Staff/IssueTC' },
                ],
              });
            }
            // #region Subject
            const subjectSubMenu: IMenuItem[] = [];

            if (permission.designationCode === 101) {
              subjectSubMenu.push(
                { type: 'header', name: 'HOD', cssClass: 'text-danger px-3' },
                {
                  name: 'Add Subject',
                  link: 'Staff/AddSubject',
                },
                {
                  name: 'Add Course Instructor',
                  link: 'Staff/AddCourseInstructor',
                },
              );
            }

            subjectSubMenu.push(
              { type: 'header', name: 'Class Incharge / HOD', cssClass: 'text-danger px-3' },
              {
                name: 'Student Time Table',
                link: 'Staff/StudentTimeTable',
              },
              { name: 'Substitution', link: 'Staff/Substitution' },
            );
            subjectSubMenu.push(
              { type: 'header', name: 'Student Mark', cssClass: 'text-danger px-3' },
              {
                name: 'Student Mark Entry',
                link: 'Staff/StudentMarkEntry',
              },
              { name: 'Student Mark Report', link: 'Staff/StudentMarkReport' },
              { name: 'Student Mark Analysis Report', link: 'Staff/MarkAnalysisReport' },
            );
            this.menu.push({
              name: 'Subject',
              subMenu: subjectSubMenu,
            });
            // #endregion
          }
        },
      });
    }
  }

  private setMenuLogo() {
    if (this.globalService.GLSG('StaffToken') != null) {
      let userJSON = localStorage.getItem('StaffToken');
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
