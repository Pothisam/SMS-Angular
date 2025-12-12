import { Component, input, output } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { SelectedColums } from '../list-selector.model';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'fw-grid-selector',
  templateUrl: './grid-selector.component.html',
  styleUrl: './grid-selector.component.css',
  standalone: false,
})
export class GridSelectorComponent {
  // inputs
  columnsInput = input<SelectedColums[]>([]);
  typeInput = input.required<string>();

  //outputs
  columnSelectedEvent = output<SelectedColums>();
  columnRemovedEvent = output<SelectedColums>();

  //variables
  ColumnsDataSource: SelectedColums[] = [];
  filterInput: string = '';
  selectAnimate: string = '';
  removeAnimate: string = '';

  ngOnInit() {
    this.ColumnsDataSource = this.columnsInput();
  }

  ngOnChanges() {
    this.ColumnsDataSource = this.columnsInput();
    if (this.filterInput !== '') this.onInputChangedEvent(this.filterInput);
  }

  clearFilterInput() {
    this.filterInput = '';
    this.ColumnsDataSource = this.columnsInput();
  }

  onInputChangedEvent(input: string) {
    this.ColumnsDataSource =
      input !== ''
        ? this.columnsInput().filter((column) =>
            column.columnText.toLowerCase().includes(input.toLowerCase()),
          )
        : this.columnsInput();
  }

  onColumnSelectedEvent(row: SelectedColums, id: string) {
    if (this.filterInput !== '') this.onInputChangedEvent(this.filterInput);
    document.getElementById(id)?.classList.add('grid-row-s', 'animate__slideOutRight');
    setTimeout(() => {
      this.columnSelectedEvent.emit(row);
    }, 250);
  }

  onColumnRemovedEvent(row: SelectedColums, id: string) {
    if (this.filterInput !== '') this.onInputChangedEvent(this.filterInput);
    document.getElementById(id)?.classList.add('grid-row-r', 'animate__slideOutLeft');
    setTimeout(() => {
      this.columnRemovedEvent.emit(row);
    }, 250);
  }
}
