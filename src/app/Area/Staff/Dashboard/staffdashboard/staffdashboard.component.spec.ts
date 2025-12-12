/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { StaffdashboardComponent } from './staffdashboard.component';

describe('StaffdashboardComponent', () => {
  let component: StaffdashboardComponent;
  let fixture: ComponentFixture<StaffdashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [StaffdashboardComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StaffdashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
