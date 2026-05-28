# CSS / SCSS Patterns

---

## Global Stylesheets

Located in `src/assets/CSS/`. These are imported globally in `angular.json` and apply to the entire app.

| File | Purpose |
|------|---------|
| `bootstrap.scss` | Bootstrap grid and utilities |
| `MatInput.scss` | Angular Material input overrides (transparent background, label position) |
| `scrollbar.scss` | Custom thin scrollbar for all scrollable areas |
| `ErrorTag.scss` | Styles for `<fw-errortag>` validation badge |
| `theme.scss` | Angular Material Indigo/Pink light + dark theme definition |

---

## Component-Level SCSS

Each component has its own `.scss` file. Keep it **minimal** — only styles that cannot be handled by global utilities or Bootstrap.

### File location

```
src/app/Area/<Module>/<Feature>/<FeatureName>.component.scss
```

### When to add component styles

Only add to the component `.scss` when:
- Overriding a specific Material column alignment (e.g., right-aligning a currency column).
- Styling a unique layout element that has no Bootstrap equivalent.

### When NOT to add component styles

- Do **not** re-define colors, font sizes, or spacing that Bootstrap or the Material theme already handles.
- Do **not** duplicate styles that exist in `MatInput.scss` or `scrollbar.scss`.

---

## Column Alignment Override (table columns)

Use `::ng-deep` to target generated Material table column classes from within a component stylesheet:

```scss
// Right-align a numeric column header
::ng-deep .mat-column-amount .mat-sort-header-container {
  justify-content: flex-end;
}

// Right-align multiple columns
::ng-deep .mat-column-debit .mat-sort-header-container,
::ng-deep .mat-column-credit .mat-sort-header-container {
  justify-content: flex-end;
}
```

The class name is `.mat-column-<data>` where `<data>` matches the `data` property in `IColumnDef`.

---

## Bootstrap Grid — Standard Breakpoints

Use these column classes consistently across all pages:

```html
<!-- Standard input field -->
<div class="col-xs-12 col-sm-12 col-md-6 col-lg-4 col-xl-3">

<!-- Half-width on large screens -->
<div class="col-xs-12 col-sm-12 col-md-6 col-lg-6 col-xl-6">

<!-- Full-width (table, header, notes) -->
<div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
```

Row spacing between sections:

```html
<div class="row">        <!-- first section (inputs) -->
<div class="row mt-2">  <!-- second section (table or additional inputs) -->
<div class="row mt-3">  <!-- larger gap -->
```

Button row vertical alignment:

```html
<div class="col-xs-12 col-sm-12 col-md-6 col-lg-4 col-xl-3 pt-3">
  <fw-button ...></fw-button>
</div>
```

---

## Material Card Background Variable

The card background color is available as a CSS variable for use inside modals or custom panels:

```scss
$CardBackgroundColor: var(--mat-card-elevated-container-color);

.modal-body .mat-mdc-card-content {
  background-color: $CardBackgroundColor !important;
}
```

---

## Scrollable Sidebar / Content Panel

Apply `.scrolldiv` (defined in `scrollbar.scss`) to any panel that should scroll vertically:

```html
<div class="scrolldiv">
  <!-- scrollable content -->
</div>
```

This class sets `overflow-y: auto`, `height: calc(100vh - 106px)`, and a custom 5 px scrollbar.

---

## Angular Material Input Overrides (already global)

`MatInput.scss` already handles:
- Transparent background on filled inputs.
- Correct floating label top position (`top: 45px`).
- Multi-select secondary text (`opacity: 0.75`, `font-size: 0.75em`).
- Modal body / footer background matching card color.

Do **not** re-declare these in component SCSS files.

---

## Dark Theme

The dark theme class `.dark-theme` is defined in `theme.scss` and toggled at the root element level. Component styles should rely on Material theme tokens (CSS variables) rather than hard-coded colors so they automatically adapt.

```scss
// Good — adapts to dark/light theme
color: var(--mat-sys-on-surface);

// Avoid — breaks in dark mode
color: #333333;
```

---

## Print Styles

For print receipts (e.g., `PrintCashReceipt`), isolate print rules in the component SCSS using `@media print`:

```scss
@media print {
  .no-print { display: none; }
  .print-full { width: 100% !important; }
}
```
