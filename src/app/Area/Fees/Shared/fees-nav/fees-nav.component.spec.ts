/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { FeesNavComponent } from './fees-nav.component';

describe('FeesNavComponent', () => {
  let component: FeesNavComponent;
  let fixture: ComponentFixture<FeesNavComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FeesNavComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FeesNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
