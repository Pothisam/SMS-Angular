import { Component, ViewChild } from '@angular/core';
import {
  TransferCertificateReportRequestModel,
  TransferCertificateReportResponseModel,
} from 'src/app/Modules/CMS/Student/Report/TCReport/TransferCertificateReport';
import { ITableSettings } from 'src/app/Shared/framework/table/table.model';
import { StudentService } from '../../Student/student.service';
import { FrameworkService } from 'src/app/Shared/framework/framework.service';
import { TCPrintComponent } from './tcprint/tcprint.component';
import { firstValueFrom, defaultIfEmpty } from 'rxjs';

@Component({
  selector: 'app-transfer-certificate-report',
  standalone: false,
  templateUrl: './transfer-certificate-report.component.html',
  styleUrl: './transfer-certificate-report.component.scss',
})
export class TransferCertificateReportComponent {
  request: TransferCertificateReportRequestModel = new TransferCertificateReportRequestModel();
  triggerBatchAPI: boolean = false;
  triggerCourseTypeAPI: boolean = false;
  triggerSectionAPI: boolean = false;

  private _triggerAPICall: boolean = false;
  public get triggerAPICall() {
    return this._triggerAPICall;
  }
  public set triggerAPICall(value: boolean) {
    this._triggerAPICall = value;
    this.getTCReport();
  }

  @ViewChild(TCPrintComponent) printComp!: TCPrintComponent;

  TCList: TransferCertificateReportResponseModel[] = [];

  public tableSettings: ITableSettings = {
    showFotter: false,
    showPagination: true,
    jsonData: undefined,
    shorting: true,
    slno: true,
    checkbox: false,
    columns: [
      { title: 'Roll No', data: 'rollNo', width: 5 },
      { title: 'Name', data: 'name', width: 5 },
      { title: 'Father Mobile Number', data: 'mobileNo', width: 10 },
      { title: 'Mother Mobile Number', data: 'mobileNo2', width: 10 },
      { title: 'Student Mobile Number', data: 'studentMobileNumber', width: 10 },
      { title: 'Semester', data: 'semester', width: 5 },
      { title: 'Balance', data: 'balance', width: 5 },
      { title: 'Status', data: 'status', width: 5 },
    ],
    columnSticky: [0, 1],
    headerSticky: true,
    filter: false,
  };

  private print_header: string = `
        <html>
<head>
  <meta name="viewport" content="width=device-width">
  <title>PrintTC</title>

  <!-- Print Zoom Styling -->
  <style type="text/css" media="print">
    body {
      zoom: 65%;
    }
  </style>

  <!-- General Styling -->
  <style type="text/css">
    .Border {
      border: 1px solid black;
    }

    .Noborder {
      border: none;
    }

    .Capital {
      text-transform: capitalize;
    }

    .PB {
      padding-bottom: 20px;
    }

    .Fontsize20 {
      font-size: 20px;
    }

    .Bold {
      font-weight: bold;
    }

    .Absolute-Right {
      margin: auto;
      position: absolute;
      top: 0;
      left: 90px; /* Fixed missing 'px' unit */
      bottom: 0;
      right: 0;
    }

    .Fontst {
      font-style: italic;
    }

    .Di {
      display: inline;
    }
  </style>

  <!-- Page Break Styling -->
  <style type="text/css" media="print">
    .page-break {
      page-break-before: always !important; /* force page break before */
      break-before: page;         /* modern syntax */
      display: block;
      width: 100%;
      height: 0;
      margin: 0;
      padding: 0;
    }
  </style>
</head>

<body>
  <div id="Table" style="width: 100%; align-content: center; margin: 0 auto;">
        `;

  constructor(
    private studentService: StudentService,
    private fws: FrameworkService,
  ) {}

  private async waitForChildRender(): Promise<boolean> {
    this.printComp.getTCDetails(this.request, this.request.date, this.request.dol);
    return await firstValueFrom(this.printComp.rendered$.pipe(defaultIfEmpty(false)));
  }

  ngAfterViewInit() {
    if (this.fws.CSSE('filter')) {
      this.fws.loadFromSessionStorage('filter', this.request);
      if (
        this.request.courseType ??
        this.request.batch ??
        this.request.courseCode ??
        this.request.section !== ''
      ) {
        this.triggerBatchAPI = true;
        this.triggerCourseTypeAPI = true;
        this.triggerSectionAPI = true;
        this.getTCReport();
      }
    }
  }

  async loadPrintScreen() {
    var isprintdataloaded = await this.waitForChildRender().then((res) => res);
    if (isprintdataloaded) {
      const printSection = document.getElementById('print-section')?.outerHTML;
      const printWindow = window.open('', '_blank', 'height=800,width=1400');
      printWindow!.document.writeln(this.print_header);
      printWindow!.document.writeln(printSection!);
      printWindow!.document.writeln('</div></body></html>');
      printWindow!.document.close();
      printWindow!.print();
    }
  }

  getTCReport(s?: any) {
    this.fws.SSSV('filter', this.request);
    this.studentService.getTCReport(this.request).subscribe({
      next: (Response) => {
        this.TCList = Response.data;
      },
    });
  }
}
