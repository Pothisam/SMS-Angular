/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { MarkEntryComponent } from './MarkEntry.component';

describe('MarkEntryComponent', () => {
  let component: MarkEntryComponent;
  let fixture: ComponentFixture<MarkEntryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MarkEntryComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MarkEntryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
