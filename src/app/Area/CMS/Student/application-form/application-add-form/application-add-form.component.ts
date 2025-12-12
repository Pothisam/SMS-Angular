import { Component, EventEmitter, Input, Output } from '@angular/core';
import { StudentAddApplicationFormRequestModel } from 'src/app/Modules/CMS/Student/Student';

@Component({
  selector: 'app-application-add-form',
  standalone: false,
  templateUrl: './application-add-form.component.html',
  styleUrl: './application-add-form.component.scss',
})
export class ApplicationAddFormComponent {
  triggerDepartmentNameAPI: boolean = false;
  triggerCourseNameAPI: boolean = false;

  @Input()
  request = new StudentAddApplicationFormRequestModel();

  @Output()
  requestChange = new EventEmitter<StudentAddApplicationFormRequestModel>();

  onRequestChange(newRequest: StudentAddApplicationFormRequestModel) {
    // newRequest.departmentCode = newRequest.departmentName;
    this.requestChange.emit(newRequest);
  }

  constructor() {}

  ngOnChanges() {
    this.onRequestChange(this.request);
  }
}
