/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { ClassInchargeComponent } from './ClassIncharge.component';

describe('ClassInchargeComponent', () => {
  let component: ClassInchargeComponent;
  let fixture: ComponentFixture<ClassInchargeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ClassInchargeComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClassInchargeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
