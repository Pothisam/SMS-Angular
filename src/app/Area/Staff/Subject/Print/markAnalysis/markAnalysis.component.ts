import { Component, OnInit } from '@angular/core';
import {
  GetStudentMarkAnalysisRequest,
  StudentMarkAnalysis1Response,
  StudentMarkAnalysis3Response,
  StudentMarkAnalysisResponse,
} from 'src/app/Modules/Staff/Subject/MarkAnalysisReport';
import { StaffService } from '../../../User/Staff.service';
import { CourseDetailResponse, CourseDetailsRequest } from 'src/app/Modules/CMS/course/course';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-markAnalysis',
  templateUrl: './markAnalysis.component.html',
  styleUrls: ['./markAnalysis.component.css'],
  standalone: false,
})
export class MarkAnalysisComponent implements OnInit {
  public heading: string = '';
  public class: string = '';
  public request: GetStudentMarkAnalysisRequest = new GetStudentMarkAnalysisRequest();
  public coursedetails: CourseDetailsRequest = new CourseDetailsRequest();
  public grid1response: StudentMarkAnalysis1Response[] = [];
  public grid2response: StudentMarkAnalysisResponse[] = [];
  public grid3response: StudentMarkAnalysis3Response[] = [];
  public CourseDetailResponse: CourseDetailResponse = new CourseDetailResponse();
  displayedColumnsgrid1: string[] = [];
  displayedColumnsgrid2: string[] = [];
  displayedColumnsgrid3: string[] = [];
  constructor(private staffService: StaffService) {
    this.request = JSON.parse(localStorage.getItem('PrintMarkAnalysis') || '{}');
    if (this.request.examType == 'Internal I') {
      this.heading = 'INTERNAL ASSESSMENT - I';
    } else if (this.request.examType == 'Internal II') {
      this.heading = 'INTERNAL ASSESSMENT - II';
    } else {
      this.heading = 'Model';
    }
    this.coursedetails.courseCode = this.request.courseCode;
    this.GetGridList();
  }

  ngOnInit() {}
  GetGridList() {
    const mark1$ = this.staffService.getMarkAnalysis1(this.request);
    const mark2$ = this.staffService.getMarkAnalysis2(this.request);
    const mark3$ = this.staffService.getMarkAnalysis3(this.request);
    const course$ = this.staffService.getCourseDetails(this.coursedetails);

    forkJoin([mark1$, mark2$, mark3$, course$]).subscribe({
      next: ([res1, res2, res3, res4]) => {
        // --- Handle getMarkAnalysis1 ---
        if (res1.data != null) {
          this.grid1response = res1.data;
          this.displayedColumnsgrid1 = ['Id', 'subjectName'];
        }

        // --- Handle getMarkAnalysis2 ---
        if (res2.data != null) {
          this.grid2response = res2.data;
          const dynamicCols2 = this.grid2response[0]?.subjects.map((s: any) => s.column) || [];
          this.displayedColumnsgrid2 = ['Id', 'rollNo', 'name', ...dynamicCols2];
        }

        // --- Handle getMarkAnalysis3 ---
        if (res3.data != null) {
          this.grid3response = res3.data;
          const dynamicCols3 = this.grid3response[0]?.subjects.map((s: any) => s.column) || [];
          this.displayedColumnsgrid3 = ['id', 'description', ...dynamicCols3];
        }

        // --- Handle getCourseDetails ---
        if (res4.data != null) {
          this.CourseDetailResponse = res4.data;
        }

        // ✅ Trigger print only after all 4 API responses are done
        setTimeout(() => {
          window.print();
        }, 1000);
      },
      error: (err) => {
        console.error('Error loading data:', err);
      },
    });
  }
  columnHeader1Map: { [key: string]: string } = {
    Id: 'ID',
    subjectName: 'Subject Name',
  };
  columnHeader2Map: { [key: string]: string } = {
    Id: 'ID',
    rollNo: 'Roll No',
    name: 'Name',
  };
  columnHeader3Map: { [key: string]: string } = {
    id: 'ID',
    description: 'Description',
  };
  getValuegrid1(row: any, column: string, index?: number): string {
    if (column === 'Id') return (index! + 1).toString();
    if (column === 'subjectName') return row.subjectName;
    return '';
  }
  getValuegrid2(row: any, column: string, index?: number): string {
    if (column === 'Id') return (index! + 1).toString();
    if (column === 'rollNo') return row.rollNo;
    if (column === 'name') return row.name;
    const subject = row.subjects.find((s: any) => s.column === column);
    return subject ? subject.value : '';
  }
  getValuegrid3(row: any, column: string, index?: number): string {
    if (column === 'id') return row.id;
    if (column === 'description') return row.description;
    const subject = row.subjects.find((s: any) => s.column === column);
    return subject ? subject.value : '';
  }
}
