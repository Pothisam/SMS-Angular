# SMS-Angular — Claude Code Project Guide

## Project Overview

School Management System (SMS) built with Angular. It has two main areas: **Fees** and **SMS (Student Management)**. All UI is built from reusable framework components located in `src/app/Shared/framework/`.

## Key Rule: Always Use Framework Components

When creating any page, you **must** use components from `src/app/Shared/framework/`. Never use raw `<input>`, `<button>`, or `<select>` elements — use `fw-*` components instead. Even for a single card wrapper, use `<fw-card>`.

## Documentation

| File | What It Covers |
|------|---------------|
| [docs/HTML-PATTERNS.md](docs/HTML-PATTERNS.md) | All `fw-*` component selectors, inputs, outputs, and HTML usage examples |
| [docs/TS-PATTERNS.md](docs/TS-PATTERNS.md) | TypeScript patterns: component class structure, model usage, table settings, event handling |
| [docs/CSS-PATTERNS.md](docs/CSS-PATTERNS.md) | SCSS conventions, global utility classes, layout grid usage, component-level styles |

## Folder Structure

```
src/app/
├── Area/
│   ├── Fees/               Feature pages for the Fees module
│   │   ├── CollectFees/
│   │   ├── Dashboard/
│   │   ├── ManageFees/
│   │   ├── Report/
│   │   └── User/
│   └── SMS/                Feature pages for the SMS module
│       ├── Dashboard/
│       ├── Management/
│       ├── Report/
│       ├── Staff/
│       ├── Student/
│       └── User/
├── Global/
│   ├── Interface/          Shared interfaces (SelectInterface, CGuid, etc.)
│   └── Service/            Global services
├── Modules/                Domain model classes (request/response)
│   ├── Document/
│   ├── Fees/
│   ├── SMS/
│   └── Staff/
└── Shared/
    ├── framework/          Reusable fw-* UI components  ← USE THESE
    ├── common/
    ├── guard/
    └── interceptor/
```

## Creating a New Page — Checklist

1. **Model first**: Create request/response classes in `src/app/Modules/<Area>/<Feature>/`.
2. **Component class**: Inject `FrameworkService` if needed; instantiate model; configure `ITableSettings` if the page has a table.
3. **Template**: Use `fw-*` components only. Wrap layout in `<mat-card>` → `<form id="...">` → Bootstrap grid.
4. **Styles**: Keep component SCSS minimal. Use global utilities from `src/assets/CSS/`.
5. **Module/Routing**: Register the component in the correct area module and add a route.

## Services to Know

| Service | Location | Purpose |
|---------|----------|---------|
| `FrameworkService` | `src/app/Shared/framework/` | HTTP calls, day-diff, title-case, file conversion |
| `GlobalService` | `src/app/Global/Service/` | Area detection, date formatting, modal management |
| `FormValidationService` | `src/app/Shared/formValidation.service.ts` | Validate form groups before API submission |
| `BadgeService` | `src/app/Shared/framework/` | Error badge notifications |
