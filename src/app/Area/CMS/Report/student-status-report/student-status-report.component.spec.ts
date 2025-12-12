import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentStatusReportComponent } from './student-status-report.component';

describe('StudentStatusReportComponent', () => {
  let component: StudentStatusReportComponent;
  let fixture: ComponentFixture<StudentStatusReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StudentStatusReportComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(StudentStatusReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
