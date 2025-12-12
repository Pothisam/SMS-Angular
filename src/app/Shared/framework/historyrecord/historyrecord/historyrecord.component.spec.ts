/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { HistoryrecordComponent } from './historyrecord.component';

describe('HistoryrecordComponent', () => {
  let component: HistoryrecordComponent;
  let fixture: ComponentFixture<HistoryrecordComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [HistoryrecordComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HistoryrecordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
