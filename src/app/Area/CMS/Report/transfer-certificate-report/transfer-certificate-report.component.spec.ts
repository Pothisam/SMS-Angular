import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransferCertificateReportComponent } from './transfer-certificate-report.component';

describe('TransferCertificateReportComponent', () => {
  let component: TransferCertificateReportComponent;
  let fixture: ComponentFixture<TransferCertificateReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TransferCertificateReportComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TransferCertificateReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
