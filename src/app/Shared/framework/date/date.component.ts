// #region import
import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
  ChangeDetectionStrategy,
} from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { MAT_DATE_FORMATS, DateAdapter, MAT_DATE_LOCALE } from '@angular/material/core';
import { MatDatepicker } from '@angular/material/datepicker';
import moment, { Moment } from 'moment';
import { FrameworkService } from '../framework.service';
import { GlobalService } from 'src/app/Global/Service/global.service';
import { lastValueFrom } from 'rxjs';
// #endregion

// #region date format
export const Type_Date = {
  parse: {
    dateInput: 'LL',
  },
  display: {
    dateInput: 'DD/MM/YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};
export const Type_Month = {
  parse: {
    dateInput: 'MM/YYYY',
  },
  display: {
    dateInput: 'MM/YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};
// #endregion
@Component({
  selector: 'fw-date',
  templateUrl: './date.component.html',
  styleUrls: ['./date.component.css'],
  providers: [
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE],
    },
    {
      provide: MAT_DATE_FORMATS,
      useFactory: (component: DateComponent) =>
        component.type === 'date' ? Type_Date : Type_Month,
      deps: [DateComponent],
    },
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false,
})
export class DateComponent implements OnInit {
  // #region strings (1)
  area: string = this.globalService.getArea();
  id: string = '';
  message: string = '';
  outputValue: string = '';
  // #endregion

  // #region numbers (2)
  currentdate: Date = new Date();
  // #endregion

  // #region booleans (3)
  public _required: boolean = false;
  public _isrange: boolean = false;
  public _disabled: boolean = false;
  public _showClearAll: boolean = false;
  public _triggerdaydiff: boolean = false;
  // #endregion

  // #region lists (4)
  readonly campaignOne = new FormGroup({
    start: new FormControl<Date | null>(null),
    end: new FormControl<Date | null>(null),
  });
  // #endregion

  // #region inputdecarators (5)
  @Input() entity: string = '';
  @Input() inputdisabled: boolean = true;
  @Input() label: string = 'date';
  @Input() pickerdisabled: boolean = false;
  @Input() placeholder: string = '';
  @Input() showhint: boolean = false;
  @Input() type: string = 'date';
  @Input() validationgroup: string = 'default';
  // #endregion

  // #region outputdecarators (6)
  // (none)
  // #endregion

  // #region daydiff (7)
  public _daydiff: string = '';
  @Input()
  get daydiff() {
    return this._daydiff;
  }
  set daydiff(value: any) {
    if (this._daydiff === value) {
      return;
    }
    this._daydiff = value;
    this.daydiffChange.emit(this._daydiff);
  }
  @Output()
  daydiffChange = new EventEmitter<any>();
  // #endregion

  // #region endValue (8)
  public _end: string = '';
  @Input()
  get endValue() {
    return this._end;
  }
  set endValue(value: any) {
    if (this._end === value) {
      return;
    }
    this._end = value;
    if (this._end == '') {
      this.campaignOne.get('end')?.setValue(null);
    }
    this.endValueChange.emit(this._end);
    this.GetDaydiff();
  }
  @Output()
  endValueChange = new EventEmitter<any>();
  // #endregion

  // #region isSelectChange (9)
  @Input() isSelectChange: boolean = false;
  @Output() isSelectChangeChange = new EventEmitter<boolean>();
  // #endregion

  // #region isdisabled (10)
  @Input()
  set isdisabled(value: boolean) {
    this._disabled = value;
  }
  // #endregion

  // #region isrange (11)
  @Input()
  set isrange(value: boolean) {
    this._isrange = value;
  }
  // #endregion

  // #region isrequired (12)
  @Input()
  set isrequired(value: boolean) {
    this._required = value;
    this.UpdateValidation();
  }
  // #endregion

  // #region max (13)
  public _max: number | string | Date = new Date(3050, 11, 31);
  @Input()
  set max(value: any) {
    const currentDate = new Date(this.currentdate); // Use the fetched currentdate
    let parsedValue: number | undefined;
    let unit: string = 'd'; // Default to days

    if (value instanceof Date) {
      // If the value is already a Date, assign it directly
      this._max = value;
      return;
    } else if (typeof value === 'string') {
      // Check if the string is a valid date
      const parsedDate = new Date(value);
      if (!isNaN(parsedDate.getTime())) {
        this._max = parsedDate; // If the string is a valid date, assign it directly
        return;
      }

      // Handle numeric|unit format (e.g., "10|d", "5|m")
      const [numberPart, unitPart] = value.split('|').map((v) => v.trim());
      parsedValue = parseInt(numberPart, 10);
      unit = unitPart || 'd';
    } else {
      this._max = currentDate; // Fallback for unsupported types
      return;
    }

    // Adjust max based on the unit and parsed value
    if (parsedValue !== undefined) {
      const adjustment = parsedValue < 0 ? -Math.abs(parsedValue) : Math.abs(parsedValue);

      switch (unit) {
        case 'd': // Days
          this._max = new Date(currentDate.setDate(currentDate.getDate() + adjustment));
          break;
        case 'm': // Months
          this._max = new Date(currentDate.setMonth(currentDate.getMonth() + adjustment));
          break;
        case 'y': // Years
          this._max = new Date(currentDate.setFullYear(currentDate.getFullYear() + adjustment));
          break;
        default:
          this._max = currentDate; // Fallback for unsupported units
          break;
      }
    } else {
      this._max = currentDate; // Default to current date if parsedValue is undefined
    }
  }
  // #endregion

  // #region min (14)
  public _min: number | string | Date = new Date(1900, 0, 1);
  @Input()
  set min(value: any) {
    const currentDate = new Date(this.currentdate);
    let parsedValue: number | undefined;
    let unit: string = 'd'; // Default to days

    if (value instanceof Date) {
      this._min = value;
      return;
    } else if (typeof value === 'string') {
      const parsedDate = new Date(value);
      if (!isNaN(parsedDate.getTime())) {
        this._min = parsedDate;
        return;
      }

      const [numberPart, unitPart] = value.split('|').map((v) => v.trim());
      parsedValue = parseInt(numberPart, 10);
      unit = unitPart || 'd';
    } else {
      this._min = currentDate;
      return;
    }

    if (parsedValue !== undefined) {
      const adjustment = parsedValue < 0 ? -Math.abs(parsedValue) : Math.abs(parsedValue);

      switch (unit) {
        case 'd':
          this._min = new Date(currentDate.setDate(currentDate.getDate() + adjustment));
          break;
        case 'm':
          this._min = new Date(currentDate.setMonth(currentDate.getMonth() + adjustment));
          break;
        case 'y':
          this._min = new Date(currentDate.setFullYear(currentDate.getFullYear() + adjustment));
          break;
        default:
          this._min = currentDate;
          break;
      }
    } else {
      this._min = currentDate;
    }
  }
  // #endregion

  // #region modelValue (15)
  public _modelValue: string = '';
  @Input()
  get modelValue() {
    return this._modelValue;
  }
  set modelValue(value: any) {
    if (this._modelValue === value) {
      return;
    }
    this._modelValue = value;
    this.modelValueChange.emit(this._modelValue);
    this.isSelectChangeChange.emit(true);
  }
  @Output()
  modelValueChange = new EventEmitter<any>();
  // #endregion

  // #region showClearAll (16)
  @Input()
  set showClearAll(value: boolean) {
    this._showClearAll = value;
  }
  // #endregion

  // #region startValue (17)
  public _start: string = '';
  @Input()
  get startValue() {
    return this._start;
  }
  set startValue(value: any) {
    if (this._start === value) {
      return;
    }
    this._start = value;
    if (this._start == '') {
      this.campaignOne.get('start')?.setValue(null);
    }
    this.startValueChange.emit(this._start);
  }
  @Output()
  startValueChange = new EventEmitter<any>();
  // #endregion

  // #region triggerdaydiff (18)
  get triggerdaydiff() {
    return this._triggerdaydiff;
  }
  @Input()
  set triggerdaydiff(value: any) {
    if (this._triggerdaydiff === value) {
      return;
    }
    this._triggerdaydiff = value;
    this.triggerdaydiffChange.emit(this._triggerdaydiff);
    if (value) {
      if (this._isrange) {
        this.GetDaydiff();
        this.triggerdaydiffChange.emit(false);
      } else {
        this.GetAge();
        this.triggerdaydiffChange.emit(false);
      }
    }
  }
  @Output()
  triggerdaydiffChange = new EventEmitter<any>();
  // #endregion

  formControl: any;
  readonly date = new FormControl(moment());
  @ViewChild('input', { static: false }) input: ElementRef | undefined;

  constructor(private frameworkService: FrameworkService, private globalService: GlobalService) {}

  onInputChange(event: any) {
    this._modelValue = event.target.value;
    this.modelValueChange.emit(this._modelValue);
    this.isSelectChangeChange.emit(true);
  }

  ngOnInit() {
    this.message = 'Please Enter ' + this.label;
  }

  clearInputValue() {
    this._modelValue = '';
    this.modelValueChange.emit('');
  }

  UpdateValidation(): void {
    this.input?.nativeElement.setAttribute('aria-required', this._required);
  }

  setMonthAndYear(normalizedMonthAndYear: Moment, datepicker: MatDatepicker<Moment>) {
    const ctrlValue = this.date.value ?? moment();
    ctrlValue.month(normalizedMonthAndYear.month());
    ctrlValue.year(normalizedMonthAndYear.year());
    this.date.setValue(ctrlValue);
    const formattedMonth = (normalizedMonthAndYear.month() + 1).toString().padStart(2, '0'); // +1 because Moment.js months are 0-based
    const formattedYear = normalizedMonthAndYear.year();

    this._modelValue = `${formattedYear}-${formattedMonth}`;
    this.modelValueChange.emit(this._modelValue);

    if (this.type === 'month') {
      // Close the datepicker after selecting a month
      datepicker.close();
    }
  }

  async onDateSelect(event: any): Promise<void> {
    await this.getCurrentDate();
    const selectedDate: Date = event.value instanceof Date ? event.value : new Date(event.value);

    if (!isNaN(selectedDate.getTime())) {
      const formattedDate = this.formatDate(selectedDate);
      this._modelValue = formattedDate;
      this.modelValueChange.emit(this._modelValue);
      this.isSelectChangeChange.emit(true);
    } else {
      console.error('Invalid date selected');
    }

    this.GetAge();
  }

  async GetAge() {
    this._daydiff = this.frameworkService.dayDiff(this._modelValue, this.currentdate) || '';
    this.daydiffChange.emit(this._daydiff);
  }

  onStartDateSelect(event: any): void {
    const selectedDate: Date = event.value instanceof Date ? event.value : new Date(event.value);

    if (!isNaN(selectedDate.getTime())) {
      const formattedDate = this.formatDate(selectedDate);
      this._start = formattedDate;
      this.startValueChange.emit(this._start);
    } else {
      console.error('Invalid date selected');
    }
  }

  onEndDateSelect(event: any): void {
    const selectedDate: Date = event.value instanceof Date ? event.value : new Date(event.value);
    if (event.value != null) {
      if (!isNaN(selectedDate.getTime())) {
        const formattedDate = this.formatDate(selectedDate);
        this._end = formattedDate;
        this.endValueChange.emit(this._end);
      } else {
        console.error('Invalid date selected');
      }
      this.GetDaydiff();
    }
  }

  GetDaydiff() {
    this._daydiff = this.frameworkService.dayDiff(this._start, this._end) || '';
    this.daydiffChange.emit(this._daydiff);
  }

  onMonthSelected(event: Moment): void {
    const selectedMonth = event.format('MM/YYYY');
    console.log(`Month selected: ${selectedMonth}`);
    this._modelValue = selectedMonth;
    this.modelValueChange.emit(this._modelValue);
    this.isSelectChangeChange.emit(true);
  }

  private formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  ngAfterViewInit(): void {
    this.id = this.input?.nativeElement.id;
    this.UpdateValidation();
  }

  async getCurrentDate(): Promise<void> {
    const response = await lastValueFrom(
      this.frameworkService.callSelectAPI('/Common/GetDate', '', this.area, true),
    );

    if (response.data != null) {
      const selectedDate: Date =
        response.data instanceof Date ? response.data : new Date(response.data);
      const formattedDate = this.formatDate(selectedDate);
      this.currentdate = new Date(formattedDate);
    }
  }
}
