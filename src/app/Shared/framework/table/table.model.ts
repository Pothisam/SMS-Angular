export class ITableSettings {
  showFotter: boolean;
  showPagination: boolean;
  jsonData: any;
  shorting: boolean;
  slno: boolean;
  profileImage?: boolean;
  checkbox: boolean;
  class?: string;
  columns: IColumnDef[];
  columnSticky: number[];
  headerSticky: boolean;
  filter: boolean;
  rowCallback?: {
    columnname: string;
    value: string;
    class: string;
  };
  constructor() {
    this.showFotter = true;
    this.showPagination = true;
    this.shorting = true;
    this.slno = false;
    this.profileImage = false;
    this.checkbox = false;
    this.class = '';
    this.columns = [
      {
        title: 'string',
        data: 'string',
        class: 'string',
        short: true,
        width: 10,
        type: 'string', // 'decimal', 'date'
        render: '',
        buttongroup: [
          {
            button: false,
            buttons: ['edit', 'history'],
            buttondata: 'history',
            conditions: [
              'delete|status|Active',
              'toggle|status|Active',
              'history|tablename|pk|application',
            ],
            visible: ['toggle|status|Active'],
            click: ['delete|sysid|departmentName'],
            toggle: ['sysid|API|parameter'],
          },
        ],
        conditionalClass: [
          { column: 'column', operator: '>', value: 90, cssClass: 'text-success' },
          { column: 'column', operator: '<', value: 50, cssClass: 'text-danger' },
        ],
        footergroup: [
          {
            sumfunction: true,
          },
        ],
        buttonlabel: '',
      },
    ];
    (this.columnSticky = [0, 1, 2]),
      (this.headerSticky = false),
      (this.filter = false),
      (this.rowCallback = {
        columnname: 'status',
        value: 'Inactive',
        class: 'danger',
      });
  }
}
export type ConditionOperator = '>' | '<' | '=' | '!=' | '>=' | '<=';
export interface IConditionalClass {
  column: string;
  operator: ConditionOperator;
  value: any;
  cssClass: string;
}
export interface IColumnDef {
  title: string;
  data: string;
  class?: string;
  short?: boolean;
  width?: number;
  type?: string;
  render?: any;
  buttongroup?: {
    button?: boolean;
    buttons?: string[];
    buttondata?: string;
    conditions?: string[];
    visible?: string[];
    dynamic?: string[];
    click?: string[] | ((row: any) => void);
    toggle?: string[];
  }[];
  conditionalClass?: IConditionalClass[];
  footergroup?: { sumfunction?: boolean }[];
  buttonlabel?: string;
}
export class ITableDelete {
  API: string;
  PK: string;
  ColumnName: string;
  ParameterName: any;
  Message: string;
  Note: string;
  showmodel: boolean;
  constructor() {
    this.API = '';
    this.PK = '';
    this.ColumnName = '';
    this.ParameterName = '';
    this.Message = '';
    this.Note = '';
    this.showmodel = false;
  }
}
export class ITabletoggle {
  API: string;
  PK: string;
  ParameterName: any;
  constructor() {
    this.API = '';
    this.PK = '';
    this.ParameterName = '';
  }
}
export class ITableDownloadFile {
  SysId: string;
  constructor() {
    this.SysId = '';
  }
}
export class ITableHistory {
  fID: number;
  tableName: string;
  application: string;
  loadAllRecord: boolean;
  constructor() {
    this.fID = 0;
    this.tableName = '';
    this.application = '';
    this.loadAllRecord = false;
  }
}
