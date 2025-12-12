import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { CaseType, FrameworkService } from '../framework.service';
import { GlobalService } from 'src/app/Global/Service/global.service';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';

@Component({
  selector: 'fw-autocomplete',
  templateUrl: './autocomplete.component.html',
  styleUrls: ['./autocomplete.component.css'],
  standalone: false,
})
export class AutocompleteComponent implements OnInit {
  @ViewChild('input', { static: false }) input: ElementRef | undefined;
  public arrayDate: { value: string; text: string }[] = [];
  public filter: { value: string; text: string }[] = [];
  @Input() apiUrl: string = '';
  message: string = '';
  minimumlength: number = 3;
  // outputValue: string = '';
  id: string = '';
  @Input() entity: string = '';
  @Input() label: string = '';
  @Input() Case: string = CaseType.N;
  @Input() validationgroup: string = 'default';
  @Input() maxlength: number | string = 50;
  @Input() min: number | string = 0;
  // @Input() setModelvalue: string = '';

  public _required: boolean = false;
  @Input()
  set isrequired(value: boolean) {
    this._required = value;
    this.UpdateValidation();
  }

  public _disabled: boolean = false;
  @Input()
  set isdisabled(value: boolean) {
    this._disabled = value;
  }

  // #region modelvalue
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
  }
  @Output()
  modelValueChange = new EventEmitter<any>();
  // #endregion

  // #region SelectedOptionValue
  public _selectedOptionValue: string = '';
  @Input()
  get selectedOptionValue() {
    return this._selectedOptionValue;
  }
  set selectedOptionValue(value: any) {
    if (this._selectedOptionValue === value) {
      return;
    }
    this._selectedOptionValue = value;
    this.selectedOptionValueChange.emit(this._selectedOptionValue);
  }
  @Output()
  selectedOptionValueChange = new EventEmitter<any>();
  // #endregion

  commaSeparatedarray: string[] = [];
  @Input()
  set commaSeparatedString(value: string) {
    if (value != '' && this.apiUrl == '') {
      this.commaSeparatedarray = value.split(',');
    }
    this.commaSeparatedarray.forEach((value) => {
      if (value.includes('|')) {
        let parts = value.split('|');
        this.filter.push({ value: parts[0], text: parts[1] });
      } else {
        this.filter.push({ value: value, text: value });
      }
    });
  }

  apiValueAndname: string[] = [];
  @Input()
  set valueAndname(value: string) {
    if (value != '') this.apiValueAndname = value.split(',');
  }

  @Input()
  set jsonData(jsondata: any[]) {
    if (this.apiValueAndname.length > 0) {
      this.filter = jsondata.map((item: any) => {
        return {
          value: item[this.apiValueAndname[0]],
          text: item[this.apiValueAndname[1]],
        };
      });
    } else {
      if (jsondata.length > 0) {
        console.warn('Input Parameter valueAndname is empty');
      }
    }
  }
  public _showClearAll: boolean = false;
  @Input()
  set showClearAll(value: boolean) {
    this._showClearAll = value;
  }

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
  @Input() apicache: boolean = false;
  constructor(
    private frameworkService: FrameworkService,
    private globalService: GlobalService,
  ) {}
  area: string = this.globalService.getArea();
  ngOnInit() {
    this.message = 'Please Select ' + this.label;
  }
  // ngOnChanges(changes: SimpleChanges): void {
  //   if (changes['parameter']) {
  //     // Handle parameter value change here
  //     console.log('Parameter value changed:', this._parameter);
  //   }
  // }
  onInputChange(event: any) {
    this._modelValue = event.target.value;
    if (this.Case == 'U') {
      this._modelValue = event.target.value.toUpperCase();
    }
    if (this.Case == 'L') {
      this._modelValue = event.target.value.toLowerCase();
    }
    if (this.Case == 'T') {
      this._modelValue = this.frameworkService.toTitleCase(event.target.value);
    }
    this.modelValueChange.emit(this._modelValue);
    this._parameter = { ...this._parameter, searchParam: this._modelValue };
    this.parameterChange.emit(this._parameter);
    if (this._modelValue.length >= this.minimumlength && this.apiUrl != '') {
      this.getAPIData();
    }
    if (this.filter.length > 0 && this.apiUrl == '') {
      this.arrayDate = this.filter.filter(
        (o) =>
          o.text.toLowerCase().includes(event.target.value.toLowerCase()) ||
          o.value.toLowerCase().includes(event.target.value.toLowerCase()),
      );
    }
  }
  onSelectChange(event: MatAutocompleteSelectedEvent) {
    this._modelValue = event.option.viewValue;
    this.modelValueChange.emit(this._modelValue);
    this._selectedOptionValue = event.option.value;
    this.selectedOptionValueChange.emit(this._selectedOptionValue);
  }

  clearInputValue() {
    this._modelValue = '';
    this.modelValueChange.emit(this._modelValue);
    this._selectedOptionValue = '';
    this.selectedOptionValueChange.emit(this._selectedOptionValue);
  }

  getAPIData() {
    if (this.apiUrl != '' && this.valueAndname != '') {
      this.frameworkService
        .callSelectAPI(this.apiUrl, this._parameter, this.area, this.apicache)
        .subscribe({
          next: (Response) => {
            if (Response.data != null) {
              this.arrayDate = Response.data.map((item: any) => {
                return {
                  value: item[this.apiValueAndname[0]],
                  text: item[this.apiValueAndname[1]],
                };
              });
            }
          },
        });
    } else if (this.apiUrl != '' && this.valueAndname == '') {
      console.warn('Input Parameter valueAndname is empty');
    }
  }
  UpdateValidation(): void {
    this.input?.nativeElement.setAttribute('aria-required', this._required);
  }
  ngAfterViewInit(): void {
    this.id = this.input?.nativeElement.id;
    this.UpdateValidation();
  }
}
