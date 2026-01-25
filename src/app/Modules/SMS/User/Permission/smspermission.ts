export class smspermission {
  'Application Settings': boolean = false;
  'Change Institution': boolean = false;
  'Management': boolean = false;
  'Staff': boolean = false;
  'Student': boolean = false;
  'Isvalid': boolean = false;
  constructor(data?: any) {
    if (data) {
      Object.assign(this, data);
    }
  }
}
