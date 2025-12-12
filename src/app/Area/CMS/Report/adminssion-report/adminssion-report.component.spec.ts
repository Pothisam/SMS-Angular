import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminssionReportComponent } from './adminssion-report.component';

describe('AdminssionReportComponent', () => {
  let component: AdminssionReportComponent;
  let fixture: ComponentFixture<AdminssionReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminssionReportComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AdminssionReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
