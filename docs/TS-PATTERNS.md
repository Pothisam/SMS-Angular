# TypeScript Patterns — Component & Model Reference

---

## 1. Model Conventions

### Location

All domain models live in `src/app/Modules/<Area>/<Feature>/`.
Global shared interfaces live in `src/app/Global/Interface/common-interface.ts`.

### Model File Naming

```
<FeatureName>.ts          e.g. FeesType.ts, StudentDetail.ts
```

### Request / Response Class Pattern

```typescript
// Request class — fields match the API body
export class SaveFeesTypeRequest {
  feesTypeDescription: string = '';
}

// Response class — fields match the API response
export class FeesTypeListResponse {
  sysid: number = 0;
  feesDescription: string = '';
  entryby: string = '';
  entryDate: Date | null = null;
  modifiedby: string = '';
  modifiedDate: Date | null = null;
}
```

Rules:
- Always initialize every property with a default value (no `undefined`).
- Use `Date | null` for nullable dates; use `number = 0` for IDs.
- Name request classes `<Action><Feature>Request` and response classes `<Feature>ListResponse` / `<Feature>DetailResponse`.
- Place request and response classes in the **same file** as the feature they belong to.

### Common Shared Interfaces (already available — do not re-declare)

```typescript
// src/app/Global/Interface/common-interface.ts
export interface SelectInterface { text: string; value: string; }
export class CGuid { guid: string = ''; }
export class TableRecordInfo { enteredBy: string = ''; entryDate: string = ''; modifiedBy: string = ''; modifiedDate: string = ''; }
export class CommonAutocompleteRequest { tableName: string = ''; columnName: string = ''; searchParam: string = ''; }
export class CommonCourseTypeRequest { courseType: string = ''; }
export class CommonCourseTypeAndDepartmentCodeRequest { courseType: string = ''; departmentCode: string = ''; }
export class CommonCourseCodeRequest { courseCode: string = ''; }
export class CommonSemesterYearRequest { semester: string = ''; }
```

---

## 2. Component Class Pattern

### Imports

```typescript
import { Component, OnInit } from '@angular/core';
import { ITableSettings } from 'src/app/Shared/framework/table/table.model';
import { GlobalService } from 'src/app/Global/Service/global.service';
import { FrameworkService } from 'src/app/Shared/framework/framework.service';
import { IModalSettings } from 'src/app/Shared/framework/model/model';
// Import your feature model:
import { SaveFeesTypeRequest, FeesTypeListResponse } from 'src/app/Modules/Fees/Managefees/FeesType';
```

### Component Class Structure

```typescript
@Component({
  selector: 'app-FeatureName',
  templateUrl: './FeatureName.component.html',
  styleUrls: ['./FeatureName.component.scss']
})
export class FeatureNameComponent implements OnInit {

  // 1. Request model instance
  public request: SaveFeesTypeRequest = new SaveFeesTypeRequest();

  // 2. Table settings (if the page has a table)
  public tableSettings: ITableSettings = { /* see section 3 */ };

  // 3. API trigger flag
  public triggerTableAPI: boolean = true;

  // 4. Response data holder
  public dataList: FeesTypeListResponse[] = [];

  constructor(
    private globalService: GlobalService,
    private frameworkService: FrameworkService
  ) {}

  ngOnInit(): void {}

  // 5. Table response handler
  onTableResponse(response: any): void {
    this.dataList = response ?? [];
  }

  // 6. Post-save: reset form and reload table
  onSaveSuccess(): void {
    this.triggerTableAPI = true;
    this.request = new SaveFeesTypeRequest();
  }

  // 7. Edit row handler (if table has edit button)
  onEditClick(row: FeesTypeListResponse): void {
    this.request.feesTypeDescription = row.feesDescription;
    // populate other fields
  }
}
```

---

## 3. ITableSettings Configuration

### Minimal Table

```typescript
public tableSettings: ITableSettings = {
  showFotter: false,
  showPagination: true,
  jsonData: undefined,
  shorting: true,
  slno: true,
  checkbox: false,
  columns: [
    { title: 'Name', data: 'columnName', short: true, width: 30 },
    { title: 'Date', data: 'entryDate', type: 'date', width: 15 },
  ],
  columnSticky: [0, 1],
  headerSticky: true,
  filter: true,
};
```

### Table with Action Buttons

```typescript
{
  title: 'Action',
  data: 'Mat-Action',
  width: 20,
  buttongroup: [
    {
      button: true,
      buttondata: 'sysid',
      buttons: ['info', 'toggle', 'history'],
      // 'click' format: 'history|TableName|pkColumn|'
      click: ['history|FeesType|sysid|'],
      // 'toggle' format: 'pkColumn|apiUrl|pkColumn|ConfirmMessage'
      toggle: ['sysid|/FeesType/DeleteFeesType|sysid|Change Status...'],
    },
  ],
}
```

### Table with Delete Button

```typescript
buttons: ['edit', 'delete'],
// 'delete' format: 'pkColumn|apiUrl|pkColumn|ConfirmMessage'
delete: ['sysid|/FeesType/DeleteFeesType|sysid|Delete this record?'],
```

### Conditional Row Styling

```typescript
rowCallback: [
  {
    columnname: 'status',
    value: 'Paid',
    class: 'text-success fw-bold',
  },
  {
    columnname: 'amount',
    value: 0,
    class: 'text-danger',
    excludeColumns: ['studentName', 'date'],  // skip styling these columns
  },
],
```

### IColumnDef Type Reference

| Property | Type | Description |
|----------|------|-------------|
| `title` | string | Column header text |
| `data` | string | Property name from response object; use `'Mat-Action'` for action column |
| `class` | string | CSS class applied to cells |
| `short` | boolean | Enable sorting on this column |
| `width` | number | Column width (relative units) |
| `type` | `'decimal'` / `'date'` / `'datetime'` | Format the cell value |
| `buttongroup` | object | Action buttons config |
| `conditionalClass` | `IConditionalClass[]` | Dynamic cell styling |

---

## 4. Modal Usage

### Confirm/Delete Modal

```typescript
// In component:
openDeleteModal(id: number): void {
  const settings: IModalSettings = {
    isModalVisible: true,
    headerMessage: 'Confirm Delete',
    bodyMessage: 'Are you sure you want to delete this record?',
    note: '',
    parameter: id,
    api: '/FeesType/DeleteFeesType',
    targetHTML: null,
    modalId: 'deleteConfirmModal',
    formId: '',
    validationGroup: '',
    isDeleteForm: true,
    buttonGroup: null,
    modalSize: 'sm',
    responseOkAction: (response) => { this.onDeleteSuccess(); },
  };
  this.globalService.OpenModal(settings);
}
```

```html
<!-- In template: -->
<fw-model id="deleteConfirmModal"></fw-model>
```

### Form Modal

```typescript
openFormModal(): void {
  const settings: IModalSettings = {
    isModalVisible: true,
    headerMessage: 'Edit Record',
    bodyMessage: '',
    note: '',
    parameter: null,
    api: '/FeesType/UpdateFeesType',
    targetHTML: null,
    modalId: 'editFormModal',
    formId: 'EditForm',
    validationGroup: 'EditForm',
    isDeleteForm: false,
    buttonGroup: null,
    modalSize: 'md',
    getInputParameter: () => this.editRequest,
    responseOkAction: (response) => { this.onUpdateSuccess(); },
  };
  this.globalService.OpenModal(settings);
}
```

---

## 5. FrameworkService Utility Methods

```typescript
// HTTP calls (framework handles interceptors and toast)
this.frameworkService.GetData('/api/endpoint', params).subscribe(res => { });
this.frameworkService.PostData('/api/endpoint', body).subscribe(res => { });

// Utility
const diff: number = this.frameworkService.dayDiff(fromDate, toDate);
const titled: string = this.frameworkService.toTitleCase('hello world');
const base64: string = await this.frameworkService.fileToBase64(file);
```

---

## 6. Form Validation Pattern

Validation is driven by the `validationgroup` input on `fw-*` components and the `fw-button`'s `validationgroup` input. They must match the `<form id>`.

```html
<form id="AddFeesForm">
  <fw-textbox entity="name" validationgroup="AddFeesForm" ...></fw-textbox>
  <fw-button validationgroup="AddFeesForm" apiUrl="..." ...></fw-button>
</form>
<fw-errortag></fw-errortag>
```

No manual validation code is needed in the component — `FormValidationService` handles it.

---

## 7. IMenuItem (for fw-accordion)

```typescript
import { IMenuItem } from 'src/app/Shared/framework/accordion/accordion.model';

public menuItems: IMenuItem[] = [
  { label: 'Manage Fees', icon: 'payments', route: '/fees/manage', children: [] },
  { label: 'Collect Fees', icon: 'receipt', route: '/fees/collect', children: [] },
];
```

---

## 8. File/Module Registration

After creating a component:

1. Declare in the feature module (e.g., `FeesModule` or `SmsModule`).
2. Add route to the feature routing module.
3. Import `SharedModule` (which re-exports all `fw-*` components) in the feature module.

```typescript
// feature.module.ts
imports: [SharedModule, ...],
declarations: [NewFeatureComponent],
```
