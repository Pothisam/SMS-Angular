# HTML Patterns — Framework Component Reference

All components use the `fw-` prefix. Import them via `SharedModule` or the individual component module.

---

## Layout Wrapper

Every page form must follow this outer structure:

```html
<mat-card>
  <form id="UniqueFormId">
    <div class="row">
      <!-- inputs here -->
    </div>
    <div class="row mt-2">
      <!-- table here -->
    </div>
  </form>
</mat-card>
```

For a card without a form (view-only pages), use `<fw-card>` as the inner wrapper.

---

## fw-textbox

**Selector:** `fw-textbox`
**File:** `src/app/Shared/framework/textbox/`

```html
<fw-textbox
  entity="fieldName"
  label="Display Label"
  [isrequired]="true"
  maxlength="50"
  [min]="0"
  placeholder="Hint text"
  Case="U"
  [(modelValue)]="request.fieldName"
  validationgroup="FormId"
  [isdisabled]="false">
</fw-textbox>
```

| Input | Type | Description |
|-------|------|-------------|
| `entity` | string | Field name — used for validation messages |
| `label` | string | Floating label |
| `isrequired` | boolean | Marks field required |
| `maxlength` | number | Max character limit |
| `min` | number | Minimum value (for numeric) |
| `placeholder` | string | Placeholder hint |
| `Case` | `'U'` / `'L'` / `'T'` | Transform to Upper / Lower / Title case |
| `modelValue` | any | Two-way bound value |
| `validationgroup` | string | Links to `<form id>` for validation |
| `isdisabled` | boolean | Disables the field |
| `isNumberOnly` | boolean | Allows only numeric input |

---

## fw-password

**Selector:** `fw-password`
**File:** `src/app/Shared/framework/password/`

```html
<fw-password
  entity="password"
  label="Password"
  [isrequired]="true"
  maxlength="20"
  [(modelValue)]="request.password"
  validationgroup="LoginForm">
</fw-password>
```

---

## fw-email

**Selector:** `fw-email`
**File:** `src/app/Shared/framework/email/`

```html
<fw-email
  entity="emailAddress"
  label="Email Address"
  [isrequired]="true"
  maxlength="100"
  Case="L"
  [(modelValue)]="request.emailAddress"
  [showClearAll]="true">
</fw-email>
```

---

## fw-select

**Selector:** `fw-select`
**File:** `src/app/Shared/framework/select/`

### API-driven dropdown

```html
<fw-select
  apiUrl="/Master/GetCourseList"
  label="Course"
  [isrequired]="true"
  [(modelValue)]="request.courseFkId"
  [(modelText)]="request.courseName"
  validationgroup="FormId"
  (onSelectChange)="onCourseChange($event)">
</fw-select>
```

### Static JSON dropdown

```html
<fw-select
  [jsonData]="localArray"
  label="Status"
  [(modelValue)]="request.status"
  valueAndname="value,text">
</fw-select>
```

| Input | Type | Description |
|-------|------|-------------|
| `apiUrl` | string | Endpoint returning `{text, value}[]` |
| `jsonData` / `dataArray` | array | Local data array |
| `label` | string | Dropdown label |
| `isrequired` | boolean | Required validation |
| `isMultiSelect` | boolean | Enable multi-select |
| `modelValue` | any | Selected value (two-way) |
| `modelText` | string | Selected display text (two-way) |
| `parameter` | object | Extra params sent with API request |
| `valueAndname` | string | Comma-separated `value,text` property names for local data |
| `apicache` | boolean | Cache API response |
| `isFirstOptionEmpty` | boolean | Add blank first option |
| `isdisabled` | boolean | Disable control |
| `triggerAPI` | boolean | Manually re-trigger API call |
| `validationgroup` | string | Form validation group |
| `commaSeparatedString` | string | CSV string to prepopulate multi-select |

**Outputs:** `(onSelectChange)`, `(apiResponseChange)`, `(modelValueChange)`, `(modelTextChange)`

---

## fw-autocomplete

**Selector:** `fw-autocomplete`
**File:** `src/app/Shared/framework/autocomplete/`

```html
<fw-autocomplete
  apiUrl="/Student/SearchStudent"
  label="Student Name"
  [isrequired]="true"
  maxlength="100"
  Case="T"
  [(modelValue)]="request.studentName"
  [(selectedOptionValue)]="request.studentFkId"
  [parameter]="searchParam"
  valueAndname="value,text">
</fw-autocomplete>
```

---

## fw-date

**Selector:** `fw-date`
**File:** `src/app/Shared/framework/date/`

### Single date

```html
<fw-date
  label="Date of Birth"
  type="date"
  [isrequired]="true"
  [(modelValue)]="request.dob"
  validationgroup="FormId">
</fw-date>
```

### Date range

```html
<fw-date
  label="Date Range"
  type="date"
  [isrange]="true"
  [(startValue)]="request.fromDate"
  [(endValue)]="request.toDate"
  [showClearAll]="true"
  [(daydiff)]="dayDifference">
</fw-date>
```

| Input | Values | Description |
|-------|--------|-------------|
| `type` | `'date'` / `'month'` / `'year'` | Picker granularity |
| `isrange` | boolean | Enable range mode |
| `min` / `max` | string | Min/max date boundaries |
| `startValue` / `endValue` | string | Range two-way values |
| `modelValue` | string | Single date two-way value |
| `showClearAll` | boolean | Show clear button |
| `triggerdaydiff` | boolean | Emit day difference |
| `isdisabled` | boolean | Disable the control |

---

## fw-checkbox

**Selector:** `fw-checkbox`
**File:** `src/app/Shared/framework/checkbox/`

```html
<fw-checkbox
  label="Is Active"
  [(modelValue)]="request.isActive">
</fw-checkbox>
```

---

## fw-button

**Selector:** `fw-button`
**File:** `src/app/Shared/framework/button/`

```html
<fw-button
  label="Save"
  buttontype="P"
  apiUrl="/FeesType/SaveFeesType"
  [parameter]="request"
  validationgroup="FormId"
  (apiResponseSuccess)="onSaveSuccess($event)"
  (apiResponseChange)="onApiResponse($event)">
</fw-button>
```

| Input | Values | Description |
|-------|--------|-------------|
| `label` | string | Button text |
| `buttontype` | `'P'` / `'D'` / `'S'` | Primary / Danger / Secondary style |
| `apiUrl` | string | API endpoint to call on click |
| `parameter` | object | Request body sent to API |
| `loading` | boolean | External loading state |
| `isdisabled` | boolean | Disable button |
| `auth` | string | Permission key |
| `apicache` | boolean | Cache API response |
| `validationgroup` | string | Validate form before calling API |

**Outputs:** `(apiResponseSuccess)`, `(apiResponseChange)`, `(formvalidationtrue)`

---

## fw-table

**Selector:** `fw-table`
**File:** `src/app/Shared/framework/table/`

```html
<fw-table
  apiUrl="/FeesType/GetFeesType"
  [tableSettings]="tableSettings"
  [parameter]="filterRequest"
  [(triggerAPI)]="triggerTableAPI"
  (apiResponseChange)="onTableResponse($event)"
  [(matEditClick)]="editRowData"
  [(matDeleteClick)]="deleteRowData">
</fw-table>
```

See [docs/TS-PATTERNS.md](TS-PATTERNS.md) for `ITableSettings` configuration.

---

## fw-card

**Selector:** `fw-card`
**File:** `src/app/Shared/framework/card/`

Wrap any section that needs a card container — even single-field sections:

```html
<fw-card>
  <div class="row">
    <!-- content -->
  </div>
</fw-card>
```

---

## fw-download

**Selector:** `fw-download`
**File:** `src/app/Shared/framework/download/`

```html
<fw-download
  apiUrl="/Report/DownloadFeesReport"
  [parameter]="request"
  desc="Download PDF Report"
  icon="pdf">
</fw-download>
```

| `icon` values | `doc` / `pdf` / `excel` / `camera` / `idcard` / `print` / `info` |

---

## fw-file-upload

**Selector:** `fw-file-upload`
**File:** `src/app/Shared/framework/file-upload/`

```html
<fw-file-upload
  label="Upload Document"
  [filesize]="2"
  accept="document"
  [(filename)]="request.fileName"
  [(data)]="request.fileData"
  [(contenttype)]="request.contentType"
  apiUrl="/Document/UploadFile"
  [isrequired]="true"
  buttontype="S"
  validationgroup="FormId"
  (apiResponseSuccess)="onUploadSuccess($event)">
</fw-file-upload>
```

---

## fw-Image-upload

**Selector:** `fw-Image-upload`
**File:** `src/app/Shared/framework/Image-upload/`

```html
<fw-Image-upload
  [(guid)]="request.photoGuid"
  gender="M"
  [(filename)]="request.photoFileName"
  [(contenttype)]="request.photoContentType"
  [(url)]="photoUrl"
  [PK]="request.studentId"
  uploadto="Student">
</fw-Image-upload>
```

---

## fw-list-selector

**Selector:** `fw-list-selector`
**File:** `src/app/Shared/framework/list-selector/`

```html
<fw-list-selector
  apiUrl="/Master/GetColumnList"
  label="Select Columns"
  entity="columns"
  [parameter]="request"
  ColumnString="text"
  dataAttribute="value"
  [isDisabled]="false"
  (SelectedColumnsEvent)="onColumnsSelected($event)">
</fw-list-selector>
```

---

## fw-model (Modal)

**Selector:** `fw-model`
**File:** `src/app/Shared/framework/model/`

```html
<fw-model id="deleteConfirmModal"></fw-model>
```

Open from TypeScript via `GlobalService.OpenModal(settings)`. See [docs/TS-PATTERNS.md](TS-PATTERNS.md).

---

## fw-form-modal

**Selector:** `fw-form-modal`
**File:** `src/app/Shared/framework/model/`

```html
<fw-form-modal id="editFormModal"></fw-form-modal>
```

---

## fw-accordion

**Selector:** `fw-accordion`
**File:** `src/app/Shared/framework/accordion/`

```html
<fw-accordion
  [menuItems]="menuItems"
  (menuItemChange)="onMenuChange($event)">
</fw-accordion>
```

---

## fw-errortag

**Selector:** `fw-errortag`
**File:** `src/app/Shared/framework/errortag/`

Place once per page to display validation error list:

```html
<fw-errortag></fw-errortag>
```

---

## fw-toast

**Selector:** `fw-toast`
**File:** `src/app/Shared/framework/toast/`

Place once in the root layout (already in app shell). Driven by service — no inputs needed:

```html
<fw-toast></fw-toast>
```

---

## Standard Page Column Layout

Use Bootstrap grid. Consistent breakpoints across all pages:

```html
<div class="col-xs-12 col-sm-12 col-md-6 col-lg-4 col-xl-3">
  <!-- single field -->
</div>
```

Full-width (table, heading):
```html
<div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
</div>
```
