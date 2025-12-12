/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { StudentTimeTableComponent } from './StudentTimeTable.component';

describe('StudentTimeTableComponent', () => {
  let component: StudentTimeTableComponent;
  let fixture: ComponentFixture<StudentTimeTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [StudentTimeTableComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentTimeTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
