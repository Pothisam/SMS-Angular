import { Component, OnInit } from '@angular/core';
import {
  GetFeesGentrationRequest,
  StudentFeeGenerateStatusResponse,
} from 'src/app/Modules/Fees/Managefees/FeesType';
import { ClassSectionRequest } from 'src/app/Modules/SMS/ClassSection/ClassSection.Request';
import { FrameworkService } from 'src/app/Shared/framework/framework.service';
import { ITableSettings } from 'src/app/Shared/framework/table/table.model';

@Component({
  selector: 'app-GenerateFees',
  templateUrl: './GenerateFees.component.html',
  styleUrls: ['./GenerateFees.component.scss'],
  standalone: false,
})
export class GenerateFeesComponent implements OnInit {
  constructor(private fws: FrameworkService) {}
  _loading: boolean = false;
  public request = new GetFeesGentrationRequest();
  public triggerTableAPI: boolean = false;
  public triggerSectionAPI: boolean = false;
  sectionrequest: ClassSectionRequest = new ClassSectionRequest();
  public datalist: StudentFeeGenerateStatusResponse[] = [];
  public tableSettings: ITableSettings = {
    showFotter: false,
    showPagination: true,
    jsonData: undefined,
    shorting: true,
    slno: true,
    profileImage: false,
    checkbox: true,
    checkboxcondition: { sysId: 'sysid', column: 'status', value: 'Not Generated' },
    columns: [
      {
        title: 'Name',
        data: 'studentName',
        short: true,
        width: 20,
      },
      {
        title: 'stdid',
        data: 'stdid',
        short: true,
        width: 20,
      },
      {
        title: 'class',
        data: 'className',
        short: true,
        width: 20,
      },
      {
        title: 'section',
        data: 'sectionName',
        short: true,
        width: 20,
      },
      {
        title: 'Hostel',
        data: 'hostel',
        short: true,
        width: 20,
      },
      {
        title: 'Acadamic Year',
        data: 'year',
        short: true,
        width: 20,
      },
      {
        title: 'Amount',
        data: 'debit',
        short: true,
        width: 20,
      },

      {
        title: 'Status',
        data: 'status',
        short: true,
        width: 20,
      },
    ],
    columnSticky: [0, 1, 2],
    headerSticky: true,
    filter: true,
  };
  ngOnInit() {}
  ngAfterViewInit() {
    if (this.fws.CSSE('filter')) {
      this.fws.loadFromSessionStorage('filter', this.request);
      this.sectionrequest.classFkid = this.request.classfkid;
      this.triggerSectionAPI = true;
      // this.triggerSectionAPI = true;
    }
  }
  onClassChange() {
    this.sectionrequest.classFkid = this.request.classfkid;
    this.triggerSectionAPI = true;
  }
  calltableapi() {
    this.fws.SSSV('filter', this.request);
    this.triggerTableAPI = true;
  }
}
