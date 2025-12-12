import { Component } from '@angular/core';
import { FeesSettingsModal } from 'src/app/Modules/CMS/Application Settings/FeesSettings';
import { SettingsService } from '../Settings.service';
import { IHistoryRecordParameter } from 'src/app/Shared/framework/historyrecord/historyrecord';

@Component({
  selector: 'app-fees-settings',
  standalone: false,
  templateUrl: './fees-settings.component.html',
  styleUrl: './fees-settings.component.scss',
})
export class FeesSettingsComponent {
  private sysid: number = 0;

  hasChanges: boolean = false;
  feesSettings: FeesSettingsModal = new FeesSettingsModal();
  _historyParameter: IHistoryRecordParameter = new IHistoryRecordParameter();

  request: { application: string } = { application: 'Fees' };

  settingsElements: { settingName: string; desc: string; value: boolean }[] = [];

  constructor(private settingsService: SettingsService) {}

  ngOnInit() {
    this.getSettings();
    this._historyParameter.application = 'fees';
    this._historyParameter.loadAllRecord = false;
    this._historyParameter.tableName = 'ApplicationDefaultSettings';
  }

  getSettings() {
    this.settingsService.getSettings(this.request).subscribe({
      next: (response) => {
        this.sysid = response.data.sysid;
        this._historyParameter.fID = this.sysid;
        this.feesSettings = new FeesSettingsModal(
          JSON.parse(response.data.settings) as FeesSettingsModal,
        );
        this.settingsElements = [
          {
            settingName: 'Enable Concession',
            desc: 'Enables Concession fees across the applicaion.',
            value: this.feesSettings.EnableConcession,
          },
          {
            settingName: 'Enable Scholarship',
            desc: 'Enables Scholarship  fees across the applicaion.',
            value: this.feesSettings.EnableScholarship,
          },
          {
            settingName: 'Enable Refund',
            desc: 'Enables Refund option for student.',
            value: this.feesSettings.EnableRefund,
          },
          {
            settingName: 'Enable Delete Record',
            desc: 'Enables the option to Delete records in the fees.',
            value: this.feesSettings.EnableDeleteRecord,
          },
        ];
      },
    });
  }

  saveSettings() {
    var request = {
      application: 'fees',
      settings: JSON.stringify(this.feesSettings),
      sysid: this.sysid,
    };
    this.settingsService.saveSettings(request).subscribe({
      next: (response) => {
        this.hasChanges = false;
      },
    });
  }

  UpdateSettings(settingName: string, value: boolean) {
    this.hasChanges = true;
    Object.assign(this.feesSettings, { [settingName.split(' ').join('')]: value });
    this.settingsElements.forEach((element) => {
      element.settingName === settingName ? (element.value = value) : element;
    });
  }
}
