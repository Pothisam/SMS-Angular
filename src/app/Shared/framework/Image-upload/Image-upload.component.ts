import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { FrameworkService } from '../framework.service';
import { GlobalService } from 'src/app/Global/Service/global.service';
import { CGuid } from 'src/app/Global/Interface/common-interface';
import { InsertOrUpdateProfileRequest } from './Image-upload';

@Component({
  selector: 'fw-Image-upload',
  templateUrl: './Image-upload.component.html',
  styleUrls: ['./Image-upload.component.css'],
  standalone: false,
})
export class ImageUploadComponent implements OnInit, AfterViewInit {
  area: string = this.globalService.getArea();
  ProfileCall: CGuid = new CGuid();
  @Input() PK: number = 0;
  fileuploadtodb: InsertOrUpdateProfileRequest = new InsertOrUpdateProfileRequest();
  @Input() size: number | string = 150;
  _actualfileSizeInKB: number = 0;
  _tooltip: string = 'Click to upload Profile Picture';
  @Input() filesize: number = 150;

  @Input() fileupload: boolean = false;
  @Input() uploadto: string = '';
  public _url: string = 'assets/FemaleUser.png';

  // #region Two way bindings
  _guid: string = '';
  @Input()
  get guid() {
    return this._guid;
  }
  set guid(value: any) {
    if (this._guid === value) {
      return;
    }
    this._guid = value;
    if (this._guid) {
      this.GetProfileImage();
    }
  }
  @Output() guidChange = new EventEmitter<string>();

  _gender: string = 'male';
  _disableGenderChange: boolean = false;
  @Input()
  get gender() {
    return this._gender;
  }
  set gender(value: any) {
    if (this._gender === value) {
      return;
    }
    this._gender = value;
    if (!this._disableGenderChange) {
      this.onGenderChange();
    }
  }

  private _filename: string = '';
  @Input()
  get filename(): string {
    return this._filename;
  }
  set filename(value: any) {
    if (this._filename === value) {
      return;
    }
    this._filename = value;
    this.filenameChange.emit(this._filename); // Emit to notify parent of the change
  }
  @Output() filenameChange = new EventEmitter<string>();

  private _contenttype: string = '';
  @Input()
  get contenttype(): string {
    return this._contenttype;
  }
  set contenttype(value: any) {
    if (!value || this._url === value) {
      return;
    }
    this._contenttype = value;
    this.contenttypeChange.emit(this._contenttype); // Emit to notify parent of the change
  }
  @Output() contenttypeChange = new EventEmitter<string>();

  @Input()
  get url(): string {
    return this._url;
  }
  set url(value: any) {
    if (!value || this._url === value) {
      return;
    }
    this._url = value;
    this.urlChange.emit(this._url); // Emit to notify parent of the change
  }
  @Output() urlChange = new EventEmitter<string>();
  // #endregion

  constructor(
    private frameworkService: FrameworkService,
    private globalService: GlobalService,
  ) {}
  @ViewChild('fileUpload') fileUploadid!: ElementRef<HTMLInputElement>; // Reference to the file input element
  ngOnInit() {
    if (!this.fileupload) {
      this._tooltip = '';
    }
  }
  async GetProfileImage() {
    let value = await this.frameworkService.getIDBWithoutURL(
      'Image-DB',
      'ProfileImage',
      this._guid,
    );
    if (value !== null && value !== undefined) {
      const mimeType = 'image/png';
      const dataUrl = `data:${mimeType};base64,${value.data}`;
      this._url = dataUrl;
    } else {
      this.ProfileCall.guid = this._guid;
      this.GetProfileImageFromDB();
    }
  }
  GetProfileImageFromDB() {
    this.frameworkService
      .callSelectAPI('/DocumentLibrary/GetProfileImagebyGuid', this.ProfileCall, this.area, false)
      .subscribe({
        next: (Response) => {
          const mimeType = 'image/png';
          const dataUrl = `data:${mimeType};base64,${Response.data.data}`;
          this._url = dataUrl;
          this.frameworkService.SaveIDBWithoutURL(
            'Image-DB',
            'ProfileImage',
            Response.data.guid,
            Response.data,
          );
        },
      });
  }
  ngAfterViewInit(): void {}
  onGenderChange() {
    this._url =
      this._gender?.toLowerCase() === 'male' ? 'assets/MaleUser.png' : 'assets/FemaleUser.png';
  }
  onImageMouseDown(event: MouseEvent) {
    if (this.fileupload) {
      event.stopPropagation();
      event.preventDefault();
    }
  }
  onImageClick(event: MouseEvent) {
    if (this.fileupload) {
      event.stopPropagation();
      event.preventDefault();
      this.fileUploadid?.nativeElement?.click();
    }
  }
  onImageKeydown(event: KeyboardEvent): void {
    if (event.shiftKey && event.key && event.key.toLowerCase() === 'c') {
      this.onGenderChange();
      this._filename = '';
      this._contenttype = '';
      this.filenameChange.emit(this._filename);
      this.urlChange.emit('');
      this.contenttypeChange.emit(this._contenttype);
      this.clearFileInput();
    }
  }
  // Handle the file selection
  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;

    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      this._actualfileSizeInKB = Math.round(file.size / 1024);
      // Get the file name and content type
      const fileName = file.name;
      const fileContentType = file.type;
      // Check if the file type is an image
      if (file.type.startsWith('image/')) {
        if (this._actualfileSizeInKB < this.filesize) {
          this.frameworkService
            .convertFileToBase64(file)
            .then((base64: string | ArrayBuffer | null) => {
              if (typeof base64 === 'string') {
                this._url = base64;
                this._disableGenderChange = true;
                this._filename = fileName;
                this._contenttype = fileContentType;
                this.filenameChange.emit(this._filename);
                this.urlChange.emit(this._url);
                this.contenttypeChange.emit(this._contenttype);
                this.tooltipchange();
                if (this.uploadto?.trim() && this.PK) {
                  this.uploaddatatoDB();
                }
              }
            });
        } else {
          this.frameworkService.tosttrigeer(
            `The uploaded file exceeds the allowed size limit. Maximum file size: ${this.filesize} KB. Your file size: ${this._actualfileSizeInKB} KB. Please upload a smaller file.`,
            '300',
          );
          this.clearFileInput();
        }
      } else {
        this.frameworkService.tosttrigeer('Only image files are allowed', '300');
        this.clearFileInput();
        // Handle non-image file error (e.g., show a message to the user)
      }
    }
  }
  clearFileInput(): void {
    if (this.fileUploadid?.nativeElement) {
      this.fileUploadid.nativeElement.value = '';
    } else {
      console.error('File input element is undefined');
    }
    this.tooltipchange();
  }
  tooltipchange() {
    if (this.fileupload) {
      this._tooltip =
        this._url && this._url !== 'assets/MaleUser.png' && this._url !== 'assets/FemaleUser.png'
          ? 'Shift + C to Clear Selected Image'
          : 'Click to upload Profile Picture';
    }
  }
  uploaddatatoDB() {
    if (['staff', 'student'].includes(this.uploadto.toLowerCase())) {
      this.fileuploadtodb.contentType = this._contenttype;
      this.fileuploadtodb.data = this._url;
      this.fileuploadtodb.fileName = this._filename;
      this.fileuploadtodb.table = this.uploadto.toLowerCase();
      this.fileuploadtodb.sysid = this.PK;
      this.frameworkService
        .callSelectAPI(
          '/DocumentLibrary/InsertorUpdateProfileImage',
          this.fileuploadtodb,
          this.area,
          false,
        )
        .subscribe({
          next: (Response) => {},
        });
    }
  }
}
