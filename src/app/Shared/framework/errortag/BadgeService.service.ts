import { Injectable, Renderer2, RendererFactory2 } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { GlobalService } from 'src/app/Global/Service/global.service';
@Injectable({
  providedIn: 'root',
})
export class BadgeService {
  private renderer: Renderer2;
  constructor(
    private rendererFactory: RendererFactory2,
    private globalService: GlobalService,
  ) {
    this.renderer = rendererFactory.createRenderer(null, null);
  }
  private badgeValueSubject = new BehaviorSubject<number>(0);
  badgeValue$ = this.badgeValueSubject.asObservable();
  private errorarray = new BehaviorSubject<{ id: string; msg: string }>({ id: '', msg: '' });
  errorarray$ = this.errorarray.asObservable();
  updateBadgeValue(value: number) {
    this.badgeValueSubject.next(value);
  }
  updateErrorMsg(error: { id: string; msg: string }) {
    this.errorarray.next(error);
  }

  showhide: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  showhide$ = this.showhide.asObservable();
  errorIconShowHide(newValue: boolean) {
    this.showhide.next(newValue);
  }
  ngOnInit(): void {}
}
