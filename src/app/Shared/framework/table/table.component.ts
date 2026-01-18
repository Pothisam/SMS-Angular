// #region import
import { LiveAnnouncer } from '@angular/cdk/a11y';
import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
  input,
  signal,
  computed,
} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';
import {
  IColumnDef,
  ITableDelete,
  ITableDownloadFile,
  ITableHistory,
  ITableSettings,
  ITabletoggle,
} from './table.model';
import { GlobalService } from 'src/app/Global/Service/global.service';
import { IModalSettings } from '../model/model';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { FrameworkService } from '../framework.service';
import { IHistoryRecordSettings } from '../historyrecord/historyrecord';
// #endregion
@Component({
  selector: 'fw-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css'],
  standalone: false,
})
export class TableComponent implements OnInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  dataSource = new MatTableDataSource<any[]>();
  datalist: any;
  public _recordDeleteDetails: ITableDelete = new ITableDelete();
  public _recordHistoryDetails: ITableHistory = new ITableHistory();
  public _recordtoggleDetails: ITabletoggle = new ITabletoggle();
  public _recorddownload: ITableDownloadFile = new ITableDownloadFile();
  public _modalSettings: IModalSettings = new IModalSettings();
  public _tableSettings: ITableSettings | undefined;
  public _historyrecordSettings: IHistoryRecordSettings = new IHistoryRecordSettings();
  @Input() apiUrl: string = '';
  @Input()
  set tableSettings(value: ITableSettings | undefined) {
    if (this._tableSettings !== value) {
      this._tableSettings = value;
      this.prepareTable();
      this.tableSettingsChange.emit(this._tableSettings);
    }
  }
  get tableSettings(): ITableSettings | undefined {
    return this._tableSettings;
  }

  @Output() tableSettingsChange = new EventEmitter<ITableSettings | undefined>();

  public _gridEdit: string = '';
  @Input()
  set matEditClick(value: any) {
    if (this._gridEdit === value) {
      return;
    }
    this._gridEdit = value;
    this.matEditClickChange.emit(this._gridEdit);
  }
  get matEditClick() {
    return this._gridEdit;
  }
  @Output() matEditClickChange = new EventEmitter<any>();
  // #region dynamic icon
  public _griddynamic: string = '';
  @Input()
  set matdynamicClick(value: any) {
    if (this._griddynamic === value) {
      return;
    }
    this._griddynamic = value;
    this.matdynamicClickChange.emit(this._griddynamic);
  }
  get matdynamicClick() {
    return this._griddynamic;
  }
  @Output() matdynamicClickChange = new EventEmitter<any>();
  // #endregion
  public _gridDelete: string = '';

  public _gridDeleteColumn: string = '';
  @Input()
  set matDeleteClick(value: any) {
    if (this._gridDelete === value) {
      return;
    }
    this._gridDelete = value;
    this.matDeleteClickChange.emit(this._gridDelete);
  }
  get matDeleteClick() {
    return this._gridDelete;
  }
  @Output() matDeleteClickChange = new EventEmitter<any>();
  @Output() DeleteapiCalled = new EventEmitter<any>();
  @Input() toggleStatus: boolean = false;
  @Output() toggleStatusChange = new EventEmitter<boolean>();
  public _iconclick: string = '';

  @Input()
  set jsonData(v: any[]) {
    if (this._tableSettings) {
      this._tableSettings.jsonData = v;
    }
    this.prepareTable();
  }
  @Input() tableName: string = '';
  tableColums: IColumnDef[] = [];

  public displayedColumns: string[] = [];
  selection = new SelectionModel<any>(true, []);
  selectedItems = signal<any[]>([]);
  area: string = this.globalService.getArea();
  constructor(
    private _liveAnnouncer: LiveAnnouncer,
    private globalService: GlobalService,
    private sanitizer: DomSanitizer,
    private frameworkService: FrameworkService,
  ) {}
  sanitizeHTML(html: string): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(html);
  }
  public _triggerAPI: boolean = false;
  get triggerAPI() {
    return this._triggerAPI;
  }
  @Input()
  set triggerAPI(value: any) {
    if (this._triggerAPI === value) {
      return;
    }
    this._triggerAPI = value;
    this.triggerAPIChange.emit(this._triggerAPI);
    if (value) {
      this.getAPIData();
    }
  }
  @Output()
  triggerAPIChange = new EventEmitter<boolean>();

  // #region parameter
  public _parameter: any;
  get parameter() {
    return this._parameter;
  }
  @Input()
  set parameter(value: any) {
    if (this._parameter === value) {
      return;
    }
    this._parameter = value;
    this.parameterChange.emit(this._parameter);
  }
  @Output()
  parameterChange = new EventEmitter<any>();
  // #endregion
  @Output()
  apiResponseChange = new EventEmitter<any>();
  @Output() selectedItemsChange = new EventEmitter<any[]>();
  ngOnInit() {}
  ngAfterViewInit() {
    this.prepareTable();
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  prepareTable() {
    this.tableColums = this._tableSettings?.columns || [];
    //this.displayedColumns = this._parameter?.apiColumnsName || [];
    this.displayedColumns = this._tableSettings?.columns.map((item) => item.data) ?? [];
    this.datalist = Array.isArray(this._tableSettings?.jsonData)
      ? this._tableSettings.jsonData
      : [];

    this.dataSource = new MatTableDataSource(this.datalist);

    if (this.datalist.length > 0) {
      this.dataSource.paginator = this.paginator;
    }
    if (this.sort) {
      this.dataSource.sort = this.sort;
    }

    if (this._tableSettings?.profileImage == true) {
      let isExists = this.tableColums.find((column) => column.data === 'guid');
      if (!isExists) {
        this.tableColums.unshift({
          title: 'gender',
          data: 'guid',
          width: 10,
        });
      }
    }
    if (this._tableSettings?.slno == true) {
      this.generateSlno(this.datalist);

      let isExists = this.tableColums.find((column) => column.data === 'autoSlno');
      if (!isExists) {
        if (this._tableSettings.shorting == true) {
          this.tableColums.unshift({
            title: 'Slno',
            data: 'autoSlno',
            width: 5,
            short: true,
          });
        } else {
          this.tableColums.unshift({
            title: 'Slno',
            data: 'autoSlno',
            width: 5,
          });
        }
      }
    }

    if (this._tableSettings?.checkbox == true) {
      let isExists = this.tableColums.find((column) => column.data === 'chSelect');
      if (!isExists) {
        this.tableColums.unshift({
          title: 'chSelect',
          data: 'chSelect',
          width: 5,
        });
      }
    }
  }
  isColumnSticky(index: number): boolean {
    return (this._tableSettings?.columnSticky ?? []).includes(index);
  }
  isHeaderSticky(): boolean {
    return this._tableSettings?.headerSticky ?? true;
  }
  isFootertrue(): boolean {
    return this._tableSettings ? this._tableSettings.showFotter : false;
  }
  generateSlno(data: any[]): void {
    if (data && data.length > 0) {
      data.forEach((item, index) => {
        item.autoSlno = index + 1;
      });
    }
  }
  sortData(sort: Sort) {
    if (sort.direction === '') {
      sort.direction = 'asc'; // Default to 'asc' if sort direction is 'none'
    } else if (sort.direction === 'asc') {
      sort.direction = 'desc'; // Change to 'desc' if current direction is 'asc'
    } else if (sort.direction === 'desc') {
      sort.direction = ''; // Change to 'none' if current direction is 'desc'
    }
  }
  Shorting(sortStatus: Sort) {
    if (sortStatus.direction) {
      this._liveAnnouncer.announce('sorted ${sortStatus.direction}ending');
    } else {
      this._liveAnnouncer.announce('sorting cleared');
    }
  }
  //Grid Button Click
  onMatIconEdit(element: any) {
    const actionColumn = this._tableSettings?.columns.find(
      (column) => column.data === 'Mat-Action',
    );
    if (typeof actionColumn?.buttongroup?.[0]?.click === 'function') {
      actionColumn.buttongroup[0].click(element);
    }
    if (
      actionColumn &&
      actionColumn.buttongroup &&
      actionColumn.buttongroup[0] &&
      actionColumn.buttongroup[0].buttondata
    ) {
      this._gridEdit = element[actionColumn.buttongroup[0].buttondata];
    }
    this.matEditClickChange.emit(this._gridEdit);
  }
  onDynamicIconClick(element: any) {
    const actionColumn = this._tableSettings?.columns.find(
      (column) => column.data === 'Mat-Action',
    );
    if (
      actionColumn &&
      actionColumn.buttongroup &&
      actionColumn.buttongroup[0] &&
      actionColumn.buttongroup[0].buttondata
    ) {
      this._griddynamic = element[actionColumn.buttongroup[0].buttondata];
    }
    this.matdynamicClickChange.emit(this._griddynamic);
  }
  public deleteFK: any = {};
  public toggleFK: any = {};
  onMatIconDelete(element: any, event: Event) {
    const targetElement = event.target as HTMLElement;
    const actionColumn = this._tableSettings?.columns.find(
      (column) => column.data === 'Mat-Action',
    ) as any;
    if (
      actionColumn &&
      actionColumn.buttongroup &&
      actionColumn.buttongroup[0] &&
      actionColumn.buttongroup[0].click &&
      actionColumn.buttongroup[0].click.some((x: any) => x.startsWith('delete|'))
    ) {
      const deleteAction = actionColumn.buttongroup[0].click.find((x: any) =>
        x.startsWith('delete|'),
      );
      if (deleteAction) {
        const parts = deleteAction.split('|');
        this._recordDeleteDetails.PK = parts[1] ?? '';
        this._recordDeleteDetails.ColumnName = parts[2] ?? '';
        this._recordDeleteDetails.API = parts[3] ?? '';
        this._recordDeleteDetails.ParameterName = parts[4] ?? '';
        this._recordDeleteDetails.Message = parts[5] ?? '';
        this._recordDeleteDetails.Note = parts[6] ?? '';
        this._recordDeleteDetails.showmodel = parts[7] === 'true';
      }
    }
    if (this._recordDeleteDetails.PK != '' && this._recordDeleteDetails.ColumnName != '') {
      this._gridDelete = element[this._recordDeleteDetails.PK];
      this._gridDeleteColumn = element[this._recordDeleteDetails.ColumnName];
      this._recordDeleteDetails.Message = this._recordDeleteDetails.Message.replace(
        '{{0}}',
        this._gridDeleteColumn,
      );
    }
    if (this._recordDeleteDetails.ParameterName != '') {
      this.deleteFK[this._recordDeleteDetails.ParameterName] = this._gridDelete;
      this.matDeleteClickChange.emit(this._gridDelete);
    }
    if (this._recordDeleteDetails.showmodel) {
      this._modalSettings.isModalVisible = true;
      this._modalSettings.headerMessage = 'Delete Confirmation';
      this._modalSettings.bodyMessage = this._recordDeleteDetails.Message;
      this._modalSettings.note = this._recordDeleteDetails.Note;
      this._modalSettings.parameter = this.deleteFK;
      this._modalSettings.api = this._recordDeleteDetails.API;
      this._modalSettings.targetHTML = targetElement;
      this._modalSettings.modalId = 'delete-conformation';
      this._modalSettings.responseOkAction = (response: any) => {
        this.ondeleteAPIcall(response);
      };
      this.globalService.updateModelDeleteConfirmation(this._modalSettings);
    }
    if (actionColumn && actionColumn.buttongroup && actionColumn.buttongroup[0]) {
      const buttonDataField = actionColumn.buttongroup[0].buttondata;
      if (buttonDataField) {
        this._iconclick = element[buttonDataField];
        this.matDeleteClickChange.emit(element);
      } else {
        console.error('buttondata is undefined in buttongroup');
      }
    }
  }
  ondeleteAPIcall(response: any) {
    this.DeleteapiCalled.emit(response);
  }
  onClicktoggle(element: any, event: Event) {
    const targetElement = event.target as HTMLElement;

    const actionColumn = this._tableSettings?.columns.find(
      (column) => column.data === 'Mat-Action',
    );
    if (actionColumn?.buttongroup?.[0]?.toggle) {
      const targetIsOff = targetElement.classList.contains('fa-toggle-off');
      targetElement.classList.toggle('fa-toggle-off', !targetIsOff);
      targetElement.classList.toggle('text-danger', !targetIsOff);
      targetElement.classList.toggle('fa-toggle-on', targetIsOff);
      targetElement.classList.toggle('text-success', targetIsOff);

      const [pk, api, paramName, , extraParams] =
        actionColumn.buttongroup[0].toggle[0]?.split('|') ?? [];

      this._recordtoggleDetails = {
        PK: pk ?? '',
        API: api ?? '',
        ParameterName: paramName ?? '',
      };
      this.toggleFK[paramName] = element?.[pk];

      if (extraParams) {
        const [paramKey, valueOn, valueOff] = extraParams.split(',');
        this.toggleFK[paramKey] = targetIsOff ? valueOn : valueOff;
      }

      this.CalltoggleAPI();
      setTimeout(() => {
        this.toggleStatusChange.emit(true);
      }, 1000);
    }
  }
  //End Grid Button Click
  // Filter
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  //End Filter
  //CheckBox Control
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  toggleAllRows() {
    if (this.isAllSelected()) {
      this.selection.clear();
      this.selectedItems.set([]);
      this.selectedItemsChange.emit(this.selection.selected);
      return;
    }

    this.selection.select(...this.dataSource.data);
    this.selectedItems.set(this.selection.selected);

    // 🔥 emit to parent
    this.selectedItemsChange.emit(this.selection.selected);
  }
  checkboxLabel(row?: any): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.position + 1}`;
  }

  // Update signal when a row is selected/deselected
  onRowSelectionChange(row: any) {
    this.selection.toggle(row);
    this.selectedItems.set([...this.selection.selected]);
  }

  // Get selected items as a signal
  getSelectedItems() {
    return this.selectedItems;
  }

  getTotalCost(column: any) {
    const type = column.type;
    const total = this.datalist
      .map((t: { [x: string]: any }) => parseFloat(t[column.data]) || 0)
      .reduce((acc: number, value: number) => acc + value, 0);
    if (!type) {
      return total;
    } else if (type.toLowerCase() === 'decimal') {
      return total.toFixed(2);
    }
  }
  shouldShowButton(element: any, button: string, conditions: string[] | undefined): boolean {
    if (!conditions || conditions.length === 0) {
      return true; // If no conditions are provided, always show the button
    }
    let hasbutton = conditions.some((condition) => condition.includes(button));
    if (hasbutton) {
      let condition = conditions.find((cond) => cond.startsWith(button));
      if (condition) {
        let parts = condition.split('|');
        if (parts.length === 3) {
          const [_, column, value] = parts;
          const elementValue = element[column]?.toString(); // Safely access the column value

          if (value.startsWith('!')) {
            // Negation condition
            return elementValue !== value.substring(1);
          } else {
            // Direct match condition
            return elementValue === value;
          }
        }
      }
    } else {
      return true;
    }
    return true;
  }
  ShowCheckbox(element: any): boolean {
    if (this._tableSettings?.checkboxcondition) {
      const { sysId, column, value } = this._tableSettings.checkboxcondition;
      return element[column] === value;
    }
    return true;
  }
  toggleCondition(element: any, button: string, conditions: string[] | undefined): boolean {
    if (!conditions || conditions.length === 0) {
      return true; // If no conditions are provided, always show the button
    }
    return conditions.some((condition) => {
      const [type, columnName, expectedValue] = condition.split('|');
      if (type === button) {
        return element[columnName] === expectedValue;
      }
      return false;
    });
  }
  toggleTooltip() {
    const actionColumn = this._tableSettings?.columns.find(
      (column) => column.data === 'Mat-Action',
    );
    if (
      actionColumn &&
      actionColumn.buttongroup &&
      actionColumn.buttongroup[0] &&
      actionColumn.buttongroup[0].toggle
    ) {
      const parts = actionColumn.buttongroup[0].toggle[0].split('|');
      return parts[3] ?? 'Active / InActive';
    }
    return 'Active / InActive';
  }
  getTooltipContent(element: any): string {
    const entryBy =
      (element.entredBy ?? element.enteredBy)
        ? `Entry By: ${element.entredBy ?? element.enteredBy}`
        : 'Entry By: N/A';

    const entryDate =
      (element.entrydate ?? element.entryDate)
        ? `Entry Date: ${this.globalService.formatDateTime(element.entrydate ?? element.entryDate)}`
        : 'Entry Date: N/A';

    const modifiedBy = element.modifiedBy
      ? `Modified By: ${element.modifiedBy}`
      : 'Modified By: N/A';
    const modifiedDate = element.modifiedDate
      ? `Modified Date: ${this.globalService.formatDateTime(element.modifiedDate)}`
      : 'Modified Date: N/A';
    return `${entryBy}\n${entryDate}\n${modifiedBy}\n${modifiedDate}`;
  }
  CalltoggleAPI() {
    this.frameworkService
      .callSelectAPI(this._recordtoggleDetails.API, this.toggleFK, this.area, false)
      .subscribe({
        next: (Response) => {},
      });
  }
  onMatIconHistory(element: any, event: Event) {
    const targetElement = event.target as HTMLElement;
    const actionColumn = this._tableSettings?.columns.find(
      (column) => column.data === 'Mat-Action',
    ) as any;
    if (
      actionColumn &&
      actionColumn.buttongroup &&
      actionColumn.buttongroup[0] &&
      actionColumn.buttongroup[0].click &&
      actionColumn.buttongroup[0].click.some((x: any) => x.startsWith('history|'))
    ) {
      const historyAction = actionColumn.buttongroup[0].click.find((x: any) =>
        x.startsWith('history|'),
      );
      if (historyAction) {
        const parts = historyAction.split('|');
        // Assign parts of the history action to recordHistoryDetails
        this._recordHistoryDetails.tableName = parts[1] ?? '';
        const PKname = parts[2] ?? '';

        // Check if the PKname exists in the element and assign it to fID
        if (PKname) {
          this._recordHistoryDetails.fID = element[PKname];
        }

        this._recordHistoryDetails.application = parts[3] ?? '';

        // Disable the loading of all records (default behavior)
        this._recordHistoryDetails.loadAllRecord = false;
      }
      this._historyrecordSettings.fID = this._recordHistoryDetails.fID;
      this._historyrecordSettings.tableName = this._recordHistoryDetails.tableName;
      this._historyrecordSettings.application = this._recordHistoryDetails.application;
      this._historyrecordSettings.html = targetElement;
      this.globalService.updateModelHistoryPopup(this._historyrecordSettings);
    }
  }
  onMatIconDownload(element: any, event: Event) {
    const targetElement = event.target as HTMLElement;

    const actionColumn = this._tableSettings?.columns.find(
      (column) => column.data === 'Mat-Action',
    );
    if (
      actionColumn &&
      actionColumn.buttongroup &&
      actionColumn.buttongroup[0] &&
      actionColumn.buttongroup[0].buttondata
    ) {
      this._recorddownload.SysId = element[actionColumn.buttongroup[0].buttondata];
      this.CallDownloadAPI();
    }
  }
  CallDownloadAPI() {
    this.frameworkService
      .calldownloadAPI('/DocumentLibrary/DownloadFile', this._recorddownload, this.area)
      .subscribe({
        next: (Response) => {},
      });
  }
  getRowClass(row: any): string {
    const callback = this._tableSettings?.rowCallback;

    if (callback && callback.columnname && callback.class && callback.value) {
      const cellValue = row[callback.columnname].toLowerCase();
      return cellValue === callback.value.toLowerCase() ? callback.class : '';
    }

    return '';
  }
  getCellClass(element: any, column: any): string {
    if (!Array.isArray(column.conditionalClass) || column.conditionalClass.length === 0) {
      return '';
    }

    for (const condition of column.conditionalClass) {
      const cellValue = element[condition.column];
      let isMatch = false;

      switch (condition.operator) {
        case '>':
          isMatch = cellValue > condition.value;
          break;
        case '<':
          isMatch = cellValue < condition.value;
          break;
        case '=':
          isMatch = cellValue == condition.value;
          break;
        case '!=':
          isMatch = cellValue != condition.value;
          break;
        case '>=':
          isMatch = cellValue >= condition.value;
          break;
        case '<=':
          isMatch = cellValue <= condition.value;
          break;
      }

      if (isMatch) {
        return condition.cssClass; // ✅ Return class of first matching rule
      }
    }

    return ''; // no class if no condition matches
  }
  renderByType(column: any, element: any): string {
    const type = column.type;
    if (!type) {
      return element[column.data] ?? '';
    } else if (type.toLowerCase() === 'date') {
      const value = element[column.data];
      return this.globalService.formatDate(value);
    } else if (type.toLowerCase() === 'decimal') {
      const value = element[column.data];
      return this.globalService.ConverToDecimal(value).toString();
    }
    return element[column.data] ?? '';
  }
  getAPIData() {
    if (this.apiUrl != '') {
      this.frameworkService
        .callSelectAPI(this.apiUrl, this._parameter, this.area, false)
        .subscribe({
          next: (Response) => {
            if (Response.data != null) {
              if (this._tableSettings) {
                this._tableSettings.jsonData = Response.data;
              }
              this.prepareTable();
            } else {
              this._tableSettings!.jsonData = []; // Reset to an empty array if no data
              this.prepareTable();
            }

            Promise.resolve().then(() => {
              this._triggerAPI = false; // Change your value here
              this.triggerAPIChange.emit(this._triggerAPI);
            });
            this.apiResponseChange.emit(Response.data);
          },
        });
    }
  }
  onCheckboxChange(item: any) {
    this.selection.toggle(item);

    this.selectedItems.set(this.selection.selected);

    // 🔥 emit to parent
    this.selectedItemsChange.emit(this.selection.selected);
  }
}
