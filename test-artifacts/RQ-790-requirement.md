# RQ-790 — Student Registration Form (STAND-IN)

> **This is not the real RQ-790.** The Spira instance
> (`https://demo-us.spiraservice.net/test-for-success`) returned HTTP 404 and its host reports
> the trial has expired, so the requirement could not be retrieved. This stand-in was written
> from the field labels and asterisks on the live page so the planning exercise can run.
> Replace it with the Spira text once access is restored and re-run the gap analysis.

| Field | Value |
|---|---|
| Product | Rex Jones II |
| Requirement ID | RQ-790 (stand-in) |
| Name | Student Registration Form |
| Type | Feature |
| Application URL | https://ui.rexjones2.com/automation-practice-form (redirects to `/practice-form`) |

## Description

As a prospective student, I want to register my details through a Student Registration Form
so that the school has my contact and course-preference information.

## Acceptance criteria (as implied by the UI)

1. The form collects: First name\*, Last name\*, Gender\* (Male / Female / Other), Mobile (10 digits),
   Email, Date of birth, Current Address, Programming language\* (Java, Python, JavaScript,
   TypeScript, C#), Country, State / Province, City / County.
2. Fields marked \* are mandatory.
3. Mobile accepts 10 digits.
4. State / Province options depend on the selected Country; City / County options depend on the
   selected State / Province.
5. On successful submit, the user sees a confirmation summarizing the submitted values.
