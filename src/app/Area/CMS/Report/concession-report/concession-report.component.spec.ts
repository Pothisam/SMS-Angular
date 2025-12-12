import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConcessionReportComponent } from './concession-report.component';

describe('ConcessionReportComponent', () => {
  let component: ConcessionReportComponent;
  let fixture: ComponentFixture<ConcessionReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConcessionReportComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ConcessionReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
