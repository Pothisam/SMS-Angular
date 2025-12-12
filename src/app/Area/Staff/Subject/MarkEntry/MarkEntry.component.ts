import {
  Component,
  Directive,
  ElementRef,
  HostListener,
  OnInit,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { MatTooltipModule } from '@angular/material/tooltip';
import { IapiUrldetails, ICommonFilterRequest } from 'src/app/Modules/Staff/Shared/CommonFilter';
import {
  GetStudentMarkDetailsRequest,
  StudentMark,
  StudentMarkUpdate,
} from 'src/app/Modules/Staff/Subject/AddStudentMark';
import { SubjectDetailsResponse } from 'src/app/Modules/Staff/Subject/AddSubject';
import { FrameworkService } from 'src/app/Shared/framework/framework.service';
import { ITableSettings } from 'src/app/Shared/framework/table/table.model';
import { CanComponentDeactivate } from 'src/app/Shared/guard/UnsavedChangesGuard';

@Component({
  selector: 'app-MarkEntry',
  templateUrl: './MarkEntry.component.html',
  styleUrls: ['./MarkEntry.component.css'],
  standalone: false,
})
export class MarkEntryComponent implements OnInit, CanComponentDeactivate {
  public apidetails: IapiUrldetails = new IapiUrldetails();
  public filterparameter: ICommonFilterRequest = new ICommonFilterRequest();
  public request: GetStudentMarkDetailsRequest = new GetStudentMarkDetailsRequest();
  public subjectdetails: SubjectDetailsResponse[] = [];
  public StudentMark: StudentMark[] = [];
  private baseline = new Map<number, number>();
  public updatedrecord: StudentMarkUpdate[] = [];

  public subjectcode: string = '';
  public subjectcredit: string = '';
  public subjecttype: string = '';
  public marginMark: string = '';
  public triggersubjectAPI: boolean = false;
  public triggerviewbutton: boolean = false;
  triggercatch: boolean = false;
  constructor(private FS: FrameworkService, private renderer: Renderer2, private el: ElementRef) {
    this.apidetails.coursetypeapiUrl = '/Course/GetCourseType';
    this.apidetails.batchapiUrl = '/Staff/GetEligibleBatchByCourseType';
    this.apidetails.courseapiUrl = '/Staff/GetEligibleCourseNameByCourseTypeandBatch';
    this.apidetails.sectionapiUrl = '/Staff/GetEligibleSectionListByCourseTypeBatchandCourseCode';
    this.filterparameter.isActive = true;
  }
  public tableSettings: ITableSettings = {
    showFotter: false,
    showPagination: true,
    jsonData: undefined,
    shorting: true,
    slno: true,
    profileImage: true,
    checkbox: false,
    class: 'TableStudentMarkClass',
    columns: [
      {
        title: 'Roll No',
        data: 'rollNo',
        short: true,
        width: 10,
      },
      {
        title: 'Name',
        data: 'name',
        short: true,
        width: 15,
      },
      {
        title: 'Batch',
        data: 'batch',
        short: true,
        width: 10,
      },
      {
        title: 'section',
        data: 'section',
        short: true,
        width: 5,
      },
      {
        title: 'Semester',
        data: 'semester',
        short: true,
        width: 5,
      },
      {
        title: 'Exam Type',
        data: 'examType',
        short: true,
        width: 10,
      },
      {
        title: 'Mark',
        data: 'batchStatus',
        short: true,
        width: 10,
        render: (row: any) => this.PrepareTextbox(row),
      },
      {
        title: 'Attendance',
        data: 'attendance',
        short: true,
        width: 10,
      },
      {
        title: 'Action',
        data: 'Mat-Action',
        width: 15,
        buttongroup: [
          {
            button: true,
            buttondata: 'sysid',
            buttons: ['info', 'history'],
            click: ['history|StudentMarkDetails|sysid|'],
          },
        ],
        buttonlabel: 'sysid',
      },
    ],
    columnSticky: [0, 1, 2],
    headerSticky: true,
    filter: true,
  };
  @ViewChild('tableContainer') tableContainer!: ElementRef;
  ngOnInit() {}
  isRequestValid(): boolean {
    return Object.values(this.request).every((v) => v !== null && v !== undefined && v !== '');
  }
  PrepareTextbox(row: any): string {
    const value = row.subjectMark ?? 0;

    return `<span class="d-none">${value}</span>
    <input
       type="number"
      class="form-control MarkEntryTextbox"
      min="0"
      id="mark_${row.sysid}"
      value="${value}"
      data-Sysid="${row.sysid}"
    ></input>
  `;
  }
  ngAfterViewInit() {
    // Use Renderer2 to attach a listener to the entire table's select elements
    //this.MarkChangeEvent();
    this.newMarkChageEvent();
    if (this.FS.CSSE('filter')) {
      this.FS.loadFromSessionStorage('filter', this.filterparameter);
      this.FS.loadFromSessionStorage('filter', this.request);

      setTimeout(() => {
        this.triggersubjectAPI = true;
        this.triggercatch = true;
      }, 200);
      setTimeout(() => {
        this.triggerviewbutton = true;
      }, 700);
    }
  }
  MarkChangeEvent() {
    const table = this.el.nativeElement.querySelector('.TableStudentMarkClass tbody');
    // Check if the table exists before adding event listeners
    if (table) {
      let id = '';
      this.renderer.listen(table, 'input', (event: Event) => {
        const el = event.target as HTMLInputElement;
        if (!el.classList.contains('MarkEntryTextbox')) return;

        const sysid = +el.getAttribute('data-sysid')!;
        const item = this.StudentMark.find((x) => +x.sysid === sysid);
        if (!item) return;

        // preserve caret while filtering
        const start = el.selectionStart ?? el.value.length;
        const before = el.value.slice(0, start);
        const removedBefore = before.replace(/\d/g, '').length;

        const digitsOnly = el.value.replace(/\D+/g, '');
        if (el.value !== digitsOnly) {
          el.value = digitsOnly;
          const newPos = start - removedBefore;
          el.setSelectionRange(newPos, newPos);
        }
        const numericValue = Number(digitsOnly);

        item.subjectMark = numericValue;
        this.onSingleMarkChange(sysid, numericValue);

        id = `mark_${sysid}`;
        setTimeout(() => {
          const updatedInput = document.getElementById(id) as HTMLInputElement;
          if (updatedInput) {
            updatedInput.focus();
          }
        }, 500);
        // IMPORTANT: don’t rebuild the entire table or replace StudentMark reference here
      });
    }
  }
  newMarkChageEvent() {
    this.renderer.listen(this.tableContainer.nativeElement, 'change', (event: Event) => {
      const target = event.target as HTMLInputElement;
      if (!target.classList.contains('MarkEntryTextbox')) return;

      const mark = Number(target.value);
      target.value = mark.toString();

      const sysid = Number(target.getAttribute('data-Sysid'));
      const item = this.StudentMark.find((x) => +x.sysid === sysid);
      if (!item) return;
      const status = mark === 888 ? 'AB' : mark === 999 ? 'OD' : 'P';
      item.attendance = status;
      if (mark === 888 || mark === 999) {
        item.subjectMark = 0;
      } else {
        item.subjectMark = mark;
      }

      this.onSingleMarkChange(sysid, mark);
    });
  }
  onSingleMarkChange(sysid: number, newMark: number): void {
    const base = this.baseline.get(sysid);
    const val = Number(newMark);
    const i = this.updatedrecord.findIndex((x) => x.sysid === sysid);

    if (base !== undefined && val === Number(base)) {
      // reverted to original -> remove from updates
      if (i !== -1) this.updatedrecord.splice(i, 1);
    } else {
      // changed -> add or replace
      const rec = new StudentMarkUpdate({ sysid: sysid, mark: val });
      if (i !== -1) this.updatedrecord[i] = rec;
      else this.updatedrecord.push(rec);
    }
    console.log(this.updatedrecord);
  }
  onParameterChange(event: ICommonFilterRequest): void {
    this.request.courseType = event.courseType;
    this.request.batch = event.batch;
    this.request.courseCode = event.courseCode;
    this.request.section = event.section;
  }
  loadgrid() {
    const hasBaseFields =
      this.request.courseType &&
      this.request.batch &&
      this.request.courseCode &&
      this.request.semester &&
      this.request.section;
    if (hasBaseFields) {
      this.triggersubjectAPI = true;

      if (this.request.subjectID) {
        this.FS.SSSV('filter', this.request);
      }
    }
  }
  onSubjectAPIResponse(Response: any) {
    this.subjectdetails = Response;
    this.subjectcode = '';
    this.subjectcredit = '';
    this.subjecttype = '';
    this.marginMark = '';
    if (this.request.subjectID) {
      const result = this.subjectdetails.find(
        (subject) => subject.subjectId == this.request.subjectID,
      );
      this.subjectcode = result ? result.subjectCode : '';
      this.subjectcredit = result ? result.subjectCredit.toString() : '';
      this.subjecttype = result ? result.subjectType : '';
      this.marginMark = result ? result.marginMark.toString() : '';
    }
  }

  onSubjectChanges(value: any) {
    this.request.subjectID = value.value;
    const result = this.subjectdetails.find((subject) => subject.subjectId == value.value);
    this.subjectcode = result ? result.subjectCode : '';
    this.subjectcredit = result ? result.subjectCredit.toString() : '';
    this.subjecttype = result ? result.subjectType : '';
    this.marginMark = result ? result.marginMark.toString() : '';
  }
  canDeactivate(): boolean {
    if (this.updatedrecord.length > 0) {
      return confirm('You have unsaved changes. Do you really want to leave?');
    }
    return true;
  }
  onViewData(Response: any) {
    if (Response != null) {
      this.FS.SSSV('filter', this.request);
      this.StudentMark = Response;
      this.baseline.clear();
      for (const r of this.StudentMark) {
        this.baseline.set(r.sysid, Number(r.subjectMark ?? 0));
      }
      this.updatedrecord = [];
    }
  }
  onupdateResponse() {
    this.updatedrecord.forEach((item) => {
      if (item.mark === 888) {
        item.mark = 0;
      } else if (item.mark === 999) {
        item.mark = 0;
      }
      this.baseline.set(item.sysid, item.mark);
    });
    this.updatedrecord = [];
  }
  openPrintPopup() {
    const jsonValue = JSON.stringify(this.request);
    localStorage.setItem('PrintMarkEntry', jsonValue);
    const w = 900,
      h = 700,
      left = (screen.width - w) / 2,
      top = (screen.height - h) / 2;
    window.open(
      `/Staff/StudentMarkPrint`,
      '_blank',
      `width=${w},height=${h},left=${left},top=${top},resizable=yes,scrollbars=yes`,
    );
  }
}
