export interface SelectInterface {
  text: string;
  value: string;
}
export class CGuid {
  guid: string;
  constructor() {
    this.guid = '';
  }
}
export class TableRecordInfo {
  enteredBy: string;
  entryDate: string;
  modifiedBy: string;
  modifiedDate: string;
  constructor(
    enteredBy: string = '',
    entryDate: string = '',
    modifiedBy: string = '',
    modifiedDate: string = '',
  ) {
    this.enteredBy = enteredBy;
    this.entryDate = entryDate;
    this.modifiedBy = modifiedBy;
    this.modifiedDate = modifiedDate;
  }
}
export class CommonAutocompleteRequest {
  tableName: string;
  columnName: string;
  searchParam: string;

  constructor(data?: Partial<CommonAutocompleteRequest>) {
    this.tableName = data?.tableName ?? '';
    this.columnName = data?.columnName ?? '';
    this.searchParam = data?.searchParam ?? '';
  }
}
export class CommonCourseTypeRequestBase {
  courseType: string;

  constructor(data?: Partial<CommonCourseTypeRequestBase>) {
    this.courseType = data?.courseType ?? '';
  }
}

// Base class with `courseType` and `departmentCode`
export class CommonCourseTypeAndDepartmentCodeRequestBase extends CommonCourseTypeRequestBase {
  departmentCode: string;

  constructor(data?: Partial<CommonCourseTypeAndDepartmentCodeRequestBase>) {
    super(data); // Initialize `courseType`
    this.departmentCode = data?.departmentCode ?? '';
  }
}

// Class with only `courseType`
export class CommonCourseTypeRequest extends CommonCourseTypeRequestBase {
  constructor(data?: Partial<CommonCourseTypeRequest>) {
    super(data); // Reuse base class constructor
  }
}

// Class with `courseType` and `departmentCode`
export class CommonCourseTypeAndDepartmentCodeRequest extends CommonCourseTypeAndDepartmentCodeRequestBase {
  constructor(data?: Partial<CommonCourseTypeAndDepartmentCodeRequest>) {
    super(data); // Initialize `courseType` and `departmentCode`
  }
}

// Class with `courseType`, `departmentCode`, and `courseCode`
export class CommonCourseCodeRequest {
  courseCode: string;

  constructor(data?: Partial<CommonCourseCodeRequest>) {
    this.courseCode = data?.courseCode ?? '';
  }
}
export class CommonSemesterYearRequest {
  semester: string;

  constructor(data?: Partial<CommonSemesterYearRequest>) {
    this.semester = data?.semester ?? '';
  }
}
