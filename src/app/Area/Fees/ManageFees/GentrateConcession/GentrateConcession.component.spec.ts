import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GentrateConcessionComponent } from './GentrateConcession.component';

describe('GentrateConcessionComponent', () => {
  let component: GentrateConcessionComponent;
  let fixture: ComponentFixture<GentrateConcessionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GentrateConcessionComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GentrateConcessionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
