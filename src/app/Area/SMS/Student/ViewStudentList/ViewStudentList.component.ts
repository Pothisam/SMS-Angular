// #region import
import { Component, OnInit } from '@angular/core';
import { ITableSettings } from 'src/app/Shared/framework/table/table.model';
import { GlobalService } from 'src/app/Global/Service/global.service';
import { CommonAutocompleteRequest } from 'src/app/Global/Interface/common-interface';
import { FrameworkService } from 'src/app/Shared/framework/framework.service';
import { SessionService } from 'src/app/Shared/framework/Session.service';
import { Router } from '@angular/router';
import { StudentService } from '../student.service';
import {
  StudentSearchRequest,
  StudentShortRequest,
} from 'src/app/Modules/SMS/Student/StudentRequest';
import {
  StudentCountResponse,
  StudentDetailsShortResponse,
} from 'src/app/Modules/SMS/Student/StudentResponse';
// #endregion

@Component({
  selector: 'app-ViewStudentList',
  templateUrl: './ViewStudentList.component.html',
  styleUrls: ['./ViewStudentList.component.css'],
  standalone: false,
})
export class ViewStudentListComponent implements OnInit {
  // #region booleans (1)
  public triggerbatchApi: boolean = false;
  // #endregion

  // #region numbers (2)
  public editid: number = 0;
  // #endregion

  // #region objects (3)
  public NameRollNoAadharrequest: CommonAutocompleteRequest = new CommonAutocompleteRequest({
    tableName: 'StudentDetails',
    columnName: 'NameRollNoAadhar',
    searchParam: '',
  });
  public searchrequest: StudentShortRequest = new StudentShortRequest();
  public studentSearchRequest: StudentSearchRequest = new StudentSearchRequest({
    columnName: 'AutoComplete',
    searchParam: '',
  });
  public studentcount: StudentCountResponse = new StudentCountResponse();
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
      {
        title: 'Class',
        data: 'courseSection',
        short: true,
        width: 20,
      },

      { title: 'Academic Year', data: 'acadamicYear', short: true, width: 10 },
      { title: 'Roll No', data: 'rollNo', short: true, width: 10 },
      {
        title: 'DOB',
        data: 'dob',
        short: true,
        width: 15,
        render: (row: any) => this.ConvertDate(row, 'dob'),
      },
      {
        title: 'Action',
        data: 'Mat-Action',
        width: 20,
        buttongroup: [
          {
            button: true,
            buttondata: 'sysId',
            buttons: ['info', 'history', 'edit'],
            click: ['history|StudentDetails|sysId'],
          },
        ],
        buttonlabel: 'sysId',
      },
    ],
    columnSticky: [0, 1, 2],
    headerSticky: true,
    filter: true,
  };
  // #endregion

  // #region strings (4)
  public autocomplete: string = '';
  // #endregion

  // #region arrays (5)
  public studentlist: StudentDetailsShortResponse[] = [];
  // #endregion

  // #region objects (6)
  public _loading: boolean = false;
  // #endregion

  constructor(
    private studentService: StudentService,
    private globalService: GlobalService,
    private fws: FrameworkService,
    private SS: SessionService,
    private router: Router,
  ) {}

  ngOnInit() {
    this.GetStaffCount();
    if (!this.fws.CSSE('filter') && !this.fws.CSSE('filter2')) {
      this.GetStaffList();
    }
  }

  // #region functions
  ngAfterViewInit() {
    if (this.fws.CSSE('filter')) {
      this.fws.loadFromSessionStorage('filter', this.searchrequest);

      if (this.searchrequest.courseSysid !== null) {
        this.triggerbatchApi = true;
      }
      this.GetStaffList();
    }
    if (this.fws.CSSE('filter2')) {
      this.fws.loadFromSessionStorage('filter2', this.studentSearchRequest);
      this.GetStaffListByAutoComplete();
    }
  }
  ConvertDate(row: any, columnname: string): string {
    return this.globalService.formatDate(row[columnname]);
  }
  GetStaffCount() {
    this.studentService.getStudentCount().subscribe({
      next: (Response) => {
        if (Response.data != null) {
          this.studentcount = Response.data;
        }
      },
    });
  }
  onChipClick(columnName: string, searchParam: string) {
    this.clearrequest();
    this.studentSearchRequest.columnName = columnName;
    this.studentSearchRequest.searchParam = searchParam;
    this.fws.SSSV('filter2', this.studentSearchRequest);
    this.fws.SSRI('filter');
    this.GetStaffListByAutoComplete();
  }
  async GetStaffList(): Promise<void> {
    this._loading = true;
    this.fws.SSSV('filter', this.searchrequest);
    this.fws.SSRI('filter2');
    this.autocomplete = '';
    this.studentService.getStudentList(this.searchrequest).subscribe({
      next: (Response) => {
        this.studentlist = Response.data;
      },
    });
    this._loading = false;
  }
  clearrequest() {
    this.searchrequest.courseSysid = '';
  }
  onNameChange() {
    this.studentSearchRequest.columnName = 'AutoComplete';
    this.studentSearchRequest.searchParam = this.autocomplete;
    if (this.studentSearchRequest.searchParam.length > 4) {
      this.GetStaffListByAutoComplete();
      this.clearrequest();
    }
  }
  GetStaffListByAutoComplete() {
    this.studentService.getStudentAC(this.studentSearchRequest).subscribe({
      next: (Response) => {
        this.studentlist = Response.data;
      },
    });
  }
  onEditClick(value: any): void {
    this.editid = value;
    this.SS.setStudentEditId(value);
    this.router.navigate(['SMS/ViewStudent']);
  }
  // #endregion
}
