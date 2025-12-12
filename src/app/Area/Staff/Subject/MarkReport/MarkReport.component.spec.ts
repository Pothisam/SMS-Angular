/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { MarkReportComponent } from './MarkReport.component';

describe('MarkReportComponent', () => {
  let component: MarkReportComponent;
  let fixture: ComponentFixture<MarkReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MarkReportComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MarkReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
