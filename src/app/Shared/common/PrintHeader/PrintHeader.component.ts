import { Component, OnInit } from '@angular/core';
import { InstitutionService } from 'src/app/Area/CMS/Management/Institution/Institution.service';
import { GlobalService } from 'src/app/Global/Service/global.service';

@Component({
  selector: 'app-PrintHeader',
  templateUrl: './PrintHeader.component.html',
  styleUrls: ['./PrintHeader.component.css'],
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
    private institutionService: InstitutionService,
  ) {
    this.Area = this.globalService.getArea();
    if (this.Area == 'CMS') {
      this.logo = JSON.parse(localStorage.getItem('CMSToken')!).logo;
    } else if (this.Area == 'Staff') {
      this.logo = JSON.parse(localStorage.getItem('StaffToken')!).logo;
    }
    this.institutionService.getInstitutionDetails(true).subscribe({
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
