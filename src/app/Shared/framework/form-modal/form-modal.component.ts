import { Component, ElementRef, input, Input, ViewChild } from '@angular/core';
import { GlobalService } from 'src/app/Global/Service/global.service';
import { IModalSettings } from '../model/model';
import { FrameworkService } from '../framework.service';
import { FormValidationService } from '../../formValidation.service';

@Component({
  selector: 'fw-form-modal',
  standalone: false,
  templateUrl: './form-modal.component.html',
  styleUrl: './form-modal.component.scss',
})
export class FormModalComponent {
  id = input('');
  isApiLoading: boolean = false;
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
    if (this._modalSettings.onModalClose) this._modalSettings.onModalClose();
  }
  CallAPI() {
    this.isApiLoading = true;
    var ApiParameter: any = {};
    if (this._modalSettings.formId !== '') {
      ApiParameter = this._modalSettings.getInputParameter
        ? this._modalSettings.getInputParameter()
        : {};
    }
    if (
      !this.formValidationService.formValidation(
        this._modalSettings.formId,
        this._modalSettings.validationGroup,
      )
    ) {
      this.isApiLoading = false;
      return;
    }
    this.frameworkService
      .callSelectAPI(this._modalSettings.api, ApiParameter, this.area, false)
      .subscribe({
        next: (Response) => {
          if (Response.status == '200' || Response.status == '300') {
            this.isApiLoading = false;
            if (this._modalSettings.targetHTML != null) {
              this._modalSettings.targetHTML.remove();
            }
            if (this._modalSettings.responseOkAction) {
              this._modalSettings.responseOkAction(Response);
            }
          }
          if (Response.status == '200') this.closeModal();
        },
      });
  }
}
