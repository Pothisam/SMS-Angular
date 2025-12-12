import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { CaseType, FrameworkService } from 'src/app/Shared/framework/framework.service';

@Component({
  selector: 'fw-email',
  templateUrl: './email.component.html',
  styleUrls: ['./email.component.css'],
  standalone: false,
})
export class EmailComponent implements OnInit {
  @ViewChild('input', { static: false }) input: ElementRef | undefined;

  @Input() entity: string = '';
  @Input() label: string = '';
  @Input() validationgroup: string = 'default';
  public _required: boolean = false;
  @Input()
  set isrequired(value: boolean) {
    this._required = value;
    this.UpdateValidation();
  }

  public _showMaxCount: boolean = false;
  @Input()
  set showMaxCount(value: boolean) {
    this._showMaxCount = value;
  }

  public _showClearAll: boolean = false;
  @Input()
  set showClearAll(value: boolean) {
    this._showClearAll = value;
  }

  @Input() min: number | string = 0;
  @Input() maxlength: number | string = 50;
  @Input() setModelvalue: string = '';
  @Input() Case: string = CaseType.N;

  public _disabled: boolean = false;
  @Input()
  set isdisabled(value: boolean) {
    this._disabled = value;
  }

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

  //@Output() getModelValue: EventEmitter<any> = new EventEmitter<any>();

  id: string = '';
  message: string = '';
  outputValue: string = '';

  constructor(
    private cdr: ChangeDetectorRef,
    private frameworkService: FrameworkService,
  ) {}
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
  }
  clearInputValue() {
    this._modelValue = '';
    this.modelValueChange.emit('');
  }
  ngOnInit() {
    this.message = 'Please Enter ' + this.label;
  }
  UpdateValidation(): void {
    this.input?.nativeElement.setAttribute('aria-required', this._required);
  }
  ngAfterViewInit(): void {
    this.id = this.input?.nativeElement.id;
    this.UpdateValidation();
  }
}
