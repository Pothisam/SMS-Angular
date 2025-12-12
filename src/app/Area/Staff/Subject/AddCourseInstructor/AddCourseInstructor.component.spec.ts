/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { AddCourseInstructorComponent } from './AddCourseInstructor.component';

describe('AddCourseInstructorComponent', () => {
  let component: AddCourseInstructorComponent;
  let fixture: ComponentFixture<AddCourseInstructorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AddCourseInstructorComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddCourseInstructorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
