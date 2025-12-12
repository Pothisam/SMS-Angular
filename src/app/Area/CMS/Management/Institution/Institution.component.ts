import { Component, OnInit } from '@angular/core';
import { NgModule } from '@angular/core';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { GlobalService } from 'src/app/Global/Service/global.service';
import { IInstitutionRequest, IPostoffice } from 'src/app/Modules/CMS/Institution/Institution';
import { InstitutionService } from './Institution.service';
import { IHistoryRecordParameter } from 'src/app/Shared/framework/historyrecord/historyrecord';
@Component({
  selector: 'app-Institution',
  templateUrl: './Institution.component.html',
  styleUrls: ['./Institution.component.css'],
  standalone: false,
})
export class InstitutionComponent implements OnInit {
  logoWithText: string = '';
  logo: string = '';
  favIcon: string = '';
  private isComponentLoaded = false;
  public _historyrecordParameter: IHistoryRecordParameter = new IHistoryRecordParameter();
  constructor(
    private globalService: GlobalService,
    private institutionService: InstitutionService,
  ) {}
  public request: IInstitutionRequest = {
    institutionName: '',
    address1: '',
    address2: '',
    pincode: '',
    postofficeName: '',
    districtname: '',
    stateName: '',
    emailid: '',
    mobileNumer: '',
    alternateMobileNumer: '',
    landline: '',
    institutionType: '',
    staffIdprefix: '',
    entredBy: '',
    modifiedBy: '',
    modifiedDate: '',
    website: '',
  };
  public postalrequest: IPostoffice = {
    Pincode: '',
  };
  triggerApi: boolean = false;
  selectedTabIndex = 0;

  onTabChange(event: MatTabChangeEvent): void {
    this.selectedTabIndex = event.index;
  }
  ngOnInit() {
    this.GetInstitutionDetails(true);
    if (this.globalService.GLSG('CMSToken') != null) {
      let userJSON = localStorage.getItem('CMSToken');
      if (userJSON !== null) {
        this.logoWithText = JSON.parse(userJSON).logoWithText;
        this.logo = JSON.parse(userJSON).logo;
        this.favIcon = JSON.parse(userJSON).favIcon;
      }
    }
    this._historyrecordParameter.tableName = 'InstitutionDetails';
    const institutionCode = this.globalService.GLSKV('CMSToken', 'institutionCode');
    this._historyrecordParameter.fID = institutionCode !== null ? Number(institutionCode) : 0; // or any fallback number
  }
  ngAfterViewInit() {
    this.isComponentLoaded = true;
  }
  GetInstitutionDetails(cached: boolean) {
    this.institutionService.getInstitutionDetails(cached).subscribe({
      next: (Response) => {
        console.log(Response.data);
        if (Response.data != null) {
          this.request = this.globalService.bindDataToModel(this.request, Response.data);
          this.postalrequest.Pincode = this.request.pincode;
          this.request.postofficeName = this.request.postofficeName;
          this.triggerApi = true;

          if (this.request.modifiedDate) {
            const formattedDate = this.globalService.formatDateTime(this.request.modifiedDate);
            // Assuming you want to keep modifiedDate as a string. If not, you'll need a different approach.
            this.request.modifiedDate = formattedDate;
          }
        }
      },
    });
  }
  onValueChange() {
    if (!this.isComponentLoaded) {
      return; // Prevent execution if the component has not fully loaded
    }
    if (this.request.pincode.length == 6) {
      this.postalrequest.Pincode = this.request.pincode;
      this.triggerApi = true;
    }
  }
  onModelValueChanges(options: { value: string; text: string }) {
    // Handle the change event here
    this.request.postofficeName = options.value;
  }
  onRespons(Response: any) {
    if (Response != null) {
      this.GetInstitutionDetails(false);
    }
  }
}
