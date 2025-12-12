/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { IssueTCComponent } from './IssueTC.component';

describe('IssueTCComponent', () => {
  let component: IssueTCComponent;
  let fixture: ComponentFixture<IssueTCComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [IssueTCComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IssueTCComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
