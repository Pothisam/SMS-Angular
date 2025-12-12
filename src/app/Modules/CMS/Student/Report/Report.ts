export class StudentDetailsReportRequest {
  courseType: string;
  batch: string;
  courseCode: string;
  section: string;
  columns: string;

  constructor(data?: Partial<StudentDetailsReportRequest>) {
    this.courseType = data?.courseType || '';
    this.batch = data?.batch || '';
    this.courseCode = data?.courseCode || '';
    this.section = data?.section || '';
    this.columns = data?.columns || '';
  }
}
