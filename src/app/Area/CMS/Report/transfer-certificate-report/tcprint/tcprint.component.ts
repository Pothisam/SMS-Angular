import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  input,
  Output,
  QueryList,
  ViewChild,
  ViewChildren,
} from '@angular/core';
import { StudentService } from '../../../Student/student.service';
import { FrameworkService } from 'src/app/Shared/framework/framework.service';
import {
  TCReportRequestModel,
  TransferCertificateReportResponseModel,
} from 'src/app/Modules/CMS/Student/Report/TCReport/TCPrintReport';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-tcprint',
  standalone: false,
  templateUrl: './tcprint.component.html',
  styleUrl: './tcprint.component.scss',
})
export class TCPrintComponent {
  type = input<string>();

  logo: any;
  Date: string = '';
  DOL: string = '';
  TCDetailsList: TransferCertificateReportResponseModel[] = [];

  courseType: string = '';
  // request: any;

  private renderedSubject = new Subject<boolean>();
  rendered$ = this.renderedSubject.asObservable();

  constructor(
    private studentService: StudentService,
    private fws: FrameworkService,
  ) {
    this.logo = JSON.parse(localStorage.getItem('CMSToken')!).logo;
  }

  ngAfterViewInit() {
    //this.logo = JSON.parse(localStorage.getItem('CMSToken')!).logo;
  }

  getTCDetails(parameter: TCReportRequestModel, date: string, dol: string) {
    this.courseType = parameter.courseType;
    this.Date = date;
    this.DOL = dol;
    this.studentService.getTCPrintReport(parameter).subscribe({
      next: (Response) => {
        this.TCDetailsList = Response.data;
        console.log('inside timeout', this.TCDetailsList);

        setTimeout(() => {
          this.renderedSubject.next(true);
        }, 500);
      },
    });
  }

  ConvertDateTime(value: string) {
    if (value === null) return '';
    var dt = new Date(value);
    return (
      ('0' + dt.getDate()).slice(-2) +
      '/' +
      dt.toLocaleString('default', { month: 'long' }) +
      '/' +
      dt.getFullYear()
    );
  }

  ConvertLdate(value: string) {
    var dt = new Date(value);
    return (
      ('0' + dt.getDate()).slice(-2) +
      '/' +
      dt.toLocaleString('default', { month: 'long' }) +
      '/' +
      dt.getFullYear()
    );
  }

  ngOnDestroy() {
    this.renderedSubject.complete();
    this.renderedSubject.unsubscribe();
  }
}
