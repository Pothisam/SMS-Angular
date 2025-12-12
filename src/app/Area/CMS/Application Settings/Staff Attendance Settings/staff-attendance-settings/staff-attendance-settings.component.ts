import { Component, Type } from '@angular/core';
import { StaffAttendanceSettingsModal } from 'src/app/Modules/CMS/Application Settings/StaffAttendanceSettings';
import { SettingsService } from '../../Settings.service';
import { IHistoryRecordParameter } from 'src/app/Shared/framework/historyrecord/historyrecord';

@Component({
  selector: 'app-staff-attendance-settings',
  standalone: false,
  templateUrl: './staff-attendance-settings.component.html',
  styleUrl: './staff-attendance-settings.component.scss',
})
export class StaffAttendanceSettingsComponent {
  hasChanges: boolean = false;
  private sysid: number = 0;

  request: { application: string } = { application: 'StaffAttendance' };
  StaffSettings: StaffAttendanceSettingsModal = new StaffAttendanceSettingsModal();
  _historyParameter: IHistoryRecordParameter = new IHistoryRecordParameter();

  settingsElements: {
    settingName: string;
    desc: string;
    value: any;
    type: string;
    entity: string;
    list?: {
      text: string;
      value: string;
    }[];
  }[] = [];

  constructor(private settingsService: SettingsService) {}

  ngOnInit() {
    this.getSettings();
    this._historyParameter.application = 'StaffAttendance';
    this._historyParameter.loadAllRecord = false;
    this._historyParameter.tableName = 'ApplicationDefaultSettings';
    window.addEventListener('beforeunload', function (event) {
      const leavePage = confirm('There are usaved changes. Are you sure?');
      if (leavePage) {
        history.back();
      } else {
        history.pushState(null, document.title, location.href);
      }
    });
  }

  getSettings() {
    this.settingsService.getSettings(this.request).subscribe({
      next: (response) => {
        this.sysid = response.data.sysid;
        this._historyParameter.fID = this.sysid;
        this.StaffSettings = new StaffAttendanceSettingsModal(JSON.parse(response.data.settings));
        this.settingsElements = [
          {
            settingName: 'Enable Attendance',
            desc: 'Enables Attendance for staffs.',
            value: this.StaffSettings.EnableAttendance,
            entity: 'EnableAttendance',
            type: 'boolean',
          },
          {
            settingName: 'Start Time',
            desc: 'Enter the shift start time for the staff',
            value: this.StaffSettings.StartTime,
            entity: 'StartTime',
            type: 'date',
          },
          {
            settingName: 'End Time',
            desc: 'Enter the End start time for the staff',
            value: this.StaffSettings.EndTime,
            entity: 'EndTime',
            type: 'date',
          },
          {
            settingName: 'Leaves Allowed for Old Staff',
            desc: 'Enter the total number leave can allowed for the old staff.',
            value: this.StaffSettings.TotalLeavesAllowedPerMonthOldStaff,
            entity: 'TotalLeavesAllowedPerMonthOldStaff',
            type: 'number',
          },
          {
            settingName: "Permission Allowed for staff's",
            desc: "Enter the total number of permission allowed for all staff's.",
            value: this.StaffSettings.TotalPermissionAllowedPerMonth,
            entity: 'TotalPermissionAllowedPerMonth',
            type: 'number',
          },
          {
            settingName: 'Total leave per a year',
            desc: '',
            value: this.StaffSettings.TotalLeavesForYear,
            entity: 'TotalLeavesForYear',
            type: 'number',
          },
          {
            settingName: 'Attandance cycle start month',
            desc: 'Please select the staring month for the attandance cycle.',
            value: this.StaffSettings.StartMonth,
            entity: 'StartMonth',
            type: 'dropdown',
            list: [
              { text: 'January', value: '1' },
              { text: 'February', value: '2' },
              { text: 'March', value: '3' },
              { text: 'April', value: '4' },
              { text: 'May', value: '5' },
              { text: 'June', value: '6' },
              { text: 'July', value: '7' },
              { text: 'August', value: '8' },
              { text: 'September', value: '9' },
              { text: 'October', value: '10' },
              { text: 'November', value: '11' },
              { text: 'December', value: '12' },
            ],
          },
          {
            settingName: 'Semester',
            desc: 'Please select the Semester cycle.',
            value: this.StaffSettings.Semester,
            entity: 'Semester',
            type: 'dropdown',
            list: [
              { text: 'Odd', value: 'Odd' },
              { text: 'Even', value: 'Even' },
            ],
          },
          {
            settingName: 'Leaves Allowed for New Staff',
            desc: 'Enter the total number leave can allowed for the new staff.',
            value: this.StaffSettings.TotalLeaveAllowedPerMonthNewStaff,
            entity: 'TotalLeaveAllowedPerMonthNewStaff',
            type: 'number',
          },
          {
            settingName: "ML's Allowed for New Staff",
            desc: 'Enter the total number ML can allowed for the new staff.',
            value: this.StaffSettings.TotalMLAllowedforNewStaff,
            entity: 'TotalMLAllowedforNewStaff',
            type: 'number',
          },
          {
            settingName: "ML's Allowed for Old Staff",
            desc: 'Enter the total number ML can allowed for the old staff.',
            value: this.StaffSettings.TotalMLAllowedforOldStaff,
            entity: 'TotalMLAllowedforOldStaff',
            type: 'number',
          },
          {
            settingName: 'EditPreviousDays',
            desc: 'EditPreviousDays',
            value: this.StaffSettings.EditPreviousDays,
            entity: 'EditPreviousDays',
            type: 'number',
          },
        ];
      },
    });
  }

  saveSettings() {
    var request = {
      application: 'StaffAttendance',
      settings: JSON.stringify(this.StaffSettings),
      sysid: this.sysid,
    };
    this.settingsService.saveSettings(request).subscribe({
      next: (response) => {
        this.hasChanges = response.status === '200';
      },
    });
  }

  UpdateSettings(settingName: string, value: any) {
    this.hasChanges = true;
    Object.assign(this.StaffSettings, { [settingName]: value.target.value });
  }
}
