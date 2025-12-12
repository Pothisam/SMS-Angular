import { Component, ElementRef, OnInit, Renderer2 } from '@angular/core';
import {
  IAddBatchRequest,
  IBatchDetailsResponse,
  IBatchStatusRequest,
  ISemesterResponse,
  ISemesterupdateRequest,
} from 'src/app/Modules/CMS/Batch/batch';
import { ITableSettings } from 'src/app/Shared/framework/table/table.model';
import { ManagementService } from '../management.service';
import { GlobalService } from 'src/app/Global/Service/global.service';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'app-batch',
  templateUrl: './batch.component.html',
  styleUrls: ['./batch.component.css'],
  standalone: false,
})
export class BatchComponent implements OnInit {
  constructor(
    private managementService: ManagementService,
    private globalService: GlobalService,
    private renderer: Renderer2,
    private el: ElementRef,
  ) {
    this.getSemesterList();
  }
  batchList: IBatchDetailsResponse[] = [];
  semesterList: ISemesterResponse[] = [];
  public AddBatchRequest: IAddBatchRequest = {
    fromDate: '',
    toDate: '',
    courseType: '',
  };
  public resetRequest: IAddBatchRequest = {
    fromDate: '',
    toDate: '',
    courseType: '',
  };
  public semesterUpdateRequest: ISemesterupdateRequest = {
    sysid: 0,
    semester: '',
  };
  public batchStatusRequest: IBatchStatusRequest = {
    sysid: 0,
    status: '',
  };
  batch: string = '';
  onload: boolean = true;
  public tableSettings: ITableSettings = {
    showFotter: false,
    showPagination: true,
    jsonData: undefined,
    shorting: true,
    slno: true,
    checkbox: false,
    class: 'TableBatchClass',
    columns: [
      {
        title: 'Course Type',
        data: 'degreeType',
        short: true,
        width: 10,
      },
      {
        title: 'Batch',
        data: 'academicYear',
        short: true,
        width: 10,
      },
      {
        title: 'From Date',
        data: 'fromDate',
        short: true,
        width: 10,
        render: (row: any) => this.ConvertDate(row, 'fromDate'),
      },
      {
        title: 'To Date',
        data: 'toDate',
        short: true,
        width: 10,
        render: (row: any) => this.ConvertDate(row, 'toDate'),
      },
      {
        title: 'Semester',
        data: 'semester',
        short: true,
        width: 10,
        render: (row: any) => this.DropdownSemester(row, row.semester, this.semesterList),
      },
      {
        title: 'Batch Status',
        data: 'batchStatus',
        short: true,
        width: 10,
        render: (row: any) => this.DropdownBatchStatus(row, row.batchStatus),
      },
      {
        title: 'Action',
        data: 'Mat-Action',
        width: 20,
        buttongroup: [
          {
            button: true,
            buttondata: 'sysid',
            buttons: ['info', 'toggle', 'history'],
            click: ['history|CourseBatchlist|sysid|'],
            conditions: ['toggle|status|Active'],
            toggle: [
              'sysid|/Batch/UpdateBatchStatus|sysid|Change Status Note: This function is designed solely to display the batch name on the "Add Student" screen.',
            ],
          },
        ],
        buttonlabel: 'sysid',
      },
    ],
    columnSticky: [0, 1],
    headerSticky: true,
    filter: true,
  };
  ConvertDate(row: any, columnname: string): string {
    return this.globalService.formatDate(row[columnname]);
  }
  ngOnInit() {
    this.getBatchList();
  }
  getBatchList() {
    this.managementService.getbatchlist().subscribe({
      next: (Response) => {
        if (Response.data != null) {
          this.batchList = Response.data;
        }
      },
    });
  }
  getSemesterList() {
    this.managementService.getSemesterlist().subscribe({
      next: (Response) => {
        if (Response.data != null) {
          this.semesterList = Response.data;
        }
      },
    });
  }
  onCourseTypeChanges(options: { value: string; text: string }) {
    this.AddBatchRequest.courseType = options.value;
  }
  onRespons() {
    if (this.AddBatchRequest.fromDate != '' && this.AddBatchRequest.toDate != '') {
      const fromYear = new Date(this.AddBatchRequest.fromDate).getFullYear();
      const toYear = new Date(this.AddBatchRequest.toDate).getFullYear();

      this.batch = `${fromYear}-${toYear}`;
    }
  }
  DropdownSemester(row: any, selected: string, Semesar: ISemesterResponse[]): string {
    // Create select element
    const select = document.createElement('select');
    select.className = 'Semester';
    select.id = 'Drp' + row.sysid;
    select.setAttribute('data-Sysid', row.sysid.toString());
    select.classList.add('form-select');

    // Iterate over Semesar array and create option elements
    Semesar.forEach((sem) => {
      const option = document.createElement('option');
      option.textContent = sem.text; // Assuming 'name' is the text property in ISemesterResponse
      option.value = sem.value; // Assuming 'id' is the value property in ISemesterResponse

      if (selected === sem.value) {
        option.setAttribute('selected', selected);
      }

      // Append option to select element
      select.appendChild(option);
    });

    // select.value = selected;
    // Return the HTML string of the select element
    return select.outerHTML;
  }
  DropdownBatchStatus(data: any, selected: string): string {
    // Array of statuses
    const statusAr = ['Active', 'Completed'];

    // Create a select element
    const select = document.createElement('select');
    select.className = 'BatchStatus';
    select.id = 'DrpS' + data.sysid;
    select.setAttribute('data-Sysid', data.sysid.toString());
    select.classList.add('form-select');

    // Loop through StatusAr to create option elements
    statusAr.forEach((status) => {
      const option = document.createElement('option');
      option.textContent = status;
      option.value = status;

      // Mark the option as selected if it matches the selected value
      if (selected === status) {
        option.setAttribute('selected', 'selected');
      }

      // Append option to select element
      select.appendChild(option);
    });

    // Return the HTML string of the select element
    return select.outerHTML;
  }
  ngAfterViewInit() {
    // Use Renderer2 to attach a listener to the entire table's select elements
    this.SemesterChangeEvent();
    this.BatchStatusChangeEvent();
  }
  SemesterChangeEvent() {
    const table = this.el.nativeElement.querySelector('.TableBatchClass tbody');
    this.onload = false;
    // Check if the table exists before adding event listeners
    if (table) {
      this.renderer.listen(table, 'change', (event) => {
        // Only handle events from select elements with the "Semester" class
        if (event.target && event.target.classList.contains('Semester')) {
          const selectedSemester = event.target.value;
          const sysid = event.target.getAttribute('data-Sysid');

          this.semesterUpdateRequest.sysid = sysid;
          this.semesterUpdateRequest.semester = selectedSemester;
          const batchItem = this.batchList.find((item) => Number(item.sysid) === Number(sysid));
          if (batchItem) {
            // Update the found batch item's semester or any other property
            batchItem.semester = selectedSemester;
          }
          this.UpdateSemester();
        }
      });
    }
  }
  BatchStatusChangeEvent() {
    const table = this.el.nativeElement.querySelector('.TableBatchClass tbody');
    this.onload = false;
    // Check if the table exists before adding event listeners
    if (table) {
      this.renderer.listen(table, 'change', (event) => {
        // Only handle events from select elements with the "Semester" class
        if (event.target && event.target.classList.contains('BatchStatus')) {
          const status = event.target.value;
          const sysid = event.target.getAttribute('data-Sysid');

          this.batchStatusRequest.sysid = sysid;
          this.batchStatusRequest.status = status;
          const batchItem = this.batchList.find((item) => Number(item.sysid) === Number(sysid));
          if (batchItem) {
            // Update the found batch item's semester or any other property
            batchItem.batchStatus = status;
          }
          this.UpdateBatchStatus();
        }
      });
    }
  }
  UpdateSemester() {
    this.managementService.updateSemester(this.semesterUpdateRequest).subscribe({
      next: (Response) => {
        if (Response.data != null) {
        }
      },
    });
  }
  UpdateBatchStatus() {
    this.managementService.updateBatchStatus(this.batchStatusRequest).subscribe({
      next: (Response) => {
        if (Response.data != null) {
        }
      },
    });
  }
  ReloadForm() {
    this.AddBatchRequest = { ...this.resetRequest };
    this.batch = '';
    this.getBatchList();
  }
}
