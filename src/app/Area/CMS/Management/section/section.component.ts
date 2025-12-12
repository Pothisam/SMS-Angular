import { Component, OnInit } from '@angular/core';
import {
  ISectionRequest,
  ISectionResponse,
  ISectionRequestList,
} from 'src/app/Modules/CMS/section/Section';
import { ITableSettings } from 'src/app/Shared/framework/table/table.model';
import { ManagementService } from '../management.service';

@Component({
  selector: 'app-section',
  templateUrl: './section.component.html',
  styleUrls: ['./section.component.css'],
  standalone: false,
})
export class SectionComponent implements OnInit {
  departmentvalue: string = '';
  SelectOptionText: string = '';
  triggerApi: boolean = false;
  sectionList: ISectionResponse[] = [];
  public courserequest: ISectionRequest = {
    departmentCode: '',
  };
  public Listrequest: ISectionRequestList = {
    courseCode: '',
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
        width: 30,
      },
      {
        title: 'Course Name',
        data: 'courseNameBD',
        short: true,
        width: 20,
      },
      { title: 'Course Code', data: 'courseCode', short: true, width: 10 },
      { title: 'Section', data: 'section', short: true, width: 10 },
      {
        title: 'Action',
        data: 'Mat-Action',
        width: 20,
        buttongroup: [
          {
            button: true,
            buttondata: 'departmentCode',
            buttons: ['info', 'toggle'],
            conditions: ['toggle|status|Active'],
          },
        ],
        buttonlabel: 'departmentCode',
      },
    ],
    columnSticky: [0, 1],
    headerSticky: true,
    filter: false,
  };
  constructor(private managementService: ManagementService) {}

  ngOnInit() {}
  getSectionList() {
    this.managementService.getsectionlist(this.Listrequest).subscribe({
      next: (Response) => {
        if (Response.data != null) {
          this.sectionList = Response.data;
        }
      },
    });
  }
  onModelValueChanges(options: { value: string; text: string }) {
    // Handle the change event here
    this.SelectOptionText = options.value;
    this.courserequest.departmentCode = options.value;
    this.triggerApi = true;
  }
  oncourseNameChanges(options: { value: string; text: string }) {
    this.Listrequest.courseCode = options.value;
    this.getSectionList();
  }
  AfterSubmit() {
    this.getSectionList();
  }
}
