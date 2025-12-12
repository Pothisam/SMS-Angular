export class IHolidayListResponse {
  sysId: number = 0;
  date: string = '';
  status: string = '';
  workingDay: string | null = null;
  institutionCode: number = 0;
  entryDate: string = '';
  recordStatus: string = '';
  month: number = 0;
  monthName: string = '';
  enteredBy: string = '';
  modifiedBy: string | null = null;
  modifiedDate: string | null = null;

  constructor(init?: Partial<IHolidayListResponse>) {
    Object.assign(this, init);
  }
}
export interface IHolidayRequest {
  year: string;
}
export interface IAddHoliday {
  date: string;
  status: string;
  workingDay: string;
}
