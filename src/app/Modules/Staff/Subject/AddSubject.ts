export class AddSubjectRequest {
  batch: string;
  courseCode: string;
  semester: string;
  onlyActive: boolean;
  courseType: string;
  subjectName: string;
  subjectCode: string;
  courseNameSD: string;
  subjectCredit: number;
  subjectType: string;
  marginMark: number;

  constructor(data?: Partial<AddSubjectRequest>) {
    this.batch = data?.batch || '';
    this.courseCode = data?.courseCode || '';
    this.semester = data?.semester || '';
    this.onlyActive = data?.onlyActive ?? true;
    this.courseType = data?.courseType || '';
    this.subjectName = data?.subjectName || '';
    this.subjectCode = data?.subjectCode || '';
    this.courseNameSD = data?.courseNameSD || '';
    this.subjectCredit = data?.subjectCredit ?? 0;
    this.subjectType = data?.subjectType || '';
    this.marginMark = data?.marginMark ?? 0;
  }
}

export class SubjectDetailsResponse {
  subjectId: number;
  batch: string;
  courseNameSD: string;
  section: string | null;
  semester: string;
  subjectName: string;
  subjectCode: string;
  subjectCredit: number;
  marginMark: number;
  status: string;
  subjectType: string;
  entredBy: string;
  entrydate: string;
  modifiedDate: string;
  modifiedBy: string | null;

  constructor(data?: Partial<SubjectDetailsResponse>) {
    this.subjectId = data?.subjectId ?? 0;
    this.batch = data?.batch ?? '';
    this.courseNameSD = data?.courseNameSD ?? '';
    this.section = data?.section ?? null;
    this.semester = data?.semester ?? '';
    this.subjectName = data?.subjectName ?? '';
    this.subjectCode = data?.subjectCode ?? '';
    this.subjectCredit = data?.subjectCredit ?? 0;
    this.marginMark = data?.marginMark ?? 0;
    this.status = data?.status ?? '';
    this.subjectType = data?.subjectType ?? '';
    this.entredBy = data?.entredBy ?? '';
    this.entrydate = data?.entrydate ?? '';
    this.modifiedDate = data?.modifiedDate ?? '';
    this.modifiedBy = data?.modifiedBy ?? null;
  }
}

export class UpdateSubjectRequest {
  sysId: number;
  subjectName: string;
  subjectCode: string;
  subjectCredit: number;
  subjectType: string;
  marginMark: number;

  constructor(data?: Partial<UpdateSubjectRequest>) {
    this.sysId = data?.sysId ?? 0;
    this.subjectName = data?.subjectName ?? '';
    this.subjectCode = data?.subjectCode ?? '';
    this.subjectCredit = data?.subjectCredit ?? 0;
    this.subjectType = data?.subjectType ?? '';
    this.marginMark = data?.marginMark ?? 0;
  }
}
