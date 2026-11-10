# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: registration_form\02_verify-validation-messages.test.ts >> Registration form - validation messages >> missing Gender and Programming language show error messages
- Location: tests\registration_form\02_verify-validation-messages.test.ts:68:3

# Error details

```
Error: expect(locator).toHaveCount(expected) failed

Locator:  locator('.chakra-form__error-message')
Expected: 2
Received: 0
Timeout:  3000ms

Call log:
  - Expect "toHaveCount" locator('.chakra-form__error-message') with timeout 3000ms
  - waiting for locator('.chakra-form__error-message')
    10 × locator resolved to 0 elements
       - unexpected value "0"

```

# Page snapshot

```yaml
- generic [ref=e1]:
  - generic [ref=e2]:
    - generic [ref=e3]:
      - img "Rex Jones II" [ref=e5]
      - generic [ref=e6]:
        - link "Courses" [ref=e7] [cursor=pointer]:
          - /url: https://www.rexjones2.com/courses/
        - link "Books" [ref=e8] [cursor=pointer]:
          - /url: https://www.rexjones2.com/book/
        - link "Login" [ref=e9] [cursor=pointer]:
          - /url: /login
    - generic [ref=e10]:
      - generic [ref=e12]:
        - link "Practice Form" [ref=e14] [cursor=pointer]:
          - /url: /practice-form
        - link "Practice AUT" [ref=e16] [cursor=pointer]:
          - /url: /practice-aut
        - generic [ref=e17]:
          - paragraph [ref=e18]: HTML Elements
          - heading [level=2] [ref=e20]:
            - link "Text Box" [ref=e21] [cursor=pointer]:
              - /url: /text-box
          - heading [level=2] [ref=e24]:
            - link "Buttons" [ref=e25] [cursor=pointer]:
              - /url: /buttons
          - heading [level=2] [ref=e28]:
            - link "Web Tables" [ref=e29] [cursor=pointer]:
              - /url: /webtables
          - heading [level=2] [ref=e32]:
            - link "Multiple Checkboxes" [ref=e33] [cursor=pointer]:
              - /url: /buttons-checkbox
          - heading [level=2] [ref=e36]:
            - link "Links" [ref=e37] [cursor=pointer]:
              - /url: /links
        - generic [ref=e39]:
          - paragraph [ref=e40]: Date Picker / Select
          - heading [level=2] [ref=e42]:
            - link "Date Picker" [ref=e43] [cursor=pointer]:
              - /url: /date-picker
          - heading [level=2] [ref=e46]:
            - link "Select Menu" [ref=e47] [cursor=pointer]:
              - /url: /select-menu
        - generic [ref=e49]:
          - paragraph [ref=e50]: Dynamic Waits
          - heading [level=2] [ref=e52]:
            - link "Dynamic Properties" [ref=e53] [cursor=pointer]:
              - /url: /dynamic-properties
          - heading [level=2] [ref=e56]:
            - link "Progress Bar" [ref=e57] [cursor=pointer]:
              - /url: /progress-bar
        - generic [ref=e59]:
          - paragraph [ref=e60]: Dialogs, Alerts, Windows, Frames
          - heading [level=2] [ref=e62]:
            - link "Modal Dialogs" [ref=e63] [cursor=pointer]:
              - /url: /modal-dialogs
          - heading [level=2] [ref=e66]:
            - link "Alerts" [ref=e67] [cursor=pointer]:
              - /url: /alerts
          - heading [level=2] [ref=e70]:
            - link "Browser Windows" [ref=e71] [cursor=pointer]:
              - /url: /browser-windows
          - heading [level=2] [ref=e74]:
            - link "IFrames" [ref=e75] [cursor=pointer]:
              - /url: /frames
        - generic [ref=e77]:
          - paragraph [ref=e78]: Actions
          - heading [level=2] [ref=e80]:
            - link "Slider" [ref=e81] [cursor=pointer]:
              - /url: /slider
          - heading [level=2] [ref=e84]:
            - link "Droppable" [ref=e85] [cursor=pointer]:
              - /url: /droppable
          - heading [level=2] [ref=e88]:
            - link "Tool Tip" [ref=e89] [cursor=pointer]:
              - /url: /tool-tips
          - heading [level=2] [ref=e92]:
            - link "Keyboard" [ref=e93] [cursor=pointer]:
              - /url: /keyboard
        - link "Shadow DOM" [ref=e96] [cursor=pointer]:
          - /url: /shadow-dom
        - link "Upload & Download" [ref=e98] [cursor=pointer]:
          - /url: /upload-download
        - generic [ref=e99]:
          - paragraph [ref=e100]: Book Store Application
          - heading [level=2] [ref=e102]:
            - link "Login" [ref=e103] [cursor=pointer]:
              - /url: /bookstore-login
          - heading [level=2] [ref=e106]:
            - link "Logout" [ref=e107] [cursor=pointer]:
              - /url: /bookstore-logout
          - heading [level=2] [ref=e110]:
            - link "Add User" [ref=e111] [cursor=pointer]:
              - /url: /add-user
          - heading [level=2] [ref=e114]:
            - link "Search Users" [ref=e115] [cursor=pointer]:
              - /url: /users
          - heading [level=2] [ref=e118]:
            - link "Add Book" [ref=e119] [cursor=pointer]:
              - /url: /add-book
          - heading [level=2] [ref=e122]:
            - link "Search Books" [ref=e123] [cursor=pointer]:
              - /url: /books
          - heading [level=2] [ref=e126]:
            - link "Book Store API" [ref=e127] [cursor=pointer]:
              - /url: https://api.rexjones2.com/api
      - generic [ref=e130]:
        - generic [ref=e131]:
          - heading "Practice Form" [level=2] [ref=e132]
          - paragraph [ref=e133]: Student Registration Form
        - generic [ref=e135]:
          - generic [ref=e136]:
            - group [ref=e137]:
              - paragraph [ref=e139]:
                - text: First name
                - generic [ref=e140]: "*"
              - textbox "First name" [ref=e142]: Ann
            - group [ref=e144]:
              - paragraph [ref=e146]:
                - text: Last name
                - generic [ref=e147]: "*"
              - textbox "Last name" [ref=e149]: Lee
          - generic [ref=e151]:
            - paragraph [ref=e152]:
              - text: Gender
              - generic [ref=e153]: "*"
            - generic [ref=e154]:
              - generic [ref=e155]:
                - generic [ref=e156]:
                  - radio "Male" [ref=e157]
                  - text: Male
                - generic [ref=e158]:
                  - radio "Female" [ref=e159]
                  - text: Female
                - generic [ref=e160]:
                  - radio "Other" [ref=e161]
                  - text: Other
              - paragraph [ref=e162]: Gender is a required field
          - group [ref=e163]:
            - paragraph [ref=e165]: Mobile(10 Digits)
            - textbox "Mobile(10 Digits)" [ref=e167]:
              - /placeholder: "Mobile(10 Digits) "
          - group [ref=e169]:
            - paragraph [ref=e171]: Email
            - textbox "Email" [ref=e173]:
              - /placeholder: "Email "
          - generic [ref=e175]:
            - paragraph [ref=e176]: Date of birth
            - textbox [ref=e179]
          - group [ref=e180]:
            - paragraph [ref=e182]: Current Address
            - textbox "Current Address" [ref=e183]
          - generic [ref=e184]:
            - paragraph [ref=e185]:
              - text: Programming language
              - generic [ref=e186]: "*"
            - generic [ref=e187]:
              - checkbox "Java" [ref=e188]
              - generic [ref=e189]: Java
            - generic [ref=e190]:
              - checkbox "Python" [ref=e191]
              - generic [ref=e192]: Python
            - generic [ref=e193]:
              - checkbox "JavaScript" [ref=e194]
              - generic [ref=e195]: JavaScript
            - generic [ref=e196]:
              - checkbox "TypeScript" [ref=e197]
              - generic [ref=e198]: TypeScript
            - generic [ref=e199]:
              - checkbox "C#" [ref=e200]
              - generic [ref=e201]: C#
            - paragraph [ref=e202]: Programming Language is a required field
          - generic [ref=e203]:
            - paragraph [ref=e204]: Country
            - combobox [ref=e205]:
              - option "Select Country:" [selected]
              - option "India"
              - option "Canada"
              - option "USA"
          - generic [ref=e206]:
            - generic [ref=e207]:
              - paragraph [ref=e208]: State / Province
              - combobox [ref=e209]:
                - option "Select State / Province:" [selected]
            - generic [ref=e210]:
              - paragraph [ref=e211]: City / County
              - combobox [ref=e212]:
                - option "Select City / County:" [selected]
          - button "Submit" [active] [ref=e214] [cursor=pointer]
  - alert [ref=e215]
  - generic:
    - region "Notifications-top"
    - region "Notifications-top-left"
    - region "Notifications-top-right"
    - region "Notifications-bottom-left"
    - region "Notifications-bottom"
    - region "Notifications-bottom-right"
```

# Test source

```ts
  1  | import { test, expect } from '@playwright/test';
  2  | import { RegistrationPage } from '../../page_objects/RegistrationPage';
  3  | 
  4  | test.describe('Registration form - validation messages', () => {
  5  |   let registrationPage: RegistrationPage;
  6  | 
  7  |   test.beforeEach(async ({ page }) => {
  8  |     registrationPage = new RegistrationPage(page);
  9  |     await registrationPage.goto();
  10 |   });
  11 | 
  12 |   test('empty submit shows First Name and Last Name required errors', async () => {
  13 |     await registrationPage.clickSubmitButton();
  14 | 
  15 |     await expect(registrationPage.firstNameError).toBeVisible();
  16 |     await expect(registrationPage.lastNameError).toBeVisible();
  17 |     await expect(registrationPage.confirmationDialog).toBeHidden();
  18 |   });
  19 | 
  20 |   test('only Last Name error remains when First Name is filled', async () => {
  21 |     await registrationPage.setFirstName('Ann');
  22 |     await registrationPage.clickSubmitButton();
  23 | 
  24 |     await expect(registrationPage.firstNameError).toBeHidden();
  25 |     await expect(registrationPage.lastNameError).toBeVisible();
  26 |   });
  27 | 
  28 |   test('only First Name error remains when Last Name is filled', async () => {
  29 |     await registrationPage.setLastName('Lee');
  30 |     await registrationPage.clickSubmitButton();
  31 | 
  32 |     await expect(registrationPage.firstNameError).toBeVisible();
  33 |     await expect(registrationPage.lastNameError).toBeHidden();
  34 |   });
  35 | 
  36 |   // Validation runs on submit only: typing or blurring does not clear the error (confirm with PO).
  37 |   test('required error clears after the field is filled and the form is resubmitted', async () => {
  38 |     await registrationPage.clickSubmitButton();
  39 |     await expect(registrationPage.firstNameError).toBeVisible();
  40 | 
  41 |     await registrationPage.setFirstName('Ann');
  42 |     await expect(registrationPage.firstNameError).toBeVisible();
  43 | 
  44 |     await registrationPage.clickSubmitButton();
  45 |     await expect(registrationPage.firstNameError).toBeHidden();
  46 |   });
  47 | 
  48 |   test('missing Gender blocks submission', async () => {
  49 |     await registrationPage.setFirstName('Ann');
  50 |     await registrationPage.setLastName('Lee');
  51 |     await registrationPage.checkProgrammingLanguage('Java');
  52 |     await registrationPage.clickSubmitButton();
  53 | 
  54 |     await expect(registrationPage.confirmationDialog).toBeHidden();
  55 |   });
  56 | 
  57 |   test('missing Programming language blocks submission', async () => {
  58 |     await registrationPage.setFirstName('Ann');
  59 |     await registrationPage.setLastName('Lee');
  60 |     await registrationPage.selectGender('Male');
  61 |     await registrationPage.clickSubmitButton();
  62 | 
  63 |     await expect(registrationPage.confirmationDialog).toBeHidden();
  64 |   });
  65 | 
  66 |   // Known gap G-01 (see test-artifacts/RQ-790-test-strategy.md): the form blocks submission
  67 |   // but shows no message for Gender or Programming language. Remove .fail once fixed.
  68 |   test('missing Gender and Programming language show error messages', async ({ page }) => {
  69 |     test.fail(true, 'G-01: no error message is shown for Gender / Programming language');
  70 |     await registrationPage.setFirstName('Ann');
  71 |     await registrationPage.setLastName('Lee');
  72 |     await registrationPage.clickSubmitButton();
  73 | 
> 74 |     await expect(page.locator('.chakra-form__error-message')).toHaveCount(2, { timeout: 3000 });
     |                                                               ^ Error: expect(locator).toHaveCount(expected) failed
  75 |   });
  76 | });
  77 | 
```