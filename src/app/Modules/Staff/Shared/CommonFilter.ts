export class IapiUrldetails {
  coursetypeapiUrl: string;
  batchapiUrl: string;
  courseapiUrl: string;
  sectionapiUrl: string;
  constructor(data: Partial<IapiUrldetails> = {}) {
    this.coursetypeapiUrl = data.coursetypeapiUrl ?? '';
    this.batchapiUrl = data.batchapiUrl ?? '';
    this.courseapiUrl = data.courseapiUrl ?? '';
    this.sectionapiUrl = data.sectionapiUrl ?? '';
  }
}
export class IapiUrlAdmindetails {
  coursetypeapiUrl: string;
  departmentapiUrl: string;
  batchapiUrl: string;
  courseapiUrl: string;
  sectionapiUrl: string;
  constructor(data: Partial<IapiUrlAdmindetails> = {}) {
    this.coursetypeapiUrl = data.coursetypeapiUrl ?? '';
    this.departmentapiUrl = data.departmentapiUrl ?? '';
    this.batchapiUrl = data.batchapiUrl ?? '';
    this.courseapiUrl = data.courseapiUrl ?? '';
    this.sectionapiUrl = data.sectionapiUrl ?? '';
  }
}
export class ICommonFilterRequest {
  courseType: string;
  batch: string;
  courseCode: string;
  section: string;
  isActive: boolean;
  constructor(data?: Partial<ICommonFilterRequest>) {
    this.courseType = data?.courseType || '';
    this.batch = data?.batch || '';
    this.courseCode = data?.courseCode || '';
    this.section = data?.section || '';
    this.isActive = data?.isActive !== undefined ? data.isActive : false;
  }
}
export class ICommonFilterAdminRequest {
  courseType: string;
  departmentcode: string;
  batch: string;
  courseCode: string;
  section: string;
  isActive: boolean;
  constructor(data?: Partial<ICommonFilterAdminRequest>) {
    this.courseType = data?.courseType || '';
    this.departmentcode = data?.departmentcode || '';
    this.batch = data?.batch || '';
    this.courseCode = data?.courseCode || '';
    this.section = data?.section || '';
    this.isActive = data?.isActive !== undefined ? data.isActive : false;
  }
}
