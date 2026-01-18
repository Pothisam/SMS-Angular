import { Component, OnInit } from '@angular/core';
import { StudentTransferRequest } from 'src/app/Modules/SMS/Report/ReportRequest';
import { StudentTransferResponse } from 'src/app/Modules/SMS/Report/ReportResponse';
import { ITableSettings } from 'src/app/Shared/framework/table/table.model';
import { StudentService } from '../../Student/student.service';
import {
  AddStudentClassDetailRequest,
  StudentDetailUpdateRequest,
} from 'src/app/Modules/SMS/Student/StudentRequest';
import { FrameworkService } from 'src/app/Shared/framework/framework.service';

@Component({
  selector: 'app-TransferStudent',
  templateUrl: './TransferStudent.component.html',
  styleUrls: ['./TransferStudent.component.scss'],
  standalone: false,
})
export class TransferStudentComponent implements OnInit {
  public triggertableapi: boolean = false;
  public request: StudentTransferRequest = new StudentTransferRequest();
  public updaterequest: AddStudentClassDetailRequest = new AddStudentClassDetailRequest();
  public gridlist: StudentTransferResponse[] = [];
  public SelectedItems: number[] = [];
  public tableSettings: ITableSettings = {
    showFotter: false,
    showPagination: true,
    jsonData: undefined,
    shorting: true,
    slno: true,
    profileImage: true,
    checkbox: true,
    checkboxcondition: { sysId: 'studentId', column: 'alreadyExisting', value: 0 },
    columns: [
      {
        title: 'Student Name',
        data: 'studentName',
        short: true,
        width: 20,
      },
      {
        title: 'DOB',
        data: 'dob',
        short: true,
        width: 20,
        type: 'date',
      },

      { title: 'Academic Year From', data: 'fromAcademicYear', short: true, width: 10 },
      { title: 'Class From', data: 'fromClassName', short: true, width: 10 },
      { title: 'Section From', data: 'fromSectionName', short: true, width: 10 },
      { title: 'Academic Year To', data: 'toAcademicYear', short: true, width: 10 },
      { title: 'Existing Class', data: 'existingClassName', short: true, width: 10 },
      { title: 'Existing Section', data: 'existingSectionName', short: true, width: 10 },
    ],
    columnSticky: [0, 1, 2],
    headerSticky: true,
    filter: true,
  };
  public _loading: boolean = false;
  constructor(
    private studentService: StudentService,
    private fws: FrameworkService,
  ) {}

  ngOnInit() {}
  ngAfterViewInit() {
    if (this.fws.CSSE('filter')) {
      this.fws.loadFromSessionStorage('filter', this.request);

      this.SelectedItems = [];
      this.triggertableapi = true;
    }
  }
  calltableapi() {
    this.fws.SSSV('filter', this.request);
    this.SelectedItems = [];
    this.triggertableapi = true;
  }
  updateapi() {
    this.updaterequest.studentDetailsFkid = this.SelectedItems;
    this.updaterequest.academicYearFkid = this.request.academicYearTo;
    this.updaterequest.classSectionFkid = this.request.classSectionTo;
    this.studentService.TranferStudent(this.updaterequest).subscribe((res) => {
      console.log(res);
    });
  }
  onSelectedItems(items: any[]) {
    console.log('From child:', items);
    this.SelectedItems = items.map((i) => i.studentId);
  }
}
