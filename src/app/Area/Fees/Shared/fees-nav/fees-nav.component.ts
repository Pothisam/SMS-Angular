import { Component, DOCUMENT, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { Router } from '@angular/router';
import { SMSService } from 'src/app/Area/SMS/Shared/Layout/SMS.service';
import { SelectInterface } from 'src/app/Global/Interface/common-interface';
import { GlobalService } from 'src/app/Global/Service/global.service';
import { ApiCallService } from 'src/app/Shared/apiCall.service';
import { FrameworkService } from 'src/app/Shared/framework/framework.service';

@Component({
  selector: 'app-fees-nav',
  templateUrl: './fees-nav.component.html',
  styleUrls: ['./fees-nav.component.scss'],
  standalone: false,
})
export class FeesNavComponent implements OnInit {
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
    private smsService: SMSService,
    @Inject(DOCUMENT) private document: Document,
  ) {
    if (this.globalService.GLSG('FeesToken') != null) {
      let userJSON = localStorage.getItem('FeesToken');
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
  }

  ngOnInit() {}
  loadmenu() {
    this.filter.push({
      text: 'Dashboard',
      value: '/Fees/Dashboard',
    });
  }
  private getStaffProfileimage() {
    let userJSON = localStorage.getItem('FeesToken');
    if (userJSON !== null) {
      this.guid = JSON.parse(userJSON).guid;
    }
  }
  loadLogo() {
    let token = localStorage.getItem('FeesToken');

    this.frameworkService.callAPI('/Common/GetLogo', '', 'Fees', false).subscribe({
      next: (Response) => {
        if (Response.data != null) {
          if (token) {
            let object = JSON.parse(token);
            object.logoWithText = Response.data.logoWithText;
            object.logo = Response.data.logo;
            object.favIcon = Response.data.favIcon;
            let updatedobject = JSON.stringify(object);
            localStorage.setItem('FeesToken', updatedobject);
            this.src = Response.data.logoWithText;
            this.setFavicon(Response.data.favIcon);
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
  toggleDrawer(): void {
    this.globalService.menutoggle();
  }
  public Logout() {
    ApiCallService.clearCache();
    localStorage.removeItem('FeesToken');
    this.router.navigate(['Fees/Login']);
  }
  refreshPage() {
    ApiCallService.clearCache();
    location.reload();
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
}
