import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LayoutService {
  IsCMSNavVisible: boolean = false;
  IsStaffNavVisible: boolean = false;
  IsSMSNavVisible: boolean = false;
  constructor() {}
  updateCMSNavVisibility(isVisible: boolean) {
    this.IsCMSNavVisible = isVisible;
  }
  updateStaffNavVisible(isVisible: boolean) {
    this.IsCMSNavVisible = isVisible;
  }
  updateSMSNavVisible(isVisible: boolean) {
    this.IsSMSNavVisible = isVisible;
  }
}
