import {
  Component,
  OnInit,
  ElementRef,
  Renderer2,
  RendererFactory2,
  AfterViewInit,
} from '@angular/core';
import { BadgeService } from './BadgeService.service';
import { MatBadgeModule } from '@angular/material/badge';
import { GlobalService } from 'src/app/Global/Service/global.service';

@Component({
  selector: 'fw-errortag',
  templateUrl: './errortag.component.html',
  styleUrls: ['./errortag.component.css'],
  standalone: false,
})
export class ErrortagComponent implements OnInit {
  iconButtonBadgeValue: number = 0;
  errormessage: { id: string; msg: string }[] = [];
  iconstatus: boolean = false;
  private renderer: Renderer2;

  constructor(
    private badgeService: BadgeService,
    private el: ElementRef,
    private rendererFactory: RendererFactory2,
    private globalService: GlobalService,
  ) {
    this.renderer = rendererFactory.createRenderer(null, null);
  }

  ngOnInit() {
    this.errormessage = [];
    this.badgeService.badgeValue$.subscribe((value) => {
      this.iconButtonBadgeValue = value;
    });
    this.badgeService.errorarray$.subscribe((errorlist) => {
      this.errormessage = [];
      this.errormessage = this.errormessage.concat(errorlist);
    });
    this.badgeService.showhide$.subscribe((value) => {
      this.iconstatus = value;
      this.showHideIcon(value);
    });
    this.addClickEventListener();
  }

  addClickEventListener() {
    const errorBar = this.el.nativeElement.querySelector('.Error-Bar');
    if (errorBar) {
      this.renderer.listen(errorBar, 'click', (event: MouseEvent) => {
        this.showhideError(errorBar);
      });
      this.renderer.listen(errorBar, 'keydown.enter', (event: KeyboardEvent) => {
        this.showhideError(errorBar);
      });
    }
    const closebutton = this.el.nativeElement.querySelector('.Error-Bar-Close');
    if (closebutton) {
      this.renderer.listen(closebutton, 'click', (event: MouseEvent) => {
        this.showhideError(errorBar);
      });
      this.renderer.listen(closebutton, 'keydown.enter', (event: KeyboardEvent) => {
        event.preventDefault();
        this.showhideError(errorBar);
      });
    }
  }
  showhideError(Icon: HTMLElement) {
    const message = this.el.nativeElement.querySelector('.Error-Notification-Card');
    const errorNotificationCard = message?.classList.contains('d-none');
    if (errorNotificationCard) {
      this.renderer.removeClass(message, 'd-none');
      this.renderer.setAttribute(Icon, 'tabindex', '-1');
    } else {
      this.renderer.addClass(message, 'd-none');
      this.renderer.setAttribute(Icon, 'tabindex', '0');
    }
  }
  showHideIcon(status: boolean) {
    const errorBar = this.el.nativeElement.querySelector('.Error-Bar');
    const message = this.el.nativeElement.querySelector('.Error-Notification-Card');
    if (status) {
      this.renderer.removeClass(errorBar, 'd-none');
      this.renderer.removeClass(message, 'd-none');
    } else {
      this.renderer.addClass(errorBar, 'd-none');
      this.renderer.addClass(message, 'd-none');
    }
  }

  errorInputFocus(name: string) {
    //const errorList = this.el.nativeElement.querySelector('.Errorlist');
    //const name = errorList.getAttribute('data-focus');
    if (name !== null) {
      let element = document.getElementById(name);
      if (element) {
        element.focus();
      }
    }
  }
}
