export class IHistoryRecordSettings {
  isModalVisible: boolean;
  fID: number;
  tableName: string;
  application: string;
  html: HTMLElement | null;
  constructor(
    isModalVisible: boolean = false,
    fID: number = 0,
    tableName: string = '',
    application: string = '',
    html: HTMLElement | null = null,
  ) {
    this.isModalVisible = isModalVisible;
    this.fID = fID;
    this.tableName = tableName;
    this.application = application;
    this.html = html;
  }
}
export class IHistoryRecordParameter {
  fID: number;
  tableName: string;
  application: string;
  loadAllRecord: boolean;
  constructor(
    fID: number = 0,
    tableName: string = '',
    application: string = '',
    loadAllRecord: boolean = false,
  ) {
    this.fID = fID;
    this.tableName = tableName;
    this.application = application;
    this.loadAllRecord = loadAllRecord;
  }
}
