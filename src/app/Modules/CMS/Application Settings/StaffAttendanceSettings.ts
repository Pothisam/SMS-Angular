export class StaffAttendanceSettingsModal {
  EnableAttendance: boolean;
  StartTime: string;
  EndTime: string;
  TotalPermissionAllowedPerMonth: number;
  TotalLeavesForYear: number;
  TotalLateAllowedPerMonth: string;
  StartMonth: number;
  Semester: string;
  TotalLeaveAllowedPerMonthNewStaff: number;
  TotalMLAllowedforOldStaff: number;
  TotalMLAllowedforNewStaff: number;
  TotalLeavesAllowedPerMonthOldStaff: string;
  EditPreviousDays: string;

  constructor(data?: Partial<StaffAttendanceSettingsModal>) {
    this.EnableAttendance = data?.EnableAttendance ?? false;
    this.StartTime = data?.StartTime ?? '08:30';
    this.EndTime = data?.EndTime ?? '15:00';
    this.TotalPermissionAllowedPerMonth = data?.TotalPermissionAllowedPerMonth ?? 2;
    this.TotalLeavesForYear = data?.TotalLeavesForYear ?? 12;
    this.TotalLateAllowedPerMonth = data?.TotalLateAllowedPerMonth ?? '2';
    this.StartMonth = data?.StartMonth ?? 6;
    this.Semester = data?.Semester ?? 'Even';
    this.TotalLeaveAllowedPerMonthNewStaff = data?.TotalLeaveAllowedPerMonthNewStaff ?? 1;
    this.TotalMLAllowedforOldStaff = data?.TotalMLAllowedforOldStaff ?? 4;
    this.TotalMLAllowedforNewStaff = data?.TotalMLAllowedforNewStaff ?? 0;
    this.TotalLeavesAllowedPerMonthOldStaff = data?.TotalLeavesAllowedPerMonthOldStaff ?? '0';
    this.EditPreviousDays = data?.EditPreviousDays ?? '0';
  }
}
