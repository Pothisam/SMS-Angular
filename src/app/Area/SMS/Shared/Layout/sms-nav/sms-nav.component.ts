import { Component, DOCUMENT, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { Router } from '@angular/router';
import { SelectInterface } from 'src/app/Global/Interface/common-interface';
import { GlobalService } from 'src/app/Global/Service/global.service';
import { ApiCallService } from 'src/app/Shared/apiCall.service';
import { FrameworkService } from 'src/app/Shared/framework/framework.service';

@Component({
  selector: 'app-sms-nav',
  templateUrl: './sms-nav.component.html',
  styleUrls: ['./sms-nav.component.css'],
  standalone: false,
})
export class SmsNavComponent implements OnInit {
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
    @Inject(DOCUMENT) private document: Document,
  ) {
    if (this.globalService.GLSG('SMSToken') != null) {
      let userJSON = localStorage.getItem('SMSToken');
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
  private getStaffProfileimage() {
    let userJSON = localStorage.getItem('SMSToken');
    if (userJSON !== null) {
      this.guid = JSON.parse(userJSON).guid;
    }
  }
  loadmenu() {
    this.filter.push(
      {
        text: 'Dashboard',
        value: '/SMS/Dashboard',
      },
      {
        text: 'Institution',
        value: '/SMS/Institution',
      },
      {
        text: 'Class',
        value: '/SMS/Class',
      },
    );
  }
  ngOnInit() {}
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
  loadLogo() {
    let token = localStorage.getItem('SMSToken');

    this.frameworkService.callAPI('/Common/GetLogo', '', 'SMS', false).subscribe({
      next: (Response) => {
        if (Response.data != null) {
          if (token) {
            let object = JSON.parse(token);
            object.logoWithText = Response.data.logoWithText;
            object.logo = Response.data.logo;
            object.favIcon = Response.data.favIcon;
            let updatedobject = JSON.stringify(object);
            localStorage.setItem('SMSToken', updatedobject);
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
  public Logout() {
    ApiCallService.clearCache();
    localStorage.removeItem('SMSToken');
    this.router.navigate(['SMS/Login']);
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
