import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StaffAttendanceSettingsComponent } from './staff-attendance-settings.component';

describe('StaffAttendanceSettingsComponent', () => {
  let component: StaffAttendanceSettingsComponent;
  let fixture: ComponentFixture<StaffAttendanceSettingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StaffAttendanceSettingsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(StaffAttendanceSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
