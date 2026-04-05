import { Component, inject, OnInit } from '@angular/core';

import { FeesService } from '../../Shared/fees.service';
import { ITableSettings } from 'src/app/Shared/framework/table/table.model';
import {
  GentrationConcessionRequest,
  GetConcessionGentrationRequest,
  StudentConcessionGenerateStatusResponse,
} from 'src/app/Modules/Fees/Managefees/FeesType';
import { ClassSectionRequest } from 'src/app/Modules/SMS/ClassSection/ClassSection.Request';
import { FrameworkService } from 'src/app/Shared/framework/framework.service';

@Component({
  selector: 'app-GentrateConcession',
  templateUrl: './GentrateConcession.component.html',
  styleUrls: ['./GentrateConcession.component.scss'],
  standalone: false,
})
export class GentrateConcessionComponent implements OnInit {
  ngOnInit() {}
  private readonly feesservice = inject(FeesService);
  private readonly fws = inject(FrameworkService);
  _loading: boolean = false;
  _loading2: boolean = false;
  public request = new GetConcessionGentrationRequest();
  public insertrequest = new GentrationConcessionRequest();
  public triggerTableAPI: boolean = false;
  public triggerSectionAPI: boolean = false;
  sectionrequest: ClassSectionRequest = new ClassSectionRequest();
  public datalist: StudentConcessionGenerateStatusResponse[] = [];
  public SelectedItems: number[] = [];
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
      { title: 'Name', data: 'studentName', short: true, width: 20 },
      { title: 'stdid', data: 'stdid', short: true, width: 20 },
      { title: 'class', data: 'className', short: true, width: 20 },
      { title: 'section', data: 'sectionName', short: true, width: 20 },
      { title: 'Hostel', data: 'hostel', short: true, width: 20 },
      { title: 'Acadamic Year', data: 'year', short: true, width: 20 },
      { title: 'Amount', data: 'amount', short: true, width: 20 },
      { title: 'Status', data: 'status', short: true, width: 20 },
    ],
    columnSticky: [0, 1, 2],
    headerSticky: true,
    filter: true,
  };

  ngAfterViewInit() {
    if (this.fws.CSSE('filter')) {
      this.fws.loadFromSessionStorage('filter', this.request);
      this.sectionrequest.classFkid = this.request.classfkid;
      this.triggerSectionAPI = true;
      this.SelectedItems = [];
    }
  }
  onClassChange() {
    this.sectionrequest.classFkid = this.request.classfkid;
    this.triggerSectionAPI = true;
  }
  calltableapi() {
    this.fws.SSSV('filter', this.request);
    this.triggerTableAPI = true;
    this.SelectedItems = [];
  }
  onSelectedItems(items: any[]) {
    this.SelectedItems = items.map((i) => i.sysid);
  }
  GentrateConcession() {
    this.insertrequest.studentdetailsfkid = this.SelectedItems;
    this.insertrequest.academicYearFkid = this.request.acadamicYear;
    this.insertrequest.feestypefkid = this.request.feestypefkid;
    this.insertrequest.sectionfkid = this.request.sectionfkid;
    this.feesservice.CreateConcession(this.insertrequest).subscribe({
      next: (Response) => {
        this.SelectedItems = [];
        this.triggerTableAPI = true;
        if (Response.data != null) {
        }
      },
    });
  }
}
