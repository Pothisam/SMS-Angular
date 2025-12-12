import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScholarshipReportComponent } from './scholarship-report.component';

describe('ScholarshipReportComponent', () => {
  let component: ScholarshipReportComponent;
  let fixture: ComponentFixture<ScholarshipReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ScholarshipReportComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ScholarshipReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
