import { Component, EventEmitter, Input, Output } from '@angular/core';
import { StudentApplicationEditResponseModel } from 'src/app/Modules/CMS/Student/Student';

@Component({
  selector: 'app-application-edit-form',
  standalone: false,
  templateUrl: './application-edit-form.component.html',
  styleUrl: './application-edit-form.component.scss',
})
export class ApplicationEditFormComponent {
  @Input()
  request: StudentApplicationEditResponseModel = new StudentApplicationEditResponseModel();
  @Output()
  requestChange = new EventEmitter<StudentApplicationEditResponseModel>();

  onRequestChange(newRequest: StudentApplicationEditResponseModel) {
    this.requestChange.emit(newRequest);
  }

  constructor() {}

  ngOnChanges() {
    this.onRequestChange(this.request);
  }
}
