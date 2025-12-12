export class StudentAttendanceConfig {
  studentAttendanceEnabled: boolean;
  studentAttendanceFromDate: string;
  studentAttendanceToDate: string;
  studentAttendanceEntryByCourseInstructor: string;
  studentAttendanceHours: number;
  studentFeedBackEntryEnabled: boolean;
  studentFeesBalanceEnabled: boolean;
  studentAbsentMsg: string;
  studentAbsentTemplateID: string;
  studentAttendanceView: boolean;
  enableAttendance: boolean;
  startTime: string;
  endTime: string;
  totalPermissionAllowedPerMonth: number;
  totalLeavesForYear: number;
  totalLateAllowedPerMonth: number;
  startMonth: number;
  semester: string;
  totalLeaveAllowedPerMonthNewStaff: number;
  totalMLAllowedforOldStaff: number;
  totalMLAllowedforNewStaff: number;
  totalLeavesAllowedPerMonthOldStaff: number;
  editPreviousDays: number;
  studentAttendanceDay: number;

  constructor(data?: Partial<StudentAttendanceConfig>) {
    this.studentAttendanceEnabled = data?.studentAttendanceEnabled ?? false;
    this.studentAttendanceFromDate = data?.studentAttendanceFromDate ?? '';
    this.studentAttendanceToDate = data?.studentAttendanceToDate ?? '';
    this.studentAttendanceEntryByCourseInstructor =
      data?.studentAttendanceEntryByCourseInstructor ?? '';
    this.studentAttendanceHours = Number(data?.studentAttendanceHours ?? 0);
    this.studentFeedBackEntryEnabled = data?.studentFeedBackEntryEnabled ?? false;
    this.studentFeesBalanceEnabled = data?.studentFeesBalanceEnabled ?? false;
    this.studentAbsentMsg = data?.studentAbsentMsg ?? '';
    this.studentAbsentTemplateID = data?.studentAbsentTemplateID ?? '';
    this.studentAttendanceView = data?.studentAttendanceView ?? false;
    this.enableAttendance = data?.enableAttendance ?? false;
    this.startTime = data?.startTime ?? '';
    this.endTime = data?.endTime ?? '';
    this.totalPermissionAllowedPerMonth = Number(data?.totalPermissionAllowedPerMonth ?? 0);
    this.totalLeavesForYear = Number(data?.totalLeavesForYear ?? 0);
    this.totalLateAllowedPerMonth = Number(data?.totalLateAllowedPerMonth ?? 0);
    this.startMonth = Number(data?.startMonth ?? 0);
    this.semester = data?.semester ?? '';
    this.totalLeaveAllowedPerMonthNewStaff = Number(data?.totalLeaveAllowedPerMonthNewStaff ?? 0);
    this.totalMLAllowedforOldStaff = Number(data?.totalMLAllowedforOldStaff ?? 0);
    this.totalMLAllowedforNewStaff = Number(data?.totalMLAllowedforNewStaff ?? 0);
    this.totalLeavesAllowedPerMonthOldStaff = Number(data?.totalLeavesAllowedPerMonthOldStaff ?? 0);
    this.editPreviousDays = Number(data?.editPreviousDays ?? 0);
    this.studentAttendanceDay = Number(data?.studentAttendanceDay ?? 5); // Default to Saturday
  }
  static fromJson(raw: any): StudentAttendanceConfig {
    const mapped: Partial<StudentAttendanceConfig> = {};

    for (const key in raw) {
      if (raw.hasOwnProperty(key)) {
        const camelKey = key.charAt(0).toLowerCase() + key.slice(1);
        (mapped as any)[camelKey] = raw[key];
      }
    }

    return new StudentAttendanceConfig(mapped);
  }
}
