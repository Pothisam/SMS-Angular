export class GetStudentMarkAnalysisRequest {
  courseType: string;
  batch: string;
  courseCode: string;
  section: string;
  semester: string;
  examType: string;
  onlyActive: boolean;

  constructor(init?: Partial<GetStudentMarkAnalysisRequest>) {
    this.courseType = init?.courseType ?? '';
    this.batch = init?.batch ?? '';
    this.courseCode = init?.courseCode ?? '';
    this.section = init?.section ?? '';
    this.semester = init?.semester ?? '';
    this.examType = init?.examType ?? '';
    this.onlyActive = init?.onlyActive ?? true;
  }
}
export class StudentSubject {
  column: string;
  value: string;

  constructor(init?: Partial<StudentSubject>) {
    this.column = init?.column ?? '';
    this.value = init?.value ?? '';
  }
}
export class StudentMarkAnalysis1Response {
  subjectName: string;

  constructor(init?: Partial<StudentMarkAnalysis1Response>) {
    this.subjectName = init?.subjectName ?? '';
  }
}
export class StudentMarkAnalysisResponse {
  rollNo: string;
  name: string;
  subjects: StudentSubject[];

  constructor(init?: Partial<StudentMarkAnalysisResponse>) {
    this.rollNo = init?.rollNo ?? '';
    this.name = init?.name ?? '';
    this.subjects = init?.subjects?.map((s) => new StudentSubject(s)) ?? [];
  }
}
export class StudentMarkAnalysis3Response {
  id: string;
  description: string;
  subjects: StudentSubject[];

  constructor(init?: Partial<StudentMarkAnalysis3Response>) {
    this.id = init?.id ?? '';
    this.description = init?.description ?? '';
    this.subjects = init?.subjects?.map((s) => new StudentSubject(s)) ?? [];
  }
}
