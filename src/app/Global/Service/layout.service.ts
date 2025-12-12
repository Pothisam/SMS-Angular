import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LayoutService {
  IsSMSNavVisible: boolean = false;
  IsStaffNavVisible: boolean = false;
  constructor() {}
  updateSMSNavVisibility(isVisible: boolean) {
    this.IsSMSNavVisible = isVisible;
  }
  updateStaffNavVisible(isVisible: boolean) {
    this.IsStaffNavVisible = isVisible;
  }

}
