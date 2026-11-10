# RQ-790 Student Registration Form — Test Strategy

**Product:** Rex Jones II · **Application under test:** https://ui.rexjones2.com/practice-form
**Explored:** 2026-11-10, live DOM via Playwright MCP · **Requirement source:** [RQ-790-requirement.md](RQ-790-requirement.md) (stand-in; Spira was unreachable)
**BDD plan:** [RQ-790-student-registration.feature](RQ-790-student-registration.feature)

---

## 1. What the live application actually does

| Area | Observed behavior |
|---|---|
| Layout | 11 inputs: `#first_name`, `#last_name`, gender radios (`data-testid` male/female/other), `#mobile`, `#email`, Date of birth (react-datepicker), `#current_address`, 5 language checkboxes (ids `Java`, `Python`, `JavaScript`, `TypeScript`, `C#`), Country / State / City `<select>`s, Submit button |
| Required markers | `*` shown on First name, Last name, Gender, Programming language. No field carries the HTML `required` attribute. |
| Empty submit | Inline errors only for **"First Name is a required field"** and **"Last Name is a required field"**. |
| Missing Gender or Language | Submit is blocked and shows **"Gender is a required field"** / **"Programming Language is a required field"** (rendered as `<p>`, unlike the name errors). *Corrected 2026-11-10 — first pass missed these.* |
| Success | Modal **"Thanks for submitting the form"** with a LABEL / VALUES table of all 11 fields; closable via **Close** button, the **X** icon, or clicking the overlay. **Esc** did not close it in testing. |
| After closing | Form keeps all entered values (no reset). |
| Backend | No submit request is sent: the only network calls are `GET /data/locations/{Country}/states.json` and `.../{state}.json`. Submission is client-side only. |
| Mobile | `maxlength=10`, but accepts **letters and symbols** (`abc12!@#45`) and fewer than 10 digits (`12345`) — submit still succeeds. |
| Email | No format validation: `not-an-email` and `a@b` submit successfully. |
| Names | Whitespace-only First name (`"   "`) passes required check. 300-character names accepted. HTML (`<b>X</b>`) is rendered as literal text in the summary (escaped — good). |
| Date of birth | Calendar opens on the current month (Nov 2026), has year/month dropdowns, **no disabled dates** — future DOB (e.g. 12/25/2030) accepted. Garbage text (`hello`) is cleared on blur. Display format: `10 November, 2026`. |
| Country cascade | India → 37 states/UTs, Canada → 13 provinces/territories, USA → 50 states. Cities load per state. Changing Country resets State and City to the placeholder. |
| Optional address fields | Country / State / City are all optional — submitting Country without State/City succeeds. |
| Console | `404` on `/images/logo.png` (header logo broken). |
| Locator hazards | `getByRole('checkbox', {name:'Java'})` also matches *JavaScript*; `getByRole('radio', {name:'Male'})` also matches *Female*; the modal has two "Close" buttons. Use `exact: true`, ids, or `data-testid`. |

---

## 2. Requirement gaps and missing business logic (for the PO / BA)

| # | Gap | Evidence | Risk |
|---|---|---|---|
| G-01 | ~~Gender and Programming language have no error message~~ **Withdrawn** — the messages exist. Remaining gap: their markup (`<p>`) is inconsistent with the name errors (`<div aria-live="polite">`), so screen readers may not announce them. | `.playwright-cli/tc290-04-after-submit.yml` | Low (accessibility) |
| G-02 | **Mobile validation is undefined.** "10 Digits" is in the label only; letters, symbols and short numbers are accepted. | `abcdefghij`, `12345`, `555-123-45` all submit | High — bad contact data |
| G-03 | **Email has no format rule** and is not marked required. | `not-an-email` submits | High |
| G-04 | **Date of birth has no range rule** — future dates and today are allowed; no minimum/maximum age. | 12/25/2030 accepted | Medium |
| G-05 | **Whitespace-only names pass the required check.** No trimming, length or character rules. | `"   "` submits | Medium |
| G-06 | **No persistence or backend.** The requirement says "register", but nothing is saved or sent. | No POST/XHR on submit | High — clarify whether this is in scope |
| G-07 | **Post-submit behavior undefined** — form is not reset, so a second click submits duplicates. | Values remain after Close | Medium |
| G-08 | **Country / State / City optionality undefined** — a partial address (Country only) is accepted. | Skip State/City → success | Low–Medium |
| G-09 | **Country list is limited to India, Canada, USA** with no "Other". | Dropdown options | Medium — excludes students |
| G-10 | **Mandatory indicator inconsistency** — First/Last name show errors, Gender/Language don't; no `required`/`aria-required` attributes for assistive tech. | DOM attributes | Medium (accessibility) |
| G-11 | **No max lengths** on names or address. | 300 / 5000 chars accepted | Low |
| G-12 | **Error message wording** is not specified ("First Name" vs label "First name"). | Copy mismatch | Low |
| G-13 | **No duplicate-registration rule** (same email/mobile twice). | N/A — no backend | Depends on G-06 |
| G-14 | Broken header logo (`/images/logo.png` → 404). | Console error | Low (cosmetic) |

---

## 3. Clarifying questions for the product team

**Validation**
1. What exact error message should appear when Gender or Programming language is missing, and where?
2. Mobile: digits only? Exactly 10? Country code allowed? Should the format depend on the selected Country?
3. Is Email required? Which format rule (RFC-lite, domain allow-list)?
4. Date of birth: allowed range? Minimum age (e.g. 16+)? Is a future date ever valid?
5. Names: allowed characters (hyphens, apostrophes, accents, non-Latin scripts)? Min/max length? Trim whitespace?
6. Should errors show on blur, on submit, or both? Should focus move to the first invalid field?

**Behavior**
7. What should happen after a successful submit — reset the form, redirect, or keep values?
8. Should the success dialog close on **Esc**? (Currently it does not.)
9. Is a partial address (Country without State/City) acceptable? Should State and City become required once Country is chosen?
10. Should "Other" gender allow free text?
11. Is there a maximum number of programming languages?
12. Should the DOB field accept typed input, and in which format (`MM/DD/YYYY` vs the displayed `D Month, YYYY`)?

**Scope / data**
13. Is the registration meant to be persisted? If so, which API and what is the success/failure contract?
14. Should duplicate registrations (same email or mobile) be blocked?
15. Will more countries be added, or an "Other" option?
16. Accessibility target (WCAG 2.1 AA?) — mandatory fields need `aria-required` and announced errors.

---

## 4. Prioritized regression structure

### P0 — Critical paths (smoke; run on every build)
| ID | Scenario |
|---|---|
| Scenario-001 | Submit with all fields valid → confirmation dialog shows every value |
| Scenario-002 | Submit with only mandatory fields → confirmation dialog, optional rows blank |
| Scenario-003 | Empty submit → First/Last name required errors |
| Scenario-004 | Missing Gender blocks submission |
| Scenario-005 | Missing Programming language blocks submission |
| Scenario-006 | Country → State → City cascade populates correctly |
| Scenario-007 | Close the confirmation dialog |

### P1 — Functional variations
| ID | Scenario |
|---|---|
| Scenario-008 – 010 | Each gender option is reflected in the summary (Outline) |
| Scenario-011 | Gender radios are mutually exclusive |
| Scenario-012 | Multiple programming languages are listed |
| Scenario-013 – 015 | Each country loads its own states (Outline: India 37, Canada 13, USA 50) |
| Scenario-016 | Changing Country resets State and City |
| Scenario-017 | Pick Date of birth from the calendar → displayed as `D Month, YYYY` |
| Scenario-018 | Dialog closes via X icon and via overlay click |
| Scenario-019 | Required error clears once the field is filled |
| Scenario-020 | Form keeps values after the dialog closes (current behavior — confirm with PO, G-07) |

### P2 — Edge cases and negative paths
| ID | Scenario |
|---|---|
| Scenario-021 | Mobile rejects non-digit characters *(expected to FAIL today — G-02)* |
| Scenario-022 | Mobile shorter than 10 digits is rejected *(FAIL today — G-02)* |
| Scenario-023 | Mobile is capped at 10 characters |
| Scenario-024 – 026 | Invalid email formats rejected *(FAIL today — G-03)* |
| Scenario-027 | Whitespace-only First name rejected *(FAIL today — G-05)* |
| Scenario-028 | Future Date of birth rejected *(FAIL today — G-04)* |
| Scenario-029 | Free-text garbage in DOB is cleared |
| Scenario-030 | HTML in names is shown as text, not rendered |
| Scenario-031 | Very long name / address values are handled |
| Scenario-032 | Esc closes the confirmation dialog *(FAIL today — question 8)* |
| Scenario-033 | Error shown for missing Gender / Language *(passes — G-01 withdrawn)* |
| Scenario-034 | No console errors on page load *(FAIL today — G-14)* |

Scenarios marked *FAIL today* encode the **expected** behavior and are tagged `@gap` in the
feature file. Keep them out of the blocking pipeline (`--grep-invert @gap`) until the PO
confirms the rule, then promote them.

---

## 5. Automation notes
- Use stable locators: `#first_name`, `#last_name`, `#mobile`, `#email`, `#current_address`,
  `getByTestId('male'|'female'|'other')`, `#Java` / `[id="C#"]`, `.react-datepicker-wrapper input`.
- Radios and checkboxes are visually styled; `check({ force: true })` was needed.
- Scope the dialog: `page.getByRole('dialog')`; use `getByText('Close', { exact: true })` vs `getByLabel('Close')`.
- Location lists come from `/data/locations/...json` — mock them with `page.route` for deterministic cascade tests.
- Date picker opens on the current month — pick dates via the year/month dropdowns, not by index.
