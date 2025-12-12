export class GetStudentMarkReportRequest {
  courseType: string;
  batch: string;
  courseCode: string;
  section: string;
  semester: string;
  subjectId: number;
  onlyActive: boolean;

  constructor(init?: Partial<GetStudentMarkReportRequest>) {
    this.courseType = init?.courseType ?? '';
    this.batch = init?.batch ?? '';
    this.courseCode = init?.courseCode ?? '';
    this.section = init?.section ?? '';
    this.semester = init?.semester ?? '';
    this.subjectId = init?.subjectId ?? 0;
    this.onlyActive = init?.onlyActive ?? true;
  }
}
export class StudentMarkReportResponse {
  id: number;
  rollNo: string;
  name: string;
  batch: string;
  departmentName: string;
  courseNameSD: string;
  section: string;
  semester: string;
  subjectID: number;
  subjectName: string;
  subjectCode: string;
  subjectCredit: number;
  internalI: number;
  internalII: number;
  model: number;
  h1Mark: number;
  h2Mark: number;
  total: number;

  constructor(init?: Partial<StudentMarkReportResponse>) {
    this.id = init?.id ?? 0;
    this.rollNo = init?.rollNo ?? '';
    this.name = init?.name ?? '';
    this.batch = init?.batch ?? '';
    this.departmentName = init?.departmentName ?? '';
    this.courseNameSD = init?.courseNameSD ?? '';
    this.section = init?.section ?? '';
    this.semester = init?.semester ?? '';
    this.subjectID = init?.subjectID ?? 0;
    this.subjectName = init?.subjectName ?? '';
    this.subjectCode = init?.subjectCode ?? '';
    this.subjectCredit = init?.subjectCredit ?? 0;
    this.internalI = init?.internalI ?? 0;
    this.internalII = init?.internalII ?? 0;
    this.model = init?.model ?? 0;
    this.h1Mark = init?.h1Mark ?? 0;
    this.h2Mark = init?.h2Mark ?? 0;
    this.total = init?.total ?? 0;
  }
}
