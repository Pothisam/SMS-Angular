import { Component, ElementRef, Inject, ViewChild, DOCUMENT } from '@angular/core';
import { Router } from '@angular/router';
import { GlobalService } from 'src/app/Global/Service/global.service';
import { FrameworkService } from 'src/app/Shared/framework/framework.service';

import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { SelectInterface } from 'src/app/Global/Interface/common-interface';
import { ApiCallService } from 'src/app/Shared/apiCall.service';
import { UserService } from '../../../User/User.service';
import { Cmspermission } from '../../../User/Login/Permission/cmspermission';
@Component({
  selector: 'app-cms-nav',
  templateUrl: './cms-nav.component.html',
  styleUrls: ['./cms-nav.component.scss'],
  standalone: false,
})
export class CmsNavComponent {
  @ViewChild('IDLayoutSerach') input: ElementRef<HTMLInputElement> | undefined;
  userName: string | null | undefined;
  src: string = '';
  darkmode: boolean = false;
  searchText: string = '';
  public arrayDate: { value: string; text: string }[] = [];
  filter: SelectInterface[] = [];
  showChangePassword: boolean = false;
  showChangeInstitution: boolean = false;
  ProfileGuide: string = '';
  showAppSettings: boolean = false;
  public guid: string = '';
  constructor(
    private router: Router,
    private globalService: GlobalService,
    private frameworkService: FrameworkService,
    private userservice: UserService,
    @Inject(DOCUMENT) private document: Document,
  ) {
    if (this.globalService.GLSG('CMSToken') != null) {
      let userJSON = localStorage.getItem('CMSToken');
      if (userJSON !== null) {
        // Parse the JSON string to an object
        this.userName = JSON.parse(userJSON).userName;
        this.ProfileGuide = JSON.parse(userJSON).guid;
        console.log(this.ProfileGuide);
        if (JSON.parse(userJSON).logoWithText == undefined) {
          this.loadLogo();
        } else {
          this.src = JSON.parse(userJSON).logoWithText;
          this.setFavicon(JSON.parse(userJSON).favIcon);
        }
        if (JSON.parse(userJSON).loginType == 'Admin') {
          this.showChangePassword = true;
          this.showChangeInstitution = true;
        }
        this.loadmenu();
      }
      this.getStaffProfileimage();
    }

    const theme = this.globalService.GLSG('Darktheme');
    this.darkmode = theme !== null && (theme.toLowerCase() === 'true' || theme === '1');

    const themeToApply = this.darkmode ? 'cyan-orange' : 'indigo-pink';
    this.globalService.switchTheme(themeToApply);
  }
  loadmenu() {
    this.userservice.getPermission().subscribe({
      next: (response) => {
        const permission: Cmspermission = response.data;
        this.filter = [];
        this.filter.push({
          text: 'Dashboard',
          value: '/CMS/Dashboard',
        });
        if (permission['Management']) {
          this.filter.push(
            {
              text: 'Institution',
              value: 'CMS/Institution',
            },
            {
              text: 'Department',
              value: 'CMS/Department',
            },
            {
              text: 'Course',
              value: 'CMS/Course',
            },
            {
              text: 'Section',
              value: 'CMS/Section',
            },
            {
              text: 'Batch',
              value: 'CMS/Batch',
            },
            {
              text: 'Holiday-Workingday',
              value: 'CMS/Holiday',
            },
          );
        }
        if (permission['Staff']) {
          this.filter.push(
            {
              text: 'Staff',
              value: 'CMS/AddStaff',
            },
            {
              text: 'View Staff',
              value: 'CMS/ViewStaffList',
            },
          );
        }
        if (permission['Student']) {
          this.filter.push(
            {
              text: 'Application Form',
              value: 'CMS/ApplicationForm',
            },
            {
              text: 'Add Student',
              value: 'CMS/AddStudent',
            },
            {
              text: 'View Student',
              value: 'CMS/ViewStudentlist',
            },
          );
        }
        if (permission['Change Institution']) {
          this.showChangeInstitution = true;
          this.filter.push({
            text: 'Change Institution',
            value: 'CMS/ChangeInstitution',
          });
        }
        this.filter.push(
          {
            text: 'Export Student Details',
            value: 'CMS/ExportStudentDetails',
          },
          {
            text: 'Adminssion Report',
            value: 'CMS/AdminssionReport',
          },
          {
            text: 'Concession Report',
            value: 'CMS/ConcessionReport',
          },
          {
            text: 'ScholarShip Report',
            value: 'CMS/ScholarShipReport',
          },
          {
            text: 'Staff Export Details',
            value: 'CMS/StaffExportDetails',
          },
          {
            text: 'Staff Status Report',
            value: 'CMS/StaffStatusReport',
          },
          {
            text: 'Transfer Certificate Report',
            value: 'CMS/TransferCertificateReport',
          },
        );
        if (permission['Application Settings']) {
          this.showAppSettings = true;
          this.filter.push(
            {
              text: 'Fees Settings',
              value: 'CMS/FeesSettings',
            },
            {
              text: 'Staff Attandance Settings',
              value: 'CMS/StaffAttandanceSettings',
            },
            {
              text: 'Add Admin',
              value: 'CMS/AddAdmin',
            },
          );
        }
      },
    });
  }
  setFavicon(url: string): void {
    const link: HTMLLinkElement =
      this.document.querySelector('link[rel*="icon"]') || this.document.createElement('link');
    link.type = 'image/x-icon';
    link.rel = 'shortcut icon';
    link.href = url;
    this.document.getElementsByTagName('head')[0].appendChild(link);
  }
  ngOnInit() {
    //this.loadLogo();
  }
  darkMode() {
    this.darkmode = !this.darkmode;
    if (this.darkmode) {
      this.globalService.switchTheme('cyan-orange');
    } else {
      this.globalService.switchTheme('indigo-pink');
    }
    this.globalService.GLSS('Darktheme', String(this.darkmode));
  }
  toggleDrawer(): void {
    this.globalService.menutoggle();
  }
  private getStaffProfileimage() {
    let userJSON = localStorage.getItem('CMSToken');
    if (userJSON !== null) {
      this.guid = JSON.parse(userJSON).guid;
    }
  }
  loadLogo() {
    let token = localStorage.getItem('CMSToken');

    this.frameworkService.callAPI('/Common/GetLogo', '', 'CMS', false).subscribe({
      next: (Response) => {
        if (Response.data != null) {
          if (token) {
            let object = JSON.parse(token);
            object.logoWithText = Response.data.logoWithText;
            object.logo = Response.data.logo;
            object.favIcon = Response.data.favIcon;
            let updatedobject = JSON.stringify(object);
            localStorage.setItem('CMSToken', updatedobject);
            this.src = Response.data.logoWithText;
            this.setFavicon(Response.data.favIcon);
          }
        }
      },
    });
  }
  public Logout() {
    ApiCallService.clearCache();
    localStorage.removeItem('CMSToken');
    this.router.navigate(['CMS/Login']);
  }
  onInputChange() {
    if (this.searchText.length > 0) {
      this.arrayDate = this.filter.filter((o) =>
        o.text.toLowerCase().includes(this.searchText.toLowerCase()),
      );
    }
  }
  onSelectChange(event: MatAutocompleteSelectedEvent) {
    const strings = event.option.value;
    this.router.navigate([strings]);
    this.searchText = '';
    this.arrayDate = [];
  }
  refreshPage() {
    ApiCallService.clearCache();
    location.reload();
  }
}
