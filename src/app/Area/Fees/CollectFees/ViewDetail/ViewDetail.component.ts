import { Component, OnInit } from '@angular/core';
import {
  SessionClass,
  StudentFeescreditResponse,
  StudentFeesdebitResponse,
  StudentFeesTransactionAddRequest,
} from 'src/app/Modules/Fees/CollectFees/ViewDetails';
import { StudentDetailUpdateRequest } from 'src/app/Modules/SMS/Student/StudentRequest';
import { StudentMasterDetailsViewResponse } from 'src/app/Modules/SMS/Student/StudentResponse';
import { SessionService } from 'src/app/Shared/framework/Session.service';
import { FeesService } from '../../Shared/fees.service';
import { Router } from '@angular/router';
import { ITableSettings } from 'src/app/Shared/framework/table/table.model';

@Component({
  selector: 'app-ViewDetail',
  templateUrl: './ViewDetail.component.html',
  styleUrls: ['./ViewDetail.component.scss'],
  standalone: false,
})
export class ViewDetailComponent implements OnInit {
  request: StudentMasterDetailsViewResponse = new StudentMasterDetailsViewResponse();
  public loaddata: boolean = false;
  public loading: boolean = false;
  public session: SessionClass = new SessionClass();
  public debitlist: StudentFeesdebitResponse[] = [];
  public creditlist: StudentFeescreditResponse[] = [];
  public tabledebit: ITableSettings = {
    showFotter: false,
    showPagination: false,
    jsonData: undefined,
    shorting: true,
    slno: false,
    profileImage: false,
    checkbox: false,
    columns: [
      {
        title: 'Entry Date',
        data: 'entryDate',
        short: true,
        width: 20,
        type: 'datetime',
      },
      {
        title: 'Description',
        data: 'description',
        short: true,
        width: 20,
      },
      {
        title: 'Debit',
        data: 'debit',
        short: true,
        width: 20,
        type: 'decimal',
        class: 'text-end',
      },
    ],

    columnSticky: [0, 1, 2],
    headerSticky: true,
    filter: false,
    rowCallback: [
      {
        columnname: 'status',
        value: 'Deleted',
        class: 'text-decoration-line-through  text-danger',
      },
      {
        columnname: 'status',
        value: 'Rejected',
        class: 'text-decoration-line-through  text-danger',
      },
    ],
  };
  public tablecredit: ITableSettings = {
    showFotter: false,
    showPagination: false,
    jsonData: undefined,
    shorting: true,
    slno: false,
    profileImage: false,
    checkbox: false,
    columns: [
      {
        title: 'Entry Date',
        data: 'entryDate',
        short: true,
        width: 20,
        type: 'datetime',
      },
      {
        title: 'Description',
        data: 'description',
        short: true,
        width: 20,
      },
      {
        title: 'Credit',
        data: 'credit',
        short: true,
        width: 20,
        type: 'decimal',
        class: 'text-end',
      },
    ],
    columnSticky: [0, 1, 2],
    headerSticky: true,
    filter: false,
  };
  public debit: number = 0;
  public credit: number = 0;
  public dueAmount: number = this.debit - this.credit;
  public AddRequest: StudentFeesTransactionAddRequest = new StudentFeesTransactionAddRequest();
  constructor(
    private SS: SessionService,
    private feesService: FeesService,
    private router: Router,
  ) {}

  ngOnInit() {
    this.session = this.SS.viewfeesSignal();
    if (this.session.sysId) {
      this.GetStudentDetails();
      this.GetDebitDetails();
      this.GetCreditDetails();
      this.dueAmount = this.debit - this.credit;
    } else {
      this.router.navigate(['Fees/ViewFees']);
    }
  }
  GetStudentDetails() {
    this.feesService.GetStudentdetails(this.session).subscribe(
      (response: any) => {
        if (response && response.status === 200) {
          this.request = response.data;
        } else {
          // Handle error case
        }
      },
      (error) => {
        // Handle HTTP error
      },
    );
  }
  GetDebitDetails() {
    this.feesService.GetDebitDetails(this.session).subscribe(
      (response: any) => {
        if (response && response.status === 200) {
          this.debitlist = response.data.r1;
          this.debit = response.data.r2;
          this.dueAmount = this.debit - this.credit;
        } else {
          // Handle error case
        }
      },
      (error) => {
        // Handle HTTP error
      },
    );
  }
  GetCreditDetails() {
    this.feesService.GetCreditDetails(this.session).subscribe(
      (response: any) => {
        if (response && response.status === 200) {
          this.creditlist = response.data.r1;
          this.credit = response.data.r2;
          this.dueAmount = this.debit - this.credit;
        } else {
          // Handle error case
        }
      },
      (error) => {
        // Handle HTTP error
      },
    );
  }
  SaveFees() {
    this.loading = true;
    this.AddRequest.studentFkid = this.session.sysId;
    this.AddRequest.studentClassDetailsFkid = this.session.studentClassDetailsFkid;
    if (this.AddRequest.paymentMode === 'Cash') {
      this.AddRequest.bankName = '';
      this.AddRequest.chequeDate = '';
      this.AddRequest.chequeNo = '';
    }
    this.feesService.AddFees(this.AddRequest).subscribe({
      next: (response: any) => {
        if (response && response.status === 200) {
          this.GetDebitDetails();
          this.GetCreditDetails();
          this.AddRequest = new StudentFeesTransactionAddRequest();
          this.loading = false;
        } else {
          // Handle error case
          this.loading = false;
        }
      },
      error: (error) => {
        this.loading = false;
      },
    });
  }
}
