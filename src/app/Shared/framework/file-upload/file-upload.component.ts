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

@Component({
  selector: 'fw-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.css'],
  standalone: false,
})
export class FileUploadComponent implements OnInit, AfterViewInit {
  _actualfileSizeInKB: number = 0;
  _buttonclass: string = '';
  public area: string = this.globalService.getArea();
  @Input() buttontype: string = 'P';
  dynamicId: string = `fileInput-${Math.floor(Math.random() * 1000)}`;

  _label: string = '';
  @Input() label: string = 'Choose';
  message: string = 'Please Select File';
  @Input() filesize: number = 150;
  @Input() validationgroup: string = 'default';
  //#region "File Name"
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
  //#endregion "File Name"
  //#region "File Data"
  private _data: string = '';
  @Input()
  get data(): string {
    return this._data;
  }
  set data(value: any) {
    if (this._data === value) {
      return;
    }
    this._data = value;
    if (this._data == '') {
      this._filename = '';
      this._contenttype = '';
      this._label = this.label;
      this.clearFileInput();
    }
    this.dataChange.emit(this._data);
  }
  @Output() dataChange = new EventEmitter<string>();
  //#endregion "File Data"
  // #region Contenttype
  private _contenttype: string = '';
  @Input()
  get contenttype(): string {
    return this._contenttype;
  }
  set contenttype(value: any) {
    if (!value || this._data === value) {
      return;
    }
    this._contenttype = value;
    this.contenttypeChange.emit(this._contenttype); // Emit to notify parent of the change
  }
  @Output() contenttypeChange = new EventEmitter<string>();
  // #endregion

  // #region required parameter
  public _required: boolean = false;
  @Input()
  set isrequired(value: boolean) {
    this._required = value;
    this.UpdateValidation();
  }
  // #endregion
  _accept: string = '';
  @Input() accept: string = 'image';

  @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>;
  @Input() apiUrl: string = '';
  public _parameter: any;
  get parameter() {
    return this._parameter;
  }
  @Input()
  set parameter(value: any) {
    if (this._parameter === value) {
      return;
    }
    this._parameter = value;
    this.parameterChange.emit(this._parameter);
  }
  @Output()
  parameterChange = new EventEmitter<any>();
  @Output()
  apiResponseSuccess = new EventEmitter<any>();
  constructor(private frameworkService: FrameworkService, private globalService: GlobalService) {}

  ngOnInit() {
    this.setButtonClass();
    this.updateLabel();
    this.setFileAcceptType();
  }
  ngAfterViewInit(): void {
    this.UpdateValidation();
  }
  private setButtonClass(): void {
    const buttonClasses: { [key: string]: string } = {
      P: 'btn-primary',
      D: 'btn-danger',
      S: 'btn-success',
    };
    this._buttonclass = buttonClasses[this.buttontype] || '';
  }
  private setFileAcceptType(): void {
    const accepttype = new Map<string, string>([
      ['image', '.jpg,.jpeg,.png,.gif,.bmp,.tiff,.tif,.svg,.webp,.ico,.heic,.avif'],
      ['document', '.pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.txt,.rtf,.odt,.ods,.odp,.csv'],
      [
        'image and document',
        '.jpg,.jpeg,.png,.gif,.bmp,.tiff,.tif,.svg,.webp,.ico,.heic,.avif,.pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.txt,.rtf,.odt,.ods,.odp,.csv',
      ],
      ['all', '*'],
    ]);

    this._accept = accepttype.get(this.accept) || '';
  }
  updateLabel() {
    this._label = this.label;
  }
  triggerFileUpload(): void {
    this.fileInput.nativeElement.click();
  }
  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;

    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      this._actualfileSizeInKB = Math.round(file.size / 1024);
      // Get the file name and content type
      const fileName = file.name;
      const fileContentType = file.type;
      // Check if the file type
      if (this.isFileTypeValid(fileContentType, fileName)) {
        if (this._actualfileSizeInKB < this.filesize) {
          this.frameworkService
            .convertFileToBase64(file)
            .then((base64: string | ArrayBuffer | null) => {
              if (typeof base64 === 'string') {
                this._data = base64;
                this._filename = fileName;
                this._label = fileName;
                this._contenttype = fileContentType;
                this.filenameChange.emit(this._filename);
                this.dataChange.emit(this._data);
                this.contenttypeChange.emit(this._contenttype);
                this.callAPI();
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
        this.frameworkService.tosttrigeer('Only ' + this.accept + ' files are allowed', '300');
        this.clearFileInput();
        // Handle non-image file error (e.g., show a message to the user)
      }
    }
  }
  clearFileInput(): void {
    this.fileInput.nativeElement.value = '';
  }
  private isFileTypeValid(fileType: string, fileName: string): boolean {
    if (!this._accept) {
      return true; // Allow all files if no accept type is defined
    }

    // Split _accept into an array of extensions (e.g., ['.pdf', '.doc'])
    const acceptedTypes = this._accept.split(',');

    // Extract the file extension from the file name
    const fileExtension = '.' + fileName.split('.').pop()?.toLowerCase();

    return acceptedTypes.some((type) => {
      const trimmedType = type.trim();

      if (trimmedType === '*') {
        return true; // Accept all files
      } else if (trimmedType.startsWith('.')) {
        // Match file extensions
        return fileExtension === trimmedType.toLowerCase();
      } else {
        // Match MIME types
        return fileType === trimmedType;
      }
    });
  }
  UpdateValidation(): void {
    if (this.fileInput) {
      this.fileInput.nativeElement.setAttribute('aria-required', String(this._required));
    }
  }
  callAPI() {
    if (
      this.apiUrl != '' &&
      this._parameter != null &&
      this._filename != '' &&
      this.contenttype != '' &&
      this.data != ''
    ) {
      this.frameworkService.callSelectAPI(this.apiUrl, this.parameter, this.area, false).subscribe({
        next: (Response) => {
          if (Response.status == '200') {
            this.apiResponseSuccess.emit(true);
          }
        },
        error: (err) => {},
      });
    }
  }
}
