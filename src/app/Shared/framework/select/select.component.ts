import {
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
  input,
  AfterViewInit,
} from '@angular/core';
import { GlobalService } from 'src/app/Global/Service/global.service';
import { MatSelect } from '@angular/material/select';
import { FrameworkService } from '../framework.service';

@Component({
  selector: 'fw-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.css'],
  standalone: false,
})
export class SelectComponent implements OnInit {
  @ViewChild(MatSelect, { static: false }) matSelect: MatSelect | undefined;

  // #region strings (1)
  id: string = '';
  selectedText: string = '';
  message: string = '';
  area: string = this.globalService.getArea();
  // #endregion

  // #region arrays (2)
  public arrayDate: { value: string; text: string }[] = [];
  selectedTextArray: string[] = [];
  // #endregion

  // #region apiUrl (3)
  @Input() apiUrl: string = '';
  // #endregion

  // #region apicache (4)
  @Input() apicache: boolean = false;
  // #endregion

  // #region commaSeparatedString (5)
  commaSeparatedarray: string[] = [];
  @Input()
  set commaSeparatedString(value: string) {
    if (value != '' && this.apiUrl == '') {
      this.commaSeparatedarray = value.split(',');
    }
    this.arrayDate = [];
    this.commaSeparatedarray.forEach((value) => {
      if (value.includes('|')) {
        let parts = value.split('|');
        this.arrayDate.push({ value: String(parts[0].trim()), text: parts[1].trim() });
      } else {
        this.arrayDate.push({ value: String(value.trim()), text: value.trim() });
      }
    });
  }
  // #endregion

  // #region dataArray (6)
  @Input()
  set dataArray(value: { text: string; value: string }[]) {
    this.arrayDate = value;
  }
  // #endregion

  // #region dataAttribute (7)
  @Input() dataAttribute: string = '';
  // #endregion

  // #region entity (8)
  @Input() entity: string = '';
  // #endregion

  // #region isFirstOptionEmpty (9)
  public _isFirstOptionEmpty: boolean = true;
  @Input()
  set isFirstOptionEmpty(value: boolean) {
    this._isFirstOptionEmpty = value;
  }
  // #endregion

  // #region isMultiSelect (10)
  public _Multiple: boolean = false;
  @Input()
  set isMultiSelect(value: boolean) {
    this._Multiple = value;
  }
  // #endregion

  // #region isSelectChange (11)
  @Input() isSelectChange: boolean = false;
  @Output() isSelectChangeChange = new EventEmitter<boolean>();
  // #endregion

  // #region isdisabled (12)
  public _disabled: boolean = false;
  @Input()
  set isdisabled(value: boolean) {
    this._disabled = value;
  }
  // #endregion

  // #region isrequired (13)
  public _required: boolean = false;
  @Input()
  set isrequired(value: boolean) {
    this._required = value;
  }
  // #endregion

  // #region jsonData (14)
  @Input()
  set jsonData(jsondata: any[]) {
    if (this.apiValueAndname.length > 0) {
      this.arrayDate = jsondata.map((item: any) => {
        return {
          value: item[this.apiValueAndname[0]].toString().trim(),
          text: item[this.apiValueAndname[1]].toString().trim(),
        };
      });
    } else {
      if (jsondata.length > 0) {
        console.warn('Input Parameter valueAndname is empty');
      }
    }
  }
  // #endregion

  // #region label (15)
  @Input() label: string = '';
  // #endregion

  // #region modelNotSelected (16)
  public _modelNotSelectedValue: string = '';
  @Input()
  get modelNotSelected() {
    return this._modelNotSelectedValue;
  }
  set modelNotSelected(value: any) {
    if (this._modelNotSelectedValue === value) {
      return;
    }
    this._modelNotSelectedValue = typeof value === 'string' ? value.trim() : value;
    this.modelNotSelectedChange.emit(this._modelNotSelectedValue);
  }
  @Output()
  modelNotSelectedChange = new EventEmitter<any>();
  // #endregion

  // #region modelText (17)
  public _modelText: string = '';
  @Input()
  get modelText() {
    return this._modelText;
  }
  set modelText(value: any) {
    if (this._modelText === value) {
      return;
    }
    this._modelText = typeof value === 'string' ? value.trim() : value;
    if (this._modelValue === '') {
      this.CheckSelectedText();
      this._modelValue =
        this.arrayDate.find((option) => option.text === this._modelText)?.value || '';
      //this.selectedText = this._modelText;
    }
  }
  @Output()
  modelTextChange = new EventEmitter<any>();
  // #endregion

  // #region modelValue (18)
  public _modelValue: string = '';
  public _modelValueArray: string[] = [];
  @Input()
  get modelValue() {
    return this._modelValue;
  }
  set modelValue(value: any) {
    if (this._modelValue === value) {
      return;
    }
    this._modelValue = typeof value === 'string' ? value.trim() : String(value);
    if (!this._Multiple) {
      this.modelValueChange.emit(this._modelValue);
      this.selectedText =
        this.arrayDate.find((option) => option.value === this._modelValue)?.text || '';
      this.modelTextChange.emit(this.selectedText);
    } else {
      this._modelValueArray = this._modelValue.split(',').map((val: string) => val.trim());
      this.CheckSelectedValue();
      this.modelValueChange.emit(this._modelValue);
    }
  }
  @Output()
  modelValueChange = new EventEmitter<any>();
  // move CheckSelectedValue and helper here because it's invoked from modelValue setter
  async CheckSelectedValue(): Promise<void> {
    await this.waitForArrayDate();
    let selectedTexts = this._modelValueArray.map(
      (value) => this.arrayDate.find((option) => option.value === value)?.text || '',
    );
    this.selectedTextArray = selectedTexts;
    // Convert selectedTexts to a set for faster lookup
    let selectedTextsSet = new Set(selectedTexts);

    // Get not selected items
    let notSelectedTexts = this.arrayDate
      .filter((option) => !selectedTextsSet.has(option.text)) // Filter out selected texts
      .map((option) => option.text) // Get the text of unselected items
      .join(','); // Convert to comma-separated string
    this.modelNotSelectedChange.emit(notSelectedTexts);
  }
  // #endregion

  // #region parameter (19)
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

  // #region triggerAPI (20)
  apiValueAndname: string[] = [];
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
  triggerAPIChange = new EventEmitter<any>();

  // #endregion

  // #region triggerAPIOnload (21)
  public _TriggerAPIOnload: boolean = false;
  @Input()
  set triggerAPIOnload(value: boolean) {
    this._TriggerAPIOnload = value;
  }
  // #endregion

  // #region validationgroup (22)
  @Input() validationgroup: string = 'default';
  // #endregion

  // #region valueAndname (23)
  @Input()
  set valueAndname(value: string) {
    if (value != '') this.apiValueAndname = value.split(',');
  }
  // #endregion

  @Output() onSelectChange = new EventEmitter<{
    value: string;
    text: string;
  }>();
  @Output() apiResponseChange = new EventEmitter<any>();

  constructor(
    private frameworkService: FrameworkService,
    private globalService: GlobalService,
    private cdr: ChangeDetectorRef,
  ) {}

  ngOnInit() {
    this.message = 'Please Select ' + this.label;
    if (this.valueAndname != '' && this.apiUrl != '') {
      //this.apiValueAndname = this.valueAndname.split(',');
    }
  }
  onSelectoptionChange(value: string) {
    if (!this._Multiple) {
      this._modelValue = value ?? '';
      this.modelValueChange.emit(this._modelValue);
      this.selectedText =
        this.arrayDate.find((option) => option.value.trim() === this._modelValue)?.text || '';
      this.modelTextChange.emit(this.selectedText);
      this.onSelectChange.emit({
        value: this._modelValue || '',
        text: this.selectedText,
      });
      this.isSelectChangeChange.emit(true);
    } else {
      this._modelValue = (value as unknown as string[]).join(',');
      let selectedTexts = (value as unknown as string[]).map(
        (value) => this.arrayDate.find((option) => option.value === value)?.text || '',
      );
      this.selectedTextArray = selectedTexts;
      this.selectedText = selectedTexts.join(',');
      this.onSelectChange.emit({
        value: this._modelValue,
        text: this.selectedText,
      });
      this.isSelectChangeChange.emit(true);
      this.modelTextChange.emit(this.selectedText);
      this.modelValueChange.emit(this._modelValue);
      this._modelValueArray = this.selectedText.split(',').map((val: string) => val.trim());
      this.CheckSelectedValue();
      this.cdr.detectChanges();
    }
  }

  UpdateValidation(): void {
    this.matSelect?._elementRef.nativeElement.setAttribute('aria-required', this._required);
  }

  ngAfterViewInit(): void {
    this.id = this.matSelect?.id!;
    this.UpdateValidation();
    if (this._TriggerAPIOnload) {
      this.getAPIData();
    }
    this.cdr.detectChanges();
    if (!this._isFirstOptionEmpty && !this._Multiple && this.arrayDate.length > 0) {
      this.selectedText = this.arrayDate[0]?.text || '';
      this._modelValue = this.arrayDate[0]?.value || '';

      this.modelValueChange.emit(this._modelValue);
    }
  }
  async CheckSelectedText(): Promise<void> {
    await this.waitForArrayDate();
  }
  async waitForArrayDate(): Promise<void> {
    while (this.arrayDate.length === 0) {
      await new Promise((resolve) => setTimeout(resolve, 100)); // wait for 100ms
    }
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
                  value: item[this.apiValueAndname[0]].toString().trim(),
                  text: item[this.apiValueAndname[1]].toString().trim(),
                };
              });
              if (this._modelValue != '' && !this.isMultiSelect) {
                this.selectedText =
                  this.arrayDate.find((option) => option.value === this._modelValue)?.text || '';
                this.modelTextChange.emit(this.selectedText);
              }
              if (this._modelValue == '' && this._modelText != '' && !this.isMultiSelect) {
                this._modelValue =
                  this.arrayDate.find((option) => option.text === this._modelText)?.value || '';
                this.modelValueChange.emit(this._modelValue);
                this.selectedText = this._modelText;
                this.isSelectChangeChange.emit(true);
              }
              if (!this._isFirstOptionEmpty && !this._Multiple && this.arrayDate.length > 0) {
                this.selectedText = this.arrayDate[0]?.text.toString() || '';
                this._modelValue = this.arrayDate[0]?.value.toString() || '';

                this.modelValueChange.emit(this._modelValue);
                this.isSelectChangeChange.emit(true);
              }
              //if(this._modelValue != '' &&)
            } else {
              this.arrayDate = [];
              this.selectedText = '';
              this._modelValue = '';
              this.modelTextChange.emit('');
              this.modelValueChange.emit('');
            }
            Promise.resolve().then(() => {
              this._triggerAPI = false; // Change your value here
              this.triggerAPIChange.emit(this._triggerAPI);
            });
            this.apiResponseChange.emit(Response.data);
          },
        });
    } else if (this.apiUrl != '' && this.valueAndname == '') {
      console.warn('Input Parameter valueAndname is empty');
    }
    this.cdr.detectChanges();
  }
}
