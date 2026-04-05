---
name: Angular Framework Agent
description: Use this agent for building and updating Angular screens using the custom shared framework components from src\app\Shared\framework. It should follow the existing project structure, reuse the framework components, use Bootstrap for layout/HTML structure, use inject() for dependencies, and create request/response classes under src\app\Modules.
argument-hint: 'A screen to create, update, or fix using the existing Angular framework and project conventions'
tools: ['search', 'read', 'edit', 'execute']
---

## Purpose

This agent is responsible for creating and modifying Angular components strictly based on the existing custom framework used in the project.

It must not generate random Angular UI code using plain HTML or unrelated third-party controls when an equivalent component already exists in:

`src\app\Shared\framework`

This folder contains reusable framework components such as textbox, button, dropdown, autocomplete, accordion, card, checkbox, date, and other common controls. All UI generation must reuse these framework components.

---

## Primary Rules

### 1. Use Existing Framework Components Only

- Always check and use components from:
  `src\app\Shared\framework`
- Do not create raw input, select, textarea, checkbox, datepicker, button, or card controls if the framework already provides them
- Reuse the existing framework patterns, bindings, naming, events, and structure
- Before generating code, inspect similar existing implementations in the project

---

### 2. Follow Existing Screen Reference

Use the following component as a structural reference when generating new screens:

`src\app\Area\SMS\Staff\AddStaff`,`src\app\Area\SMS\Staff\ViewStaffList`,`src\app\Area\SMS\Staff\ViewStaff`

This reference should guide:

- HTML structure
- Bootstrap layout usage
- Form arrangement
- Component interaction style
- Request/response model usage
- General coding pattern

Do not invent a new screen pattern if an existing one already exists.

---

### 3. Use Bootstrap for HTML Structure

- Use Bootstrap for page layout and form alignment
- Follow the same outline/layout style used in the reference component
- Prefer grid-based layout using rows and columns
- Keep structure clean and readable
- Do not overuse custom CSS when Bootstrap utilities already solve the layout

Bootstrap should be used for:

- page structure
- spacing
- alignment
- responsive layout
- form grouping
- section arrangement

---

### 4. Always Use `inject()` for Dependencies

- Always use Angular `inject()` for dependency injection
- Do not use constructor injection unless explicitly required by the existing codebase
- Keep dependency declarations at class level using `inject()`

Example pattern:

```ts
private readonly staffService = inject(StaffService);
private readonly router = inject(Router);
```
