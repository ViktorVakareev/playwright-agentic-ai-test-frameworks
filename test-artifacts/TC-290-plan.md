# TC:290 — Student Registration Form: Required Name Validation with Valid Email

## Application Overview

TC:290 (SpiraPlan, Type: Functional, Status: Ready for Test) verifies that the Student Registration Form
at https://ui.rexjones2.com shows "[Field Name] is a required field" messages beneath First name and
Last name when the form is submitted with only a valid Email entered.

**Source of criteria:** the Spira MCP server could not reach the instance (HTTP 404, trial expired), so the
steps below were transcribed from a screenshot of TC:290's Test Steps grid (Steps 1–5).
**Explored with:** `playwright-cli` on 2026-11-10. Snapshots saved to disk and used as the DOM reference:

| Snapshot | State |
|---|---|
| `.playwright-cli/tc290-01-login.yml` | Login page |
| `.playwright-cli/tc290-02-home.yml` | Home page after login |
| `.playwright-cli/tc290-03-practice-form.yml` | Practice Form, untouched |
| `.playwright-cli/tc290-04-after-submit.yml` | After Submit with only Email filled |

**Seed:** `tests/seed.spec.ts` (opens `/login`)

### SpiraPlan TC:290 criteria (as transcribed)

| Step | Description | Expected Result | Sample Data |
|---|---|---|---|
| 1 | Log into test application via https://ui.rexjones2.com/login with `${Username}` / `${Password}` | Home Page is displayed with multiple test pages: Practice Form, Practice AUT, HTML Elements, Date Picker / Select, Dynamic Waits, Dialogs, Alerts, Windows, Frames, Actions, Shadow DOM, Upload & Download, Book Store Application (API) | Username: Success · Password: Success3400 |
| 2 | Navigate to the Student Registration Form: click Practice Form, or open https://ui.rexjones2.com/practice-form | Practice Form / Student Registration Form is displayed | |
| 3 | Leave First Name and Last Name completely empty | Both fields remain empty with no validation errors displayed | |
| 4 | Enter a valid email (e.g. `RexAllenJones@GMail.com`) into Email | The email is valid | RexAllenJones@GMail.com |
| 5 | Click Submit | First name and Last name show "[Field Name] is a required field" beneath each empty field | |

---

## Section 1 — Primary Core Workflow

### 1. TC-290 Student Registration Form

**Seed:** `tests/seed.spec.ts`

#### 1.1. required-name-errors-with-valid-email

**File:** `tests/registration_form/TC-290.test.ts`

**Steps:**
  1. Log in at `/login` with Username "Success" and Password "Success3400"
    - expect: URL is `/homepage`
    - expect: links "Practice Form", "Practice AUT", "Shadow DOM", "Upload & Download" are visible
    - expect: section labels "HTML Elements", "Date Picker / Select", "Dynamic Waits", "Dialogs, Alerts, Windows, Frames", "Actions", "Book Store Application" are visible
  2. Click the "Practice Form" link
    - expect: URL is `/practice-form`
    - expect: heading "Practice Form" and text "Student Registration Form" are visible
  3. Leave First name and Last name empty
    - expect: First name and Last name are empty
    - expect: "First Name is a required field" and "Last Name is a required field" are not shown
  4. Type "RexAllenJones@GMail.com" into Email
    - expect: Email contains "RexAllenJones@GMail.com"
  5. Click Submit
    - expect: "First Name is a required field" is visible
    - expect: "Last Name is a required field" is visible
    - expect: the "Thanks for submitting the form" dialog is not shown

---

## Section 2 — Gap Analysis & Negative Scenarios (discovered in the live DOM — NOT automated in TC-290.test.ts)

### 2.1 Gaps between TC:290 and the live application

| # | TC:290 says | Live DOM / behavior | Recommendation |
|---|---|---|---|
| GAP-1 | Step 5 expects errors under **First name and Last name only** | Submit also shows **"Gender is a required field"** and **"Programming Language is a required field"** (`tc290-04-after-submit.yml`) | Update Step 5's expected result to list all four messages, or state explicitly that the other two are out of scope |
| GAP-2 | Step 4 expected "The email is valid" | Email is `type="text"` with no validation or visual feedback; any string is accepted. The expected result is not observable. | Reword to "Email field contains the entered value and no Email error is shown", or add an Email-format rule to the requirement |
| GAP-3 | Step 2 offers the direct URL as an equivalent route | `/practice-form` opens **without logging in** — Step 1 is not a precondition | Clarify whether the form should be auth-protected; if yes, add a negative step |
| GAP-4 | Expected result `[Field Name] is a required field` | Copy is "First Name" / "Last Name" (title case) while labels read "First name" / "Last name" | Confirm the exact message text in the requirement |
| GAP-5 | Not covered | Name errors are `<div aria-live="polite">`; Gender/Language errors are plain `<p>`. No input gets `aria-invalid` or `aria-describedby`. | Add an accessibility check; make error markup consistent |
| GAP-6 | Not covered | Errors are cleared only on the next Submit, not while typing | Define the expected clearing behavior |
| GAP-7 | Not covered | Login page prints the demo credentials on screen | Acceptable for a demo; flag for any non-demo environment |
| GAP-8 | Not covered | `document.title` is empty on every page | Add page titles; add a title assertion |
| GAP-9 | Step 1 expected list | After login the header shows **Logout** instead of Login | Add as an expected result to prove the session is active |

### 2.2 Additional negative / edge scenarios to add to Spira

| ID | Scenario | Priority |
|---|---|---|
| N-01 | Submit with an **invalid** email (`not-an-email`) + empty names → names errors shown; decide whether an Email error is required | P1 |
| N-02 | Submit with only First name filled → only "Last Name is a required field" shown | P1 |
| N-03 | Submit with only Last name filled → only "First Name is a required field" shown | P1 |
| N-04 | Whitespace-only names (`"   "`) → currently accepted; should be treated as empty | P2 |
| N-05 | Fill names after errors appear → errors persist until resubmit (GAP-6) | P2 |
| N-06 | Mixed-case email preserved exactly in the confirmation dialog | P2 |
| N-07 | Open `/practice-form` while logged out (GAP-3) | P1 |
| N-08 | Invalid login (`Success` / `bad`) → "Password must be at least 6 characters" | P1 |
| N-09 | Empty login → "Username is a required field", "Password is a required field" | P1 |
| N-10 | Gender and Programming Language errors appear and block submission (GAP-1) | P0 |
