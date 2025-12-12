import { Component, ElementRef, OnInit, Renderer2 } from '@angular/core';
import { GlobalService } from 'src/app/Global/Service/global.service';
import { TCListResponse, UpdateTCRequest } from 'src/app/Modules/Staff/Department/IssueTC';
import { IapiUrldetails, ICommonFilterRequest } from 'src/app/Modules/Staff/Shared/CommonFilter';
import { FrameworkService } from 'src/app/Shared/framework/framework.service';
import { ITableSettings } from 'src/app/Shared/framework/table/table.model';
import { HODServiceService } from '../HODService.service';

@Component({
  selector: 'app-IssueTC',
  templateUrl: './IssueTC.component.html',
  styleUrls: ['./IssueTC.component.css'],
  standalone: false,
})
export class IssueTCComponent implements OnInit {
  public apidetails: IapiUrldetails = new IapiUrldetails();
  request: ICommonFilterRequest = new ICommonFilterRequest();
  triggercatch: boolean = false;
  triggerbutton: boolean = false;
  triggercatch1: boolean = false;
  tclist: TCListResponse[] = [];
  public tableSettings: ITableSettings = {
    showFotter: false,
    showPagination: true,
    jsonData: undefined,
    shorting: true,
    slno: true,
    profileImage: true,
    checkbox: false,
    class: 'TableTCClass',
    columns: [
      {
        title: 'Name',
        data: 'name',
        short: true,
        width: 20,
      },
      {
        title: 'Roll No',
        data: 'rollNo',
        short: true,
        width: 10,
      },
      {
        title: 'DOB',
        data: 'dob',
        short: true,
        width: 10,
        type: 'date',
      },

      {
        title: 'DepartmentName',
        data: 'departmentName',
        short: true,
        width: 20,
      },
      {
        title: 'Course Name',
        data: 'courseNameSD',
        short: true,
        width: 20,
      },
      {
        title: 'TC Received Date',
        data: 'semester',
        short: true,
        width: 10,
        render: (row: any) => this.rendertextbox(row, row.tcReceivedDate),
      },
    ],
    columnSticky: [0, 1, 2],
    headerSticky: true,
    filter: true,
  };
  updaterequest: UpdateTCRequest = new UpdateTCRequest();
  constructor(
    private globalService: GlobalService,
    private frameworkService: FrameworkService,
    private el: ElementRef,
    private renderer: Renderer2,
    private hodService: HODServiceService,
  ) {}

  ngOnInit() {
    this.apidetails.coursetypeapiUrl = '/Course/GetCourseType';
    this.apidetails.courseapiUrl = '/Staff/HODGetCourseNameByCourseTypeandBatch';
    this.apidetails.batchapiUrl = '/Staff/HODGetBatchByCourseType';
    this.apidetails.sectionapiUrl = '/Staff/HODGetSectionListByCourseTypeBatchandCourseCode';
    this.request.isActive = true;
  }

  onRespons(Response: any) {
    if (Response != null) {
      this.dateChangeEvent();
    }
  }
  ngAfterViewInit(): void {
    if (this.frameworkService.CSSE('filter')) {
      this.frameworkService.loadFromSessionStorage('filter', this.request);

      setTimeout(() => {
        this.triggercatch = true;
        this.triggercatch1 = true;
      }, 100);
      //this.dateChangeEvent();
    }
  }
  onSectionAPIResponse() {
    if (this.triggercatch1) {
      this.triggercatch1 = false;
      this.triggerbutton = true;
    }
  }
  rendertextbox(row: any, selected: string): string {
    // Create select element
    const txt = document.createElement('input');
    txt.className = 'tcdate';
    txt.id = 'text' + row.sysId;
    txt.setAttribute('data-Sysid', row.sysId.toString());
    txt.classList.add('form-control');
    txt.type = 'date';
    if (selected != null) {
      txt.value = this.ConvertDate(selected);
      txt.setAttribute('value', txt.value);
    }
    // select.value = selected;
    // Return the HTML string of the select element
    return txt.outerHTML;
  }
  ConvertDate(value: any): string {
    return this.globalService.formatDate(value);
  }
  dateChangeEvent() {
    const table = this.el.nativeElement.querySelector('.TableTCClass tbody');
    this.renderer.listen(table, 'change', (event) => {
      if (event.target && event.target.classList.contains('tcdate')) {
        const textboxvalue = event.target.value;
        const sysid = event.target.getAttribute('data-Sysid');
        this.updaterequest.sysId = parseInt(sysid, 10);
        this.updaterequest.tcDate = textboxvalue;
        const item = this.tclist.find((x) => x.sysId == sysid);
        if (item) {
          item.tcReceivedDate = textboxvalue; // new value
        }
        this.UpdateTCDate();
      }
    });
  }
  UpdateTCDate() {
    this.hodService.getUpdateDetails(this.updaterequest).subscribe({
      next: (Response) => {
        if (Response.data != null) {
        }
      },
    });
  }
}
