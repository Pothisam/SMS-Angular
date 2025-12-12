import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExportStaffDetailsComponent } from './export-staff-details.component';

describe('ExportStaffDetailsComponent', () => {
  let component: ExportStaffDetailsComponent;
  let fixture: ComponentFixture<ExportStaffDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExportStaffDetailsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ExportStaffDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
