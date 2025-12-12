import { Component, ElementRef, Inject, ViewChild, DOCUMENT } from '@angular/core';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { Router } from '@angular/router';
import { Cmspermission } from 'src/app/Area/SMS/User/Login/Permission/cmspermission';
import { SelectInterface } from 'src/app/Global/Interface/common-interface';
import { GlobalService } from 'src/app/Global/Service/global.service';
import { ApiCallService } from 'src/app/Shared/apiCall.service';
import { FrameworkService } from 'src/app/Shared/framework/framework.service';
import { StaffService } from '../../../User/Staff.service';
import { StaffLoginDetails } from 'src/app/Modules/Staff/User/StaffDetails';

@Component({
  selector: 'app-staff-nav',
  templateUrl: './staff-nav.component.html',
  styleUrls: ['./staff-nav.component.scss'],
  standalone: false,
})
export class StaffNavComponent {
  @ViewChild('IDLayoutSerach') input: ElementRef<HTMLInputElement> | undefined;
  userName: string | null | undefined;
  public guid: string = '';
  src: string = '';
  darkmode: boolean = false;
  searchText: string = '';
  public arrayDate: { value: string; text: string }[] = [];
  filter: SelectInterface[] = [];
  showChangePassword: boolean = false;
  showChangeInstitution: boolean = false;
  ProfileGuide: string = '';
  showAppSettings: boolean = false;
  constructor(
    private router: Router,
    private staffService: StaffService,
    private globalService: GlobalService,
    private frameworkService: FrameworkService,
    @Inject(DOCUMENT) private document: Document,
  ) {
    if (this.globalService.GLSG('StaffToken') != null) {
      let userJSON = localStorage.getItem('StaffToken');
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
        this.loadmenu();
      }
    }
    this.getStaffProfileimage();
    const theme = this.globalService.GLSG('Darktheme');
    this.darkmode = theme !== null && (theme.toLowerCase() === 'true' || theme === '1');

    const themeToApply = this.darkmode ? 'cyan-orange' : 'indigo-pink';
    this.globalService.switchTheme(themeToApply);
  }
  toggleDrawer(): void {
    this.globalService.menutoggle();
  }
  private getStaffProfileimage() {
    let userJSON = localStorage.getItem('StaffToken');
    if (userJSON !== null) {
      this.guid = JSON.parse(userJSON).guid;
    }
  }
  loadmenu() {
    this.staffService.getStaffDetails().subscribe({
      next: (response) => {
        if (response.data != null) {
          const permission: StaffLoginDetails = response.data;
          this.filter = [];
          this.filter.push({
            text: 'Dashboard',
            value: '/Staff/Dashboard',
          });

          if (permission.designationCode === 101) {
            this.filter.push(
              {
                text: 'Add Class Incharge',
                value: 'Staff/ClassIncharge',
              },
              {
                text: 'Fees Defaulters Report',
                value: 'Staff/FeesDefaultersReport',
              },
              {
                text: 'Issue TC',
                value: 'Staff/IssueTC',
              },
              {
                text: 'Add Subject',
                value: 'Staff/AddSubject',
              },
              {
                text: 'Add Course Instructor',
                value: 'Staff/AddCourseInstructor',
              },
              {
                text: 'Student Time Table',
                value: 'Staff/StudentTimeTable',
              },
              {
                text: 'Substitution',
                value: 'Staff/Substitution',
              },
              {
                text: 'Student Mark Entry',
                value: 'Staff/StudentMarkEntry',
              },
              {
                text: 'Student Mark Report',
                value: 'Staff/StudentMarkReport',
              },
              {
                text: 'Student Mark Analysis Report',
                value: 'Staff/MarkAnalysisReport',
              },
            );
          }
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
  darkMode() {
    this.darkmode = !this.darkmode;
    if (this.darkmode) {
      this.globalService.switchTheme('cyan-orange');
    } else {
      this.globalService.switchTheme('indigo-pink');
    }
    this.globalService.GLSS('Darktheme', String(this.darkmode));
  }
  loadLogo() {
    let token = localStorage.getItem('StaffToken');

    this.frameworkService.callAPI('/Common/GetLogo', '', 'Staff', false).subscribe({
      next: (Response) => {
        if (Response.data != null) {
          if (token) {
            let object = JSON.parse(token);
            object.logoWithText = Response.data.logoWithText;
            object.logo = Response.data.logo;
            object.favIcon = Response.data.favIcon;
            let updatedobject = JSON.stringify(object);
            localStorage.setItem('StaffToken', updatedobject);
            this.src = Response.data.logoWithText;
            this.setFavicon(Response.data.favIcon);
          }
        }
      },
    });
  }
  public Logout() {
    ApiCallService.clearCache();
    localStorage.removeItem('StaffToken');
    this.router.navigate(['Staff/Login']);
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
