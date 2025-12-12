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
@Component({
  selector: 'fw-password',
  templateUrl: './password.component.html',
  styleUrls: ['./password.component.css'],
  standalone: false,
})
export class PasswordComponent implements OnInit {
  @ViewChild('input', { static: false }) input: ElementRef | undefined;

  @Input() entity: string = '';
  @Input() label: string = '';
  @Input() validationgroup: string = 'default';
  public _required: boolean = true;

  public _showMaxCount: boolean = false;
  @Input()
  set showMaxCount(value: boolean) {
    this._showMaxCount = value;
  }

  @Input() min: number | string = 0;
  @Input() maxlength: number | string = 50;

  id: string = '';
  message: string = '';
  //outputValue: string = '';
  hide: boolean = true;
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
  constructor() {}

  ngOnInit() {
    this.message = 'Please Enter ' + this.label;
  }
  onInputChange(event: any) {
    this._modelValue = event.target.value;
    this.modelValueChange.emit(this._modelValue);
  }
  UpdateValidation(): void {
    this.input?.nativeElement.setAttribute('aria-required', this._required);
  }
  ngAfterViewInit(): void {
    this.id = this.input?.nativeElement.id;
    this.UpdateValidation();
  }
}
