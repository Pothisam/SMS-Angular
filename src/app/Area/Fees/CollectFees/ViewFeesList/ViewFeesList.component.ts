import { Component, OnInit } from '@angular/core';
import { CommonAutocompleteRequest } from 'src/app/Global/Interface/common-interface';
import {
  SessionClass,
  StudentFeesTransactionByNameRequest,
  StudentFeesTransactionRequest,
  StudentFeesTransactionResponse,
} from 'src/app/Modules/Fees/CollectFees/ViewDetails';
import { ClassSectionRequest } from 'src/app/Modules/SMS/ClassSection/ClassSection.Request';
import { ITableSettings } from 'src/app/Shared/framework/table/table.model';
import { FeesService } from '../../Shared/fees.service';
import { FrameworkService } from 'src/app/Shared/framework/framework.service';
import { SessionService } from 'src/app/Shared/framework/Session.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ViewFeesList',
  templateUrl: './ViewFeesList.component.html',
  styleUrls: ['./ViewFeesList.component.scss'],
  standalone: false,
})
export class ViewFeesListComponent implements OnInit {
  public tableSettings: ITableSettings = {
    showFotter: true,
    showPagination: false,
    jsonData: undefined,
    shorting: true,
    slno: true,
    profileImage: true,
    checkbox: false,
    columns: [
      {
        title: 'Roll No',
        data: 'rollno',
        short: true,
        width: 20,
      },
      {
        title: 'Stdid',
        data: 'stdid',
        short: true,
        width: 20,
      },
      {
        title: 'Name',
        data: 'name',
        short: true,
        width: 20,
      },
      {
        title: 'Class and Section',
        data: 'className',
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
        title: 'Debit',
        data: 'debit',
        short: true,
        width: 20,
        type: 'decimal',
        class: 'text-end',
        footergroup: [{ sumfunction: true }],
      },
      {
        title: 'Credit',
        data: 'credit',
        short: true,
        width: 20,
        type: 'decimal',
        class: 'text-end',
        footergroup: [{ sumfunction: true }],
      },
      {
        title: 'Balance',
        data: 'balance',
        short: true,
        width: 20,
        type: 'decimal',
        class: 'text-end',
        footergroup: [{ sumfunction: true }],
      },

      {
        title: 'Action',
        data: 'Mat-Action',
        width: 20,
        buttongroup: [
          {
            button: true,
            buttondata: 'sysId',
            buttons: ['edit'],
          },
        ],
        buttonlabel: 'sysId',
      },
    ],
    columnSticky: [0, 1, 2],
    headerSticky: true,
    filter: false,
  };
  public triggerSectionAPI: boolean = false;
  public request: StudentFeesTransactionRequest = new StudentFeesTransactionRequest();
  public namerequest: StudentFeesTransactionByNameRequest =
    new StudentFeesTransactionByNameRequest();
  public namerequestp: CommonAutocompleteRequest = new CommonAutocompleteRequest({
    tableName: 'StudentDetails',
    columnName: 'NameRollNoAadharstdid',
    searchParam: '',
  });
  public list: StudentFeesTransactionResponse[] = [];
  public session: SessionClass = new SessionClass();
  sectionrequest: ClassSectionRequest = new ClassSectionRequest();
  loadedSection: number = 0;
  triggerbutton: boolean = false;
  constructor(
    private feesService: FeesService,
    private fws: FrameworkService,
    private SS: SessionService,
    private router: Router,
  ) {}
  onRespons(Response: any) {
    if (Response != null) {
      this.list = Response;
      this.namerequest.studentName = '';
      this.loadedSection = this.request.section;
      this.fws.SSSV('filter', this.request);
      this.fws.SSRI('filter2');
    }
  }
  ngOnInit() {}
  onClassChange() {
    this.sectionrequest.classFkid = this.request.class;
    this.triggerSectionAPI = true;
  }
  onNameChange() {
    this.feesService.GetCollectionFees(this.namerequest).subscribe(
      (res) => {
        this.list = res.data;
        this.fws.SSRI('filter');
        this.fws.SSSV('filter2', this.namerequest);
      },
      (err) => {},
    );
  }
  ngAfterViewInit() {
    if (this.fws.CSSE('filter')) {
      this.fws.loadFromSessionStorage('filter', this.request);
      this.sectionrequest.classFkid = this.request.class;
      this.triggerSectionAPI = true;
      this.triggerbutton = true;
    }
    if (this.fws.CSSE('filter2')) {
      this.fws.loadFromSessionStorage('filter2', this.namerequest);
      this.onNameChange();
    }
  }
  onEditClick(value: any): void {
    const data = this.list.find((x) => x.sysId === value);
    this.SS.viewfeesSignal.set({
      sysId: value,
      batch: data?.acadamicYear ?? 0,
      studentClassDetailsFkid: data?.classSectionSysId ?? 0,
    });

    this.router.navigate(['Fees/ViewDetails']);
  }
}
