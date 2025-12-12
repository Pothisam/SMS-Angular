import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplicationEditFormComponent } from './application-edit-form.component';

describe('ApplicationEditFormComponent', () => {
  let component: ApplicationEditFormComponent;
  let fixture: ComponentFixture<ApplicationEditFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ApplicationEditFormComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ApplicationEditFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
