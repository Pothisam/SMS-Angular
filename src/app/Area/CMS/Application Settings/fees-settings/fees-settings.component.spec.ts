import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeesSettingsComponent } from './fees-settings.component';

describe('FeesSettingsComponent', () => {
  let component: FeesSettingsComponent;
  let fixture: ComponentFixture<FeesSettingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FeesSettingsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FeesSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
