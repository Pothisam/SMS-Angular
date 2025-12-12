/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { MarkAnalysisReportComponent } from './MarkAnalysisReport.component';

describe('MarkAnalysisReportComponent', () => {
  let component: MarkAnalysisReportComponent;
  let fixture: ComponentFixture<MarkAnalysisReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MarkAnalysisReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MarkAnalysisReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
