import { Component, OnInit } from '@angular/core';
import { ManagementService } from 'src/app/Area/SMS/Management/management.service';
import { GlobalService } from 'src/app/Global/Service/global.service';

@Component({
  selector: 'app-PrintHeader',
  templateUrl: './PrintHeader.component.html',
  styleUrls: ['./PrintHeader.component.scss'],
  standalone: false,
})
export class PrintHeaderComponent implements OnInit {
  Area: string = '';
  logo: any = '';
  institutionName: string = '';
  address: string = '';
  phone: string = '';
  landline: string = '';
  email: string = '';
  website: string = '';
  constructor(
    private globalService: GlobalService,
    private managementService: ManagementService,
  ) {
    this.Area = this.globalService.getArea();
    if (this.Area == 'SMS') {
      this.logo = JSON.parse(localStorage.getItem('SMSToken')!).logo;
    } else if (this.Area == 'Fees') {
      this.logo = JSON.parse(localStorage.getItem('FeesToken')!).logo;
    }
    this.managementService.getInstitutionDetails(true).subscribe({
      next: (Response) => {
        if (Response.data != null) {
          this.institutionName = Response.data.institutionName;
          this.address =
            Response.data.address1 +
            (Response.data.address2 != null ? ', ' + Response.data.address2 : '') +
            (Response.data.districtname != null ? ', ' + Response.data.districtname : '') +
            (Response.data.stateName != null ? ', ' + Response.data.stateName : '') +
            (Response.data.pincode != null ? ' - ' + Response.data.pincode : '');
          this.phone = Response.data.mobileNumer;
          this.landline = Response.data.landline;
          this.email = Response.data.emailid;
          this.website = Response.data.website;
          //bind data to model
        }
      },
    });
  }

  ngOnInit() {}
}
