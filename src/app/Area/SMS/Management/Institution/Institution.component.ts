import { Component, OnInit } from '@angular/core';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { GlobalService } from 'src/app/Global/Service/global.service';
import {
  InstitutionRequest,
  Postoffice,
  UpdateInstitutionFaviconRequest,
  UpdateInstitutionLogoRequest,
  UpdateInstitutionLogoWithTextRequest,
} from 'src/app/Modules/SMS/Institution/Institution';
import { IHistoryRecordParameter } from 'src/app/Shared/framework/historyrecord/historyrecord';
import { ManagementService } from '../management.service';

@Component({
  selector: 'app-Institution',
  templateUrl: './Institution.component.html',
  styleUrls: ['./Institution.component.scss'],
  standalone: false,
})
export class InstitutionComponent implements OnInit {
  logoWithText: string = '';
  logo: string = '';
  favIcon: string = '';
  private isComponentLoaded = false;
  public UpdateInstitutionLogoRequest: UpdateInstitutionLogoRequest =
    new UpdateInstitutionLogoRequest();
  public UpdateInstitutionLogoWithTextRequest: UpdateInstitutionLogoWithTextRequest =
    new UpdateInstitutionLogoWithTextRequest();
  public UpdateInstitutionFaviconRequest: UpdateInstitutionFaviconRequest =
    new UpdateInstitutionFaviconRequest();
  public _historyrecordParameter: IHistoryRecordParameter = new IHistoryRecordParameter();
  public request: InstitutionRequest = new InstitutionRequest();
  public postalrequest: Postoffice = new Postoffice();
  triggerApi: boolean = false;
  selectedTabIndex = 0;

  onTabChange(event: MatTabChangeEvent): void {
    this.selectedTabIndex = event.index;
  }
  constructor(private globalService: GlobalService, private managementService: ManagementService) {}

  ngOnInit() {
    this.GetInstitutionDetails(true);
    if (this.globalService.GLSG('SMSToken') != null) {
      let userJSON = localStorage.getItem('SMSToken');
      if (userJSON !== null) {
        this.logoWithText = JSON.parse(userJSON).logoWithText;
        this.logo = JSON.parse(userJSON).logo;
        this.favIcon = JSON.parse(userJSON).favIcon;
      }
    }
    this._historyrecordParameter.tableName = 'InstitutionDetails';
    const institutionCode = this.globalService.GLSKV('SMSToken', 'institutionCode');
    this._historyrecordParameter.fID = institutionCode !== null ? Number(institutionCode) : 0; // or any fallback number
    this.UpdateInstitutionLogoRequest.sysid = this._historyrecordParameter.fID;
    this.UpdateInstitutionLogoWithTextRequest.sysid = this._historyrecordParameter.fID;
    this.UpdateInstitutionFaviconRequest.sysid = this._historyrecordParameter.fID;
  }
  ngAfterViewInit() {
    this.isComponentLoaded = true;
  }
  GetInstitutionDetails(cached: boolean) {
    this.managementService.getInstitutionDetails(cached).subscribe({
      next: (Response) => {
        console.log(Response.data);
        if (Response.data != null) {
          this.request = this.globalService.bindDataToModel(this.request, Response.data);
          this.postalrequest.pincode = this.request.pincode;
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
      this.postalrequest.pincode = this.request.pincode;
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
