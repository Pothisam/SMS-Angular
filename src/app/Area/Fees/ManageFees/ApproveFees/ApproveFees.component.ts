import { Component, OnInit } from '@angular/core';
import {
  GetFeesGenerationRequest,
  StudentFeeGenerateRequest,
  StudentFeeGenerateStatusResponse,
  UpdateFeesApproveRequest,
} from 'src/app/Modules/Fees/Managefees/ApproveFees';
import { FeesService } from 'src/app/Area/Fees/Shared/fees.service';
import { ITableSettings } from 'src/app/Shared/framework/table/table.model';

@Component({
  selector: 'app-ApproveFees',
  templateUrl: './ApproveFees.component.html',
  styleUrls: ['./ApproveFees.component.scss'],
  standalone: false,
})
export class ApproveFeesComponent implements OnInit {
  public triggerTableAPI: boolean = true;
  public StudentFeeGenerationList: StudentFeeGenerateRequest[] = [];
  public selectedfeesobject: StudentFeeGenerateRequest = new StudentFeeGenerateRequest();
  public tableSettings: ITableSettings = {
    showFotter: false,
    showPagination: true,
    jsonData: undefined,
    shorting: true,
    slno: true,
    profileImage: false,
    checkbox: false,
    columns: [
      {
        title: 'Class',
        data: 'courseName',
        short: true,
        width: 20,
      },
      {
        title: 'Section',
        data: 'section',
        short: true,
        width: 20,
      },
      {
        title: 'Acadamic Year',
        data: 'acadamicYear',
        short: true,
        width: 20,
      },
      {
        title: 'Description',
        data: 'description',
        short: true,
        width: 20,
      },
      {
        title: 'Generate Date',
        data: 'generateDate',
        short: true,
        width: 20,
        type: 'date',
      },
      {
        title: 'Amount',
        data: 'debit',
        short: true,
        width: 20,
      },
      {
        title: 'Action',
        data: 'Mat-Action',
        width: 20,
        buttongroup: [
          {
            button: true,
            buttondata: 'sysid',
            buttons: ['edit'],
          },
        ],
        buttonlabel: 'sysid',
      },
    ],
    columnSticky: [0, 1, 2],
    headerSticky: true,
    filter: false,
  };
  public tableSettings2: ITableSettings = {
    showFotter: false,
    showPagination: true,
    jsonData: undefined,
    shorting: true,
    slno: true,
    profileImage: false,
    checkbox: true,
    columns: [
      {
        title: 'Name',
        data: 'name',
        short: true,
        width: 20,
      },
      {
        title: 'Student ID',
        data: 'stdId',
        short: true,
        width: 20,
      },
      {
        title: 'Acadamic Year',
        data: 'acadamicYear',
        short: true,
        width: 20,
      },
      {
        title: 'Description',
        data: 'description',
        short: true,
        width: 20,
      },
      {
        title: 'Generate Date',
        data: 'generateDate',
        short: true,
        width: 20,
        type: 'date',
      },
      {
        title: 'Amount',
        data: 'debit',
        short: true,
        width: 20,
      },
    ],
    columnSticky: [0, 1, 2],
    headerSticky: true,
    filter: false,
  };
  public UpdateFeesApproveRequest: UpdateFeesApproveRequest = new UpdateFeesApproveRequest();
  public table2request: GetFeesGenerationRequest = new GetFeesGenerationRequest();
  public triggerTable2API: boolean = false;
  public table2Data: StudentFeeGenerateStatusResponse[] = [];
  public SelectedItems: number[] = [];
  constructor(private feesService: FeesService) {}

  ngOnInit() {}
  onRespons(Response: any) {
    if (Response != null) {
      this.StudentFeeGenerationList = Response;
    }
  }
  onRespons2(Response: any) {
    if (Response != null) {
      this.table2Data = Response;
      this.SelectedItems = [];
    }
    if (this.table2Data.length === 0) {
      this.SelectedItems = [];
      this.selectedfeesobject = new StudentFeeGenerateRequest();
    }
  }
  onEditClick(value: any): void {
    if (value === null || value === undefined) return;
    const sysid = value;
    const found = this.StudentFeeGenerationList.find((x) => (x as any).sysid == sysid);
    if (found) {
      this.selectedfeesobject = found;
    } else {
      this.selectedfeesobject = this.selectedfeesobject || new StudentFeeGenerateRequest();
      (this.selectedfeesobject as any).sysid = sysid;
    }
    this.table2request.academicYearSysId = this.selectedfeesobject.acadamicyearFkid;
    this.table2request.classSectionId = this.selectedfeesobject.studentClassDetailsFkid;
    this.table2request.feesTypeFkid = this.selectedfeesobject.feesTypeFkid;
    this.table2request.gDate = this.selectedfeesobject.generateDate;
    this.triggerTable2API = true;
  }
  onSelectedItems(items: any[]) {
    this.SelectedItems = items.map((i) => i.sysId);
  }

  approveSelected() {
    if (!this.SelectedItems || this.SelectedItems.length === 0) return;
    const req = new UpdateFeesApproveRequest({
      studentdetailsfkid: this.SelectedItems,
      approved: true,
    });
    this.feesService.ApporveFees(req).subscribe(
      (res) => {
        this.SelectedItems = [];
        this.triggerTable2API = true;
        this.triggerTableAPI = true;
        //this.triggerTableAPI = true;
      },
      (err) => {
        this.triggerTable2API = true;
        this.triggerTableAPI = true;
      },
    );
  }

  rejectSelected() {
    if (!this.SelectedItems || this.SelectedItems.length === 0) return;
    const req = new UpdateFeesApproveRequest({
      studentdetailsfkid: this.SelectedItems,
      approved: false,
    });
    this.feesService.ApporveFees(req).subscribe(
      (res) => {
        this.SelectedItems = [];
        this.triggerTable2API = true;
        this.triggerTableAPI = true;
      },
      (err) => {
        this.triggerTable2API = true;
      },
    );
  }
}
