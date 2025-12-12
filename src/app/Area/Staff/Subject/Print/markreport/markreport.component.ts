import { Component, OnInit } from '@angular/core';
import { PrintHeaderComponent } from 'src/app/Shared/common/PrintHeader/PrintHeader.component';
import { StaffService } from '../../../User/Staff.service';
import { GetStudentMarkDetailsRequest } from 'src/app/Modules/Staff/Subject/AddStudentMark';

@Component({
  selector: 'app-markreport',
  templateUrl: './markreport.component.html',
  styleUrls: ['./markreport.component.css'],
  standalone: false,
})
export class MarkreportComponent implements OnInit {
  public request: GetStudentMarkDetailsRequest = new GetStudentMarkDetailsRequest();
  public basedetails: GetStudentMarkDetailsRequest = new GetStudentMarkDetailsRequest();
  public responseData: any;
  public totalroll: number = 0;
  public present: number = 0;
  public absent: number = 0;
  public percentage: number = 0;
  public pass: number = 0;
  public fail: number = 0;
  constructor(private staffService: StaffService) {
    this.request = JSON.parse(localStorage.getItem('PrintMarkEntry') || '{}');
    this.staffService.getAttendancePrint(this.request).subscribe((res: any) => {
      if (res.status == 200) {
        this.responseData = res.data;
        this.request = res?.ResponseData;
        this.totalroll = this.responseData.markCount[0]?.count;
        this.present = this.responseData.markCount[1]?.count;
        this.absent = this.responseData.markCount[2]?.count;

        this.pass = this.responseData.markCount[3]?.count;
        this.fail = this.responseData.markCount[4]?.count;
        this.percentage = this.responseData.passPercentage[0]?.passPercentage;
        setTimeout(() => {
          window.print();
        }, 500);
      }
    });
  }

  ngOnInit() {
    this.basedetails = this.request;
  }
  ngafterViewInit() {}
}
