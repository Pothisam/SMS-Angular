/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { SmsNavComponent } from './sms-nav.component';

describe('SmsNavComponent', () => {
  let component: SmsNavComponent;
  let fixture: ComponentFixture<SmsNavComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SmsNavComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SmsNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
