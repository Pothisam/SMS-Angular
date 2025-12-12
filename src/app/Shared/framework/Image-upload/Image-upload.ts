export class InsertOrUpdateProfileRequest {
  sysid: number;
  fileName: string;
  contentType: string;
  data: string;
  table: string;

  constructor(
    sysid: number = 0,
    fileName: string = '',
    contentType: string = '',
    data: string = '',
    table: string = '',
  ) {
    this.sysid = sysid;
    this.fileName = fileName;
    this.contentType = contentType;
    this.data = data;
    this.table = table;
  }
}
