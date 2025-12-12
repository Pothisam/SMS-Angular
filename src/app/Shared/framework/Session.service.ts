import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SessionService {
  constructor() {}

  // #region StffEdit
  private staffEditIdSubject = new BehaviorSubject<number>(0);
  staffEditId$: Observable<number> = this.staffEditIdSubject.asObservable();
  setStaffEditId(value: number): void {
    this.staffEditIdSubject.next(value);
  }
  getStaffEditId(): number {
    return this.staffEditIdSubject.getValue();
  }
  // #endregion
  // #region StudentEdit
  private studentEditIdSubject = new BehaviorSubject<number>(0);
  studentEditId$: Observable<number> = this.studentEditIdSubject.asObservable();
  setStudentEditId(value: number): void {
    this.studentEditIdSubject.next(value);
  }
  getStudentEditId(): number {
    return this.studentEditIdSubject.getValue();
  }
  // #endregion
}
