import { Component, EventEmitter, Input, OnInit, Output, NgModule } from '@angular/core';
import { Router } from '@angular/router';
import { IMenuItem } from './accordion.model';
@Component({
  selector: 'fw-accordion',
  templateUrl: './accordion.component.html',
  styleUrls: ['./accordion.component.css'],
  standalone: false,
})
export class AccordionComponent implements OnInit {
  public _MenuItem: IMenuItem[] = [];
  @Input()
  set menuItems(value: IMenuItem[] | undefined) {
    if (this._MenuItem !== value) {
      this._MenuItem = value || [];
      this.menuItemChange.emit(this._MenuItem);
    }
  }

  get menuItems(): IMenuItem[] {
    return this._MenuItem;
  }

  @Output() menuItemChange = new EventEmitter<IMenuItem[]>();
  constructor(private router: Router) {}

  ngOnInit() {}
  handleKeydown(event: KeyboardEvent, link?: string): void {
    // Check if the 'Enter' key was pressed
    if (event.key === 'Enter') {
      // Use the Router to navigate to the link
      this.router.navigate([link]);
    }
  }
}
