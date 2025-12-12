import { Component, ElementRef, input, Input, OnInit, ViewChild } from '@angular/core';
import { GlobalService } from 'src/app/Global/Service/global.service';
import { IModalSettings } from './model';
import { FrameworkService } from '../framework.service';
import { FormValidationService } from '../../formValidation.service';

@Component({
  selector: 'fw-model',
  templateUrl: './model.component.html',
  styleUrls: ['./model.component.css'],
  standalone: false,
})
export class ModelComponent implements OnInit {
  id = input('');
  isModalVisible = true;
  _modalSettings: IModalSettings = new IModalSettings();
  area: string = this.globalService.getArea();
  @ViewChild('staticBackdrop') modalElement!: ElementRef;
  constructor(
    private globalService: GlobalService,
    private frameworkService: FrameworkService,
    private formValidationService: FormValidationService,
  ) {}

  ngOnInit() {
    this.globalService.modelDeleteConfirmation$.subscribe((value: IModalSettings) => {
      this._modalSettings = value;
      setTimeout(() => {
        if (this.modalElement) {
          this.modalElement.nativeElement.focus();
        }
      }, 0);
    });
  }
  openModal() {
    this._modalSettings.isModalVisible = true;
    if (this.modalElement) {
      this.modalElement.nativeElement.focus();
    }
  }

  closeModal() {
    if (this._modalSettings.targetHTML != null) {
      this._modalSettings.targetHTML.focus();
    }
    this._modalSettings.isModalVisible = false;
  }
  CallAPI() {
    var ApiParameter: any = {};
    if (this._modalSettings.formId !== '') {
      ApiParameter = this._modalSettings.getInputParameter
        ? this._modalSettings.getInputParameter()
        : {};
    }
    if (this._modalSettings.formId != '') {
      if (
        !this.formValidationService.formValidation(
          this._modalSettings.formId,
          this._modalSettings.validationGroup,
        )
      )
        return;
    }
    if (this._modalSettings.parameter) {
      ApiParameter = this._modalSettings.parameter;
    }
    this.frameworkService
      .callSelectAPI(this._modalSettings.api, ApiParameter, this.area, false)
      .subscribe({
        next: (Response) => {
          if (Response.status == '200' || Response.status == '300') {
            this.closeModal();
            if (this._modalSettings.targetHTML != null) {
              this._modalSettings.targetHTML.remove();
            }
            if (this._modalSettings.responseOkAction) {
              this._modalSettings.responseOkAction(Response);
            }
          }
        },
      });
  }
}
