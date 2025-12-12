import { Component, Input, OnInit } from '@angular/core';
import { IModalSettings } from '../../model/model';
import { GlobalService } from 'src/app/Global/Service/global.service';
import { IResetPasswordParameter } from './key';

@Component({
  selector: 'fw-key',
  templateUrl: './key.component.html',
  styleUrls: ['./key.component.css'],
  standalone: false,
})
export class KeyComponent implements OnInit {
  @Input() Parameter: IResetPasswordParameter = new IResetPasswordParameter();
  public _modalSettings: IModalSettings = new IModalSettings();
  constructor(private globalService: GlobalService) {}
  public resetfk: any = {};
  ngOnInit() {}
  onMatIconClick(event: Event) {
    const targetElement = event.target as HTMLElement;
    this.resetfk[this.Parameter.parameterkey] = this.Parameter.sysid;
    this._modalSettings.isModalVisible = true;
    this._modalSettings.headerMessage = 'Reset Password Confirmation';
    this._modalSettings.bodyMessage = this.Parameter.bodyMessage;
    this._modalSettings.parameter = this.resetfk;
    this._modalSettings.api = this.Parameter.api;
    this._modalSettings.targetHTML = targetElement;
    this._modalSettings.modalId = 'delete-conformation';

    this.globalService.updateModelDeleteConfirmation(this._modalSettings);
  }
}
