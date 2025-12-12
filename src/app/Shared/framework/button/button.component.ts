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
import { FormValidationService } from '../../formValidation.service';
import { GlobalService } from 'src/app/Global/Service/global.service';
import { FrameworkService } from '../framework.service';

@Component({
  selector: 'fw-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.css'],
  standalone: false,
})
export class ButtonComponent implements OnInit {
  // #region strings (1)
  public id: string = '';
  public _label: string = '';
  public _buttonclass: string = '';
  public area: string = this.globalService.getArea();
  // #endregion

  // #region booleans (2)
  public _loading: boolean = false;
  public _filtercatch: boolean = false;
  public _disabled: boolean = false;
  public _triggerbutton: boolean = false;
  // #endregion

  // #region apicache (3)
  @Input() apicache: boolean = false;
  // #endregion

  // #region apiResponse (4)
  public _apiResponse: any;
  get apiResponse() {
    return this._apiResponse;
  }
  @Input()
  set apiResponse(value: any) {
    if (this._apiResponse === value) {
      return;
    }
    this._apiResponse = value;
    this.apiResponseChange.emit(this._apiResponse);
  }
  @Output()
  apiResponseChange = new EventEmitter<any>();
  // #endregion

  // #region apiUrl (5)
  @Input() apiUrl: string = '';
  // #endregion

  // #region auth (6)
  @Input() auth: boolean = true;
  // #endregion

  // #region buttontype (7)
  @Input() buttontype: string = 'P';
  // #endregion

  // #region filtercatch (8)
  @Input()
  set filtercatch(value: boolean) {
    this._filtercatch = value;
  }
  // #endregion

  // #region isdisabled (9)
  @Input()
  set isdisabled(value: boolean) {
    this._disabled = value;
  }
  // #endregion

  // #region jsonResponse (10)
  public _jsonResponse: any;
  get jsonResponse() {
    return this._jsonResponse;
  }
  @Input()
  set jsonResponse(value: any) {
    if (this._jsonResponse === value) {
      return;
    }
    this._jsonResponse = value;
    this.jsonResponseChange.emit(this._jsonResponse);
  }
  @Output()
  jsonResponseChange = new EventEmitter<any>();
  // #endregion

  // #region label (11)
  @Input() label: string = '';
  // #endregion

  // #region loading (12)
  @Input()
  set loading(value: boolean) {
    this._loading = value;
    this.updateLabel();
    this._disabled = value;
  }
  // #endregion

  // #region parameter (13)
  @Input() parameter: any;
  // #endregion

  // #region triggerbutton (14)
  get triggerbutton() {
    return this._triggerbutton;
  }
  @Input()
  set triggerbutton(value: any) {
    if (this._triggerbutton === value) {
      return;
    }
    this._triggerbutton = value;

    if (value) {
      setTimeout(() => {
        this.onClick();
      }, 100);

      this._triggerbutton = false; // Reset triggerbutton after click
      this.triggerbuttonChange.emit(this._triggerbutton);
    }
  }
  @Output()
  triggerbuttonChange = new EventEmitter<any>();
  // #endregion

  // #region validationgroup (15)
  @Input() validationgroup: string = 'default';
  // #endregion

  // #region outputdecarators (16)
  @Output()
  apiResponseSuccess = new EventEmitter<any>();
  @Output()
  formvalidationtrue = new EventEmitter<boolean>();
  // #endregion

  @ViewChild('myButton') myButton: ElementRef | undefined;

  constructor(
    private ValidationService: FormValidationService,
    private frameworkService: FrameworkService,
    private globalService: GlobalService,
    private cdr: ChangeDetectorRef,
  ) {}

  ngOnInit() {
    this.id = 'Btn' + this.label.replace(/\s+/g, '');
    this.updateLabel();
    this.setButtonClass();
  }
  ngAfterViewInit(): void {}
  private setButtonClass(): void {
    const buttonClasses: { [key: string]: string } = {
      P: 'btn-primary',
      D: 'btn-danger',
      S: 'btn-success',
    };

    this._buttonclass = buttonClasses[this.buttontype] || '';
  }
  onClick() {
    this._loading = !this._loading;
    this._disabled = this._loading;
    this.updateLabel();
    if (this.ValidationService.formValidation(this.id, this.validationgroup)) {
      if (this._filtercatch) {
        this.frameworkService.SSSV('filter', this.parameter);
      }
      this.callAPI();
    } else {
      setTimeout(() => {
        this._loading = !this._loading;
        this._disabled = this._loading;
        this.updateLabel();
      }, 500);
    }
  }
  updateLabel() {
    this._label = this._loading ? 'Please wait...' : this.label;
    this.cdr.markForCheck();
  }
  callAPI() {
    if (this.apiUrl != '' && this.auth == true) {
      this.frameworkService
        .callSelectAPI(this.apiUrl, this.parameter, this.area, this.apicache)
        .subscribe({
          next: (Response) => {
            this.jsonResponse = Response.data;
            if (Response.data != null) {
              this._apiResponse = Response.data;
              this.apiResponseChange.emit(this._apiResponse);
              this.apiResponseSuccess.emit(true);
            } else if (Response.status == '200') {
              this.apiResponseSuccess.emit(true);
            } else {
            }
            setTimeout(() => {
              this._loading = !this._loading;
              this._disabled = this._loading;
              this.updateLabel();
            }, 500);
          },
          error: (err) => {
            this._loading = false;
            this._disabled = false;
            this.updateLabel();
          },
        });
    } else if (this.apiUrl != '' && this.auth == false) {
      this.frameworkService.callwithNoAuth(this.apiUrl, this.parameter, this.area).subscribe({
        next: (Response) => {
          if (Response.data != null) {
            this._apiResponse = Response.data;
            this.apiResponseChange.emit(this._apiResponse);
            this.apiResponseSuccess.emit(true);
          } else if (Response.status == '200') {
            this.apiResponseSuccess.emit(true);
          }

          setTimeout(() => {
            this._loading = !this._loading;
            this._disabled = this._loading;
            this.updateLabel();
          }, 500);
        },
        error: (err) => {
          this._loading = false;
          this.updateLabel();
        },
      });
    } else {
      setTimeout(() => {
        this._loading = !this._loading;
        this._disabled = this._loading;
        this.updateLabel();
        this.formvalidationtrue.emit(true);
      }, 500);
    }
  }
}
