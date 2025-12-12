import { Component, ViewChild } from '@angular/core';
import { Location } from '@angular/common';
import { LayoutService } from './Global/Service/layout.service';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { GlobalService } from './Global/Service/global.service';
import { routeAnimations } from './Global/Service/route-animations.service';
import { MatDrawer } from '@angular/material/sidenav';
import { filter, lastValueFrom, Subscription } from 'rxjs';
import { FrameworkService } from './Shared/framework/framework.service';
import 'animate.css';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [routeAnimations],
  standalone: false,
})
export class AppComponent {
  title = 'CMS-Angular';
  @ViewChild('drawer', { static: false }) drawer: MatDrawer | undefined;
  private subscription: Subscription = new Subscription();
  public isPrintLayout: boolean = false;
  constructor(
    private Location: Location,
    private layout: LayoutService,
    private router: Router,
    private globalService: GlobalService,
    private frameworkService: FrameworkService,
    route: ActivatedRoute,
  ) {
    router.events.pipe(filter((e) => e instanceof NavigationEnd)).subscribe(() => {
      let r = route.root;
      while (r.firstChild) r = r.firstChild;
      this.isPrintLayout = r.snapshot.data?.['isprint'] == true;
    });
    if (this.Location.path() == '' || this.Location.path() == '/cms') {
      this.router.navigate(['CMS/Login']);
    }
    if (this.Location.path().toLowerCase() == '/staff') {
      this.router.navigate(['Staff/Login']);
    }
    if (this.Location.path().toLowerCase() == '/sms') {
      this.router.navigate(['SMS/Login']);
    }
    this.CheckLocalStorage(this.Location.path().split('/')[1]);
  }
  private closeClickedByBackdrop = false;
  onBackdropClicked() {
    this.closeClickedByBackdrop = true;
  }
  ngOnInit() {
    this.CheckLocalStorage(this.Location.path().split('/')[1]);
    this.ValidateArea();
    this.menu();
    this.getCurrentDate();
  }
  menu() {
    this.subscription = this.globalService.menustate.subscribe((isOpen: boolean) => {
      if (isOpen) {
        this.drawer?.open();
      } else {
        this.drawer?.close();
      }
    });
  }
  ValidateArea() {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.globalService.HandleArea(event.url.split('/')[1]);
        this.globalService.showHideIcon(false);
      }
    });
  }
  IsStaffNavVisible() {
    return this.layout.IsStaffNavVisible;
  }
  IsCMSNavVisible() {
    return this.layout.IsCMSNavVisible;
  }
  public CheckLocalStorage(Area: string) {
    if (Area == 'CMS') {
      this.layout.IsCMSNavVisible = true;
    }
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
  onDrawerClosed() {
    if (this.closeClickedByBackdrop) {
      this.globalService.menutoggle();
      this.closeClickedByBackdrop = false;
    }
  }
  async getCurrentDate(): Promise<void> {
    const response = await lastValueFrom(
      this.frameworkService.callAPIWithNoAuth('/Common/GetDate', '', 'CMS', true),
    );
  }
}
