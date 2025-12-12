import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TCPrintComponent } from './tcprint.component';

describe('TCPrintComponent', () => {
  let component: TCPrintComponent;
  let fixture: ComponentFixture<TCPrintComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TCPrintComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TCPrintComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
