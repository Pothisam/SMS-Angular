import { Component, OnInit } from '@angular/core';
import { ITableSettings } from 'src/app/Shared/framework/table/table.model';
import { ManagementService } from '../management.service';
import { ICourseResponse, IAddCourseRequest } from 'src/app/Modules/CMS/course/course';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.css'],
  standalone: false,
})
export class CourseComponent implements OnInit {
  courseList: ICourseResponse[] = [];
  constructor(private managementService: ManagementService) {}
  public request: IAddCourseRequest = {
    courseNameSD: '',
    courseNameBD: '',
    courseYearSD: '',
    courseYearBD: '',
    departmentName: '',
    departmentCode: '',
    courseType: '',
    courseTypeBD: '',
  };
  public reset: IAddCourseRequest = {
    courseNameSD: '',
    courseNameBD: '',
    courseYearSD: '',
    courseYearBD: '',
    departmentName: '',
    departmentCode: '',
    courseType: '',
    courseTypeBD: '',
  };
  public tableSettings: ITableSettings = {
    showFotter: false,
    showPagination: true,
    jsonData: undefined,
    shorting: true,
    slno: true,
    checkbox: false,
    columns: [
      {
        title: 'Department Name',
        data: 'departmentName',
        short: true,
        width: 20,
      },
      {
        title: 'Course Name SD',
        data: 'courseNameSD',
        short: true,
        width: 20,
      },
      { title: 'Course Name BD', data: 'courseNameBD', short: true, width: 30 },
      { title: 'Course Code', data: 'courseCode', short: true, width: 10 },
      { title: 'Course Type', data: 'courseType', short: true, width: 10 },
      {
        title: 'Course Duration',
        data: 'courseDurationBD',
        short: true,
        width: 10,
      },
      {
        title: 'Action',
        data: 'Mat-Action',
        width: 20,
        buttongroup: [
          {
            button: true,
            buttondata: 'departmentCode',
            buttons: ['delete', 'info'],
            conditions: ['delete|status|Active'],
            click: [
              'delete|sysid|courseNameBD|/Course/DeleteCourse|sysId|Are sure you want to Delete Course: <span class="text-danger">{{0}}</span>|Note: Deleting Course Affect Section and Student Details|true',
            ],
          },
        ],
        buttonlabel: 'departmentCode',
      },
    ],
    columnSticky: [0, 1],
    headerSticky: true,
    filter: true,
  };
  ngOnInit() {
    this.getCourseList();
  }
  getCourseList() {
    this.managementService.getcourselist().subscribe({
      next: (Response) => {
        if (Response.data != null) {
          this.courseList = Response.data;
        }
      },
    });
  }
  onDurationofCourseChanges(options: { value: string; text: string }) {
    this.request.courseYearSD = options.value;
    this.request.courseYearBD = options.text;
  }
  onDepartmentNameChanges(options: { value: string; text: string }) {
    this.request.departmentCode = options.value;
    this.request.departmentName = options.text;
  }
  onCourseTypeChanges(options: { value: string; text: string }) {
    this.request.courseTypeBD = options.value;
    this.request.courseType = options.text;
  }
  ClearFormAndReload() {
    this.request = { ...this.reset };
    this.getCourseList();
  }
}
