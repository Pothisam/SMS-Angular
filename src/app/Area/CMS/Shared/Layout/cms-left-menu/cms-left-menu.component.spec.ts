import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CmsLeftMenuComponent } from './cms-left-menu.component';

describe('CmsLeftMenuComponent', () => {
  let component: CmsLeftMenuComponent;
  let fixture: ComponentFixture<CmsLeftMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CmsLeftMenuComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CmsLeftMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
