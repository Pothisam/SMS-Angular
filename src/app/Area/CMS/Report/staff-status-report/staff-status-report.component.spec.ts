import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StaffStatusReportComponent } from './staff-status-report.component';

describe('StaffStatusReportComponent', () => {
  let component: StaffStatusReportComponent;
  let fixture: ComponentFixture<StaffStatusReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StaffStatusReportComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(StaffStatusReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
