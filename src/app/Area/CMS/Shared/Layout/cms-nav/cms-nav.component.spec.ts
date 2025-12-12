import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CmsNavComponent } from './cms-nav.component';

describe('CmsNavComponent', () => {
  let component: CmsNavComponent;
  let fixture: ComponentFixture<CmsNavComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CmsNavComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CmsNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
