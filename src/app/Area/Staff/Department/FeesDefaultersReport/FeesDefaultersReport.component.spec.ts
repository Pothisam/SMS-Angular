/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { FeesDefaultersReportComponent } from './FeesDefaultersReport.component';

describe('FeesDefaultersReportComponent', () => {
  let component: FeesDefaultersReportComponent;
  let fixture: ComponentFixture<FeesDefaultersReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [FeesDefaultersReportComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FeesDefaultersReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
