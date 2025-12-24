// #region Import

import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FrameworkService } from 'src/app/Shared/framework/framework.service';
import { SessionService } from 'src/app/Shared/framework/Session.service';
import { ITableSettings } from 'src/app/Shared/framework/table/table.model';
import { StaffService } from '../staff.service';
import {
  IStaffAutocompleteRequest,
  StaffCountResponse,
  StaffDetailSearchResponse,
  StaffSearch,
  StaffSearchRequest,
} from 'src/app/Modules/SMS/Staff/StaffRequest';

// #endregion

@Component({
  selector: 'app-ViewStaffList',
  templateUrl: './ViewStaffList.component.html',
  styleUrls: ['./ViewStaffList.component.scss'],
  standalone: false,
})
export class ViewStaffListComponent implements OnInit {
  // #region parameter declaration
  editid: number = 0;
  stafflist: StaffDetailSearchResponse[] = [];
  public staffsearch: StaffSearchRequest = new StaffSearchRequest();
  public staffcount: StaffCountResponse = new StaffCountResponse();
  public request: StaffSearch = new StaffSearch();
  public nameRequest: IStaffAutocompleteRequest = {
    tableName: 'StaffDetails',
    columnName: 'Name',
    searchParam: '',
  };
  // #endregion
  tiggertable: boolean = false;
  constructor(
    private staffService: StaffService,
    private frameworkService: FrameworkService,
    private SS: SessionService,
    private router: Router,
    private cdr: ChangeDetectorRef,
  ) {}
  public tableSettings: ITableSettings = {
    showFotter: false,
    showPagination: true,
    jsonData: undefined,
    shorting: true,
    slno: true,
    profileImage: true,
    checkbox: false,
    columns: [
      {
        title: 'Name',
        data: 'name',
        short: true,
        width: 20,
      },
      { title: 'Designation', data: 'designation', short: true, width: 20 },
      { title: 'Mobile No', data: 'mobileNo', short: true, width: 10 },
      { title: 'Staff Type', data: 'staffType', short: true, width: 10 },
      {
        title: 'Action',
        data: 'Mat-Action',
        width: 20,
        buttongroup: [
          {
            button: true,
            buttondata: 'sysId',
            buttons: ['info', 'history', 'edit'],
            click: ['history|StaffDetails|sysId'],
          },
        ],
        buttonlabel: 'sysId',
      },
    ],
    columnSticky: [0, 1, 2],
    headerSticky: true,
    filter: true,
  };

  // #region on load
  ngOnInit() {
    this.GetStaffCount();
    if (this.frameworkService.CSSE('filter')) {
      this.frameworkService.loadFromSessionStorage('filter', this.staffsearch);

      const mapping: { [key: string]: keyof StaffSearch } = {
        Name: 'name',
        Designation: 'designation',
      };

      if (this.staffsearch.columnName in mapping) {
        this.request[mapping[this.staffsearch.columnName]] = this.staffsearch.searchParam;
      }
    }
    this.tiggertable = true;
  }
  GetStaffCount() {
    this.staffService.getStaffCount().subscribe({
      next: (Response) => {
        if (Response.data != null) {
          this.staffcount = Response.data;
        }
      },
    });
  }

  // #endregion
  // #region form Change event
  onFieldChange(
    fieldName: keyof typeof this.request,
    columnName: string,
    options: { value: string; text: string },
  ) {
    this.clearrequest();
    this.request[fieldName] = options.value;
    this.staffsearch.columnName = columnName;
    this.staffsearch.searchParam = options.value;
    if ((columnName == 'Name' && this.staffsearch.searchParam.length > 3) || columnName != 'Name') {
      this.tiggertable = true;
    }
    this.frameworkService.SSSV('filter', this.staffsearch);
  }

  onDesignationhanges(options: { value: string; text: string }) {
    this.onFieldChange('designation', 'Designation', options);
  }
  onNameChange() {
    if (this.request.name.length > 0) {
      const options = { value: this.request.name, text: '' }; // Properly construct the options object
      this.onFieldChange('name', 'Name', options);
    }
  }
  clearrequest() {
    this.request.designation = '';
    this.request.name = '';
  }
  // #endregion
  onChipClick(columnName: string, searchParam: string) {
    this.clearrequest();
    this.staffsearch.columnName = columnName;
    this.staffsearch.searchParam = searchParam;
    this.frameworkService.SSSV('filter', this.staffsearch);
    this.tiggertable = true;
  }
  onEditClick(value: any): void {
    this.editid = value;
    this.SS.setStaffEditId(value);
    this.router.navigate(['SMS/ViewStaff']);
  }
  ngAfterViewInit() {
    this.cdr.detectChanges(); // Notify Angular of the change
    //this.DownloadDocument();
  }
}
