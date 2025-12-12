/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { MarkreportComponent } from './markreport.component';

describe('MarkreportComponent', () => {
  let component: MarkreportComponent;
  let fixture: ComponentFixture<MarkreportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MarkreportComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MarkreportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
