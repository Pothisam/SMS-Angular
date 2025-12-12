import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  input,
  Output,
  output,
} from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { SelectedColums } from './list-selector.model';
import { GridSelectorComponent } from './grid-selector/grid-selector.component';
import { FrameworkService } from '../framework.service';
import { GlobalService } from 'src/app/Global/Service/global.service';

@Component({
  selector: 'fw-list-selector',
  templateUrl: './list-selector.component.html',
  styleUrl: './list-selector.component.css',
  standalone: false,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListSelectorComponent {
  //#region Inputs
  // ColumnsInput = input<string[]>([]);
  // isRequired = input<boolean>(false);
  triggerAPIOnLoad = input<boolean>(false);
  isDisabled = input<boolean>(false);
  apicache = input<boolean>(false);
  apiUrl = input<string>('');
  entity = input<string>('');
  label = input<string>('');
  dataAttribute = input<string>('');
  validationgroup = input<string>('default');
  ColumnString = input<string>('');
  //#endregion

  //#region outputs
  SelectedColumnsEvent = output<string[]>();

  @Output()
  triggerAPIChange = new EventEmitter<any>();
  //#endregion

  //#region Variables
  Columns: SelectedColums[] = [];

  selectedColumns: SelectedColums[] = [];

  gridType = { list: 'list', selected: 'selected' };
  message: string = '';
  area: string = this.globalService.getArea();
  //#endregion

  private _parameter: any;
  get parameter() {
    return this._parameter;
  }
  @Input() set parameter(value: any) {
    if (this._parameter === value) return;
    this._parameter = value;
    this.parameterChange.emit(this._parameter);
  }
  @Output() parameterChange = new EventEmitter<any>();

  constructor(private frameworkService: FrameworkService, private globalService: GlobalService) {}

  ngOnInit() {
    // Build, sort ascending by columnText, then assign sequential indices
    this.Columns = this.ColumnString()
      .split(',')
      .filter((c: string) => c.trim().length)
      .map((column: string) => {
        const part = column.split('|');
        return new SelectedColums(part[0], part[1], 0);
      })
      .sort((a: SelectedColums, b: SelectedColums) => a.columnText.localeCompare(b.columnText))
      .map((c: SelectedColums, i: number) => {
        c.index = i;
        return c;
      });
  }

  //#region Com.Events
  onSelectedColumnsEvent(selectedColumns: SelectedColums) {
    selectedColumns.isSelected = true;
    this.selectedColumns.push(selectedColumns);
    this.Columns.map((c) =>
      c.columnText === selectedColumns.columnText ? (c.isSelected = true) : c,
    );
    this.Columns = this.Columns.filter((c) => !c.isSelected);
    this.SelectedColumnsEvent.emit(this.selectedColumns.map((c) => c.columnValue));
  }

  onRemovedColumnsEvent(selectedColumns: SelectedColums) {
    selectedColumns.isSelected = false;
    this.Columns.push(selectedColumns);
    this.selectedColumns = this.selectedColumns.filter(
      (c: SelectedColums) => c.columnText !== selectedColumns.columnText,
    );
    this.Columns.sort((a, b) => a.index - b.index);
    this.SelectedColumnsEvent.emit(this.selectedColumns.map((c) => c.columnValue));
  }
  //#endregion
}
