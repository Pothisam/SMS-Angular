import { Component } from '@angular/core';
import { ExportStaffDetailsRequestModule } from 'src/app/Modules/CMS/Staff/Report/ExportStaffDetails';

@Component({
  selector: 'app-export-staff-details',
  standalone: false,
  templateUrl: './export-staff-details.component.html',
  styleUrl: './export-staff-details.component.scss',
})
export class ExportStaffDetailsComponent {
  ColumnsList: string =
    'StaffID|Staff-ID, Title|Title, Staffname|Name, Initial|Initial, Name|Name with Initial, Sex|Gender, DOB|DOB, Age|Age, DOJ|DOJ, DOR|DOR, PlaceOfBirth|Place Of Birth, Religion|Religion, Community|Community, Cast|Cast, PhysicalDisablity|Physical Disability,  MobileNo|Mobile No, Emailid|Email ID, MotherTongue|Mother Tongue, MaritalStatus|Marital Status,  AddharCardNo|Aadhar Card No, BloodGroup|Blood Group, DepartmentName|Department Name,  DepartmentCode|Department Code, Designation|Designation, DesignationCode|Designation Code,StaffType|Staff Type, IFSCCode|IFSC Code, BankName|Bank Name, BankAddress|Bank Address,  AccountNumber|Account Number, MICRCode|MICR Code, PANCardNo|PAN Card No,  ParmanentAddress1|Permanent Address 1, ParmanentAddress2|Permanent Address 2,  ParmanentAddressPostOffice|Permanent Address Post Office, ParmanentAddressDistrict|Permanent Address District,  manentAddressPincode|Permanent Address Pincode, ParmanentAddressState|Permanent Address State,CommunicationAddress1|Communication Address 1, CommunicationAddress2|Communication Address 2,CommunicationAddressPostOffice|Communication Address Post Office, CommunicationAddressDistrict|Communication Address District,CommunicationAddressPincode|Communication Address Pincode, CommunicationAddressState|Communication Address State ';
  request: ExportStaffDetailsRequestModule = new ExportStaffDetailsRequestModule();

  onSelectedColumnsEvent(columns: string[]) {
    this.request.Columns = columns.join(',');
  }
}
