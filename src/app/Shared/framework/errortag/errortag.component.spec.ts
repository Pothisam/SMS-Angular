/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { ErrortagComponent } from './errortag.component';

describe('ErrortagComponent', () => {
  let component: ErrortagComponent;
  let fixture: ComponentFixture<ErrortagComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ErrortagComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ErrortagComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
