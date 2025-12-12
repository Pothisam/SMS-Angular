import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplicationAddFormComponent } from './application-add-form.component';

describe('ApplicationAddFormComponent', () => {
  let component: ApplicationAddFormComponent;
  let fixture: ComponentFixture<ApplicationAddFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ApplicationAddFormComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ApplicationAddFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
