import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GridSelectorComponent } from './grid-selector.component';

describe('GridSelectorComponent', () => {
  let component: GridSelectorComponent;
  let fixture: ComponentFixture<GridSelectorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GridSelectorComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(GridSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
