import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  Renderer2,
  RendererFactory2,
} from '@angular/core';
import { GlobalService } from 'src/app/Global/Service/global.service';
import { FrameworkService } from '../framework.service';
import { FormValidationService } from '../../formValidation.service';

@Component({
  selector: 'fw-download',
  templateUrl: './download.component.html',
  styleUrls: ['./download.component.css'],
  standalone: false,
})
export class DownloadComponent implements OnInit {
  iconclass: string = 'fa-file-arrow-down';
  spinnerClass: string = 'fa-spinner fa-pulse';
  @Input() apiUrl: string = '';
  @Input() desc: string = 'No description available';
  @Input() icon: string = '';
  @Input() validateform: string = '';
  @Input() isDisabled: boolean = false;
  @Input() disableclick: boolean = false;
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
  private renderer: Renderer2;
  constructor(
    private el: ElementRef,
    private rendererFactory: RendererFactory2,
    private globalService: GlobalService,
    private frameworkService: FrameworkService,
    private ValidationService: FormValidationService,
  ) {
    this.renderer = rendererFactory.createRenderer(null, null);
  }
  area: string = this.globalService.getArea();
  ngOnInit() {
    this.changeicon();
    if (!this.disableclick) {
      this.addClickEventListener();
    }
  }

  ngOnChanges() {
    this.changeicon();
  }
  getTooltipContent() {
    if (!this.desc) return '';

    // Split the string by '|', trim spaces, and filter out empty entries
    const parts = this.desc
      .split('|')
      .map((p) => p.trim())
      .filter((p) => p);

    // Join the parts using '\n' to create multi-line tooltip text
    return parts.join('\n');
  }
  changeicon() {
    if (this.icon == 'doc') {
      this.iconclass = 'fa-file-word';
    } else if (this.icon == 'pdf') {
      this.iconclass = 'fa-file-pdf';
    } else if (this.icon == 'excel') {
      this.iconclass = 'fa-file-excel';
    } else if (this.icon == 'camera') {
      this.iconclass = 'fa-camera-retro';
    } else if (this.icon == 'idcard') {
      this.iconclass = 'fa-id-card';
    } else if (this.icon == 'print') {
      this.iconclass = 'fa-print';
    } else if (this.icon == 'info') {
      this.iconclass = 'fa-circle-info';
    } else {
      this.iconclass = 'fa-file-arrow-down';
    }

    if (this.isDisabled) {
      this.iconclass = this.iconclass + ' text-secondary';
    }
  }
  addClickEventListener() {
    const element = this.el.nativeElement.querySelector('.fw-download-icon');
    if (element) {
      this.renderer.listen(element, 'click', (event: MouseEvent) => {
        if (!this.isDisabled) {
          this.iconclass = this.spinnerClass;
          this.calldownloadAPI();
        }
      });
    }
  }
  calldownloadAPI() {
    if (!this.apiUrl) return;

    const isFormValid =
      !this.validateform || this.ValidationService.formValidation(this.validateform, '');

    if (isFormValid) {
      this.frameworkService.calldownloadAPI(this.apiUrl, this._parameter, this.area).subscribe({
        next: (response) => {
          if (response) {
            this.changeicon();
          }
        },
      });
    } else {
      this.changeicon();
    }
  }
}
