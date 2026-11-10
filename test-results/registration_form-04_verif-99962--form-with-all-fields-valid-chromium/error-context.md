# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: registration_form\04_verify-all-fields-valid.test.ts >> Student Registration Form >> Submit the form with all fields valid
- Location: tests\registration_form\04_verify-all-fields-valid.test.ts:8:3

# Error details

```
Test timeout of 30000ms exceeded.
```

```
Error: locator.fill: Test timeout of 30000ms exceeded.
Call log:
  - waiting for locator('#emails')
  - operation was aborted: Test timeout of 30000ms exceeded.

```

# Page snapshot

```yaml
- generic [ref=f2e1]:
  - generic [ref=f2e2]:
    - generic [ref=f2e3]:
      - img "Rex Jones II" [ref=f2e5]
      - generic [ref=f2e6]:
        - link "Courses" [ref=f2e7] [cursor=pointer]:
          - /url: https://www.rexjones2.com/courses/
        - link "Books" [ref=f2e8] [cursor=pointer]:
          - /url: https://www.rexjones2.com/book/
        - link "Login" [ref=f2e9] [cursor=pointer]:
          - /url: /login
    - generic [ref=f2e10]:
      - generic [ref=f2e12]:
        - link "Practice Form" [ref=f2e14] [cursor=pointer]:
          - /url: /practice-form
        - link "Practice AUT" [ref=f2e16] [cursor=pointer]:
          - /url: /practice-aut
        - generic [ref=f2e17]:
          - paragraph [ref=f2e18]: HTML Elements
          - heading [level=2] [ref=f2e20]:
            - link "Text Box" [ref=f2e21] [cursor=pointer]:
              - /url: /text-box
          - heading [level=2] [ref=f2e24]:
            - link "Buttons" [ref=f2e25] [cursor=pointer]:
              - /url: /buttons
          - heading [level=2] [ref=f2e28]:
            - link "Web Tables" [ref=f2e29] [cursor=pointer]:
              - /url: /webtables
          - heading [level=2] [ref=f2e32]:
            - link "Multiple Checkboxes" [ref=f2e33] [cursor=pointer]:
              - /url: /buttons-checkbox
          - heading [level=2] [ref=f2e36]:
            - link "Links" [ref=f2e37] [cursor=pointer]:
              - /url: /links
        - generic [ref=f2e39]:
          - paragraph [ref=f2e40]: Date Picker / Select
          - heading [level=2] [ref=f2e42]:
            - link "Date Picker" [ref=f2e43] [cursor=pointer]:
              - /url: /date-picker
          - heading [level=2] [ref=f2e46]:
            - link "Select Menu" [ref=f2e47] [cursor=pointer]:
              - /url: /select-menu
        - generic [ref=f2e49]:
          - paragraph [ref=f2e50]: Dynamic Waits
          - heading [level=2] [ref=f2e52]:
            - link "Dynamic Properties" [ref=f2e53] [cursor=pointer]:
              - /url: /dynamic-properties
          - heading [level=2] [ref=f2e56]:
            - link "Progress Bar" [ref=f2e57] [cursor=pointer]:
              - /url: /progress-bar
        - generic [ref=f2e59]:
          - paragraph [ref=f2e60]: Dialogs, Alerts, Windows, Frames
          - heading [level=2] [ref=f2e62]:
            - link "Modal Dialogs" [ref=f2e63] [cursor=pointer]:
              - /url: /modal-dialogs
          - heading [level=2] [ref=f2e66]:
            - link "Alerts" [ref=f2e67] [cursor=pointer]:
              - /url: /alerts
          - heading [level=2] [ref=f2e70]:
            - link "Browser Windows" [ref=f2e71] [cursor=pointer]:
              - /url: /browser-windows
          - heading [level=2] [ref=f2e74]:
            - link "IFrames" [ref=f2e75] [cursor=pointer]:
              - /url: /frames
        - generic [ref=f2e77]:
          - paragraph [ref=f2e78]: Actions
          - heading [level=2] [ref=f2e80]:
            - link "Slider" [ref=f2e81] [cursor=pointer]:
              - /url: /slider
          - heading [level=2] [ref=f2e84]:
            - link "Droppable" [ref=f2e85] [cursor=pointer]:
              - /url: /droppable
          - heading [level=2] [ref=f2e88]:
            - link "Tool Tip" [ref=f2e89] [cursor=pointer]:
              - /url: /tool-tips
          - heading [level=2] [ref=f2e92]:
            - link "Keyboard" [ref=f2e93] [cursor=pointer]:
              - /url: /keyboard
        - link "Shadow DOM" [ref=f2e96] [cursor=pointer]:
          - /url: /shadow-dom
        - link "Upload & Download" [ref=f2e98] [cursor=pointer]:
          - /url: /upload-download
        - generic [ref=f2e99]:
          - paragraph [ref=f2e100]: Book Store Application
          - heading [level=2] [ref=f2e102]:
            - link "Login" [ref=f2e103] [cursor=pointer]:
              - /url: /bookstore-login
          - heading [level=2] [ref=f2e106]:
            - link "Logout" [ref=f2e107] [cursor=pointer]:
              - /url: /bookstore-logout
          - heading [level=2] [ref=f2e110]:
            - link "Add User" [ref=f2e111] [cursor=pointer]:
              - /url: /add-user
          - heading [level=2] [ref=f2e114]:
            - link "Search Users" [ref=f2e115] [cursor=pointer]:
              - /url: /users
          - heading [level=2] [ref=f2e118]:
            - link "Add Book" [ref=f2e119] [cursor=pointer]:
              - /url: /add-book
          - heading [level=2] [ref=f2e122]:
            - link "Search Books" [ref=f2e123] [cursor=pointer]:
              - /url: /books
          - heading [level=2] [ref=f2e126]:
            - link "Book Store API" [ref=f2e127] [cursor=pointer]:
              - /url: https://api.rexjones2.com/api
      - generic [ref=f2e130]:
        - generic [ref=f2e131]:
          - heading "Practice Form" [level=2] [ref=f2e132]
          - paragraph [ref=f2e133]: Student Registration Form
        - generic [ref=f2e135]:
          - generic [ref=f2e136]:
            - group [ref=f2e137]:
              - paragraph [ref=f2e139]:
                - text: First name
                - generic [ref=f2e140]: "*"
              - textbox "First name" [ref=f2e142]: Ann
            - group [ref=f2e144]:
              - paragraph [ref=f2e146]:
                - text: Last name
                - generic [ref=f2e147]: "*"
              - textbox "Last name" [ref=f2e149]: Lee
          - generic [ref=f2e151]:
            - paragraph [ref=f2e152]:
              - text: Gender
              - generic [ref=f2e153]: "*"
            - generic [ref=f2e155]:
              - generic [ref=f2e156]:
                - radio "Male" [ref=f2e157]
                - text: Male
              - generic [ref=f2e158]:
                - radio "Female" [checked] [ref=f2e159]
                - text: Female
              - generic [ref=f2e160]:
                - radio "Other" [ref=f2e161]
                - text: Other
          - group [ref=f2e162]:
            - paragraph [ref=f2e164]: Mobile(10 Digits)
            - textbox "Mobile(10 Digits)" [active] [ref=f2e166]:
              - /placeholder: "Mobile(10 Digits) "
              - text: "5551234567"
          - group [ref=f2e168]:
            - paragraph [ref=f2e170]: Email
            - textbox "Email" [ref=f2e172]:
              - /placeholder: "Email "
          - generic [ref=f2e174]:
            - paragraph [ref=f2e175]: Date of birth
            - textbox [ref=f2e178]
          - group [ref=f2e179]:
            - paragraph [ref=f2e181]: Current Address
            - textbox "Current Address" [ref=f2e182]
          - generic [ref=f2e183]:
            - paragraph [ref=f2e184]:
              - text: Programming language
              - generic [ref=f2e185]: "*"
            - generic [ref=f2e186]:
              - checkbox "Java" [ref=f2e187]
              - generic [ref=f2e188]: Java
            - generic [ref=f2e189]:
              - checkbox "Python" [ref=f2e190]
              - generic [ref=f2e191]: Python
            - generic [ref=f2e192]:
              - checkbox "JavaScript" [ref=f2e193]
              - generic [ref=f2e194]: JavaScript
            - generic [ref=f2e195]:
              - checkbox "TypeScript" [ref=f2e196]
              - generic [ref=f2e197]: TypeScript
            - generic [ref=f2e198]:
              - checkbox "C#" [ref=f2e199]
              - generic [ref=f2e200]: C#
          - generic [ref=f2e201]:
            - paragraph [ref=f2e202]: Country
            - combobox [ref=f2e203]:
              - option "Select Country:" [selected]
              - option "India"
              - option "Canada"
              - option "USA"
          - generic [ref=f2e204]:
            - generic [ref=f2e205]:
              - paragraph [ref=f2e206]: State / Province
              - combobox [ref=f2e207]:
                - option "Select State / Province:" [selected]
            - generic [ref=f2e208]:
              - paragraph [ref=f2e209]: City / County
              - combobox [ref=f2e210]:
                - option "Select City / County:" [selected]
          - button "Submit" [ref=f2e212] [cursor=pointer]
  - alert [ref=f2e213]
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
  4   | export type ProgrammingLanguage = 'Java' | 'Python' | 'JavaScript' | 'TypeScript' | 'C#';
  5   | 
  6   | export class RegistrationPage {
  7   |   readonly page: Page;
  8   | 
  9   |   // Navigation
  10  |   readonly practiceFormLink: Locator;
  11  |   readonly heading: Locator;
  12  |   readonly subtitle: Locator;
  13  | 
  14  |   // Fields
  15  |   readonly firstNameField: Locator;
  16  |   readonly lastNameField: Locator;
  17  |   readonly mobileField: Locator;
  18  |   readonly emailField: Locator;
  19  |   readonly dateOfBirthField: Locator;
  20  |   readonly currentAddressField: Locator;
  21  |   readonly countrySelect: Locator;
  22  |   readonly stateSelect: Locator;
  23  |   readonly citySelect: Locator;
  24  |   readonly submitButton: Locator;
  25  | 
  26  |   // Validation errors
  27  |   readonly firstNameError: Locator;
  28  |   readonly lastNameError: Locator;
  29  | 
  30  |   // Created By AI — Date of birth calendar (required by Scenario-001)
  31  |   readonly datePickerCalendar: Locator;
  32  |   readonly datePickerYearSelect: Locator;
  33  |   readonly datePickerMonthSelect: Locator;
  34  | 
  35  |   // Confirmation dialog
  36  |   readonly confirmationDialog: Locator;
  37  |   readonly confirmationTitle: Locator;
  38  |   readonly dialogCloseButton: Locator;
  39  |   readonly dialogCloseIcon: Locator;
  40  | 
  41  |   constructor(page: Page) {
  42  |     this.page = page;
  43  | 
  44  |     this.practiceFormLink = page.getByRole('link', { name: 'Practice Form' });
  45  |     this.heading = page.getByRole('heading', { name: 'Practice Form' });
  46  |     this.subtitle = page.getByText('Student Registration Form', { exact: true });
  47  | 
  48  |     this.firstNameField = page.locator('#first_name');
  49  |     this.lastNameField = page.locator('#last_name');
  50  |     this.mobileField = page.locator('#mobile');
  51  |     this.emailField = page.locator('#emails');
  52  |     this.dateOfBirthField = page.locator('.react-datepicker-wrapper input');
  53  |     this.currentAddressField = page.locator('#current_address');
  54  |     // The three dropdowns have no id/name/label association, so they are matched by their placeholder option.
  55  |     this.countrySelect = page.locator('select').filter({ has: page.locator('option', { hasText: 'Select Country:' }) });
  56  |     this.stateSelect = page.locator('select').filter({ has: page.locator('option', { hasText: 'Select State / Province:' }) });
  57  |     this.citySelect = page.locator('select').filter({ has: page.locator('option', { hasText: 'Select City / County:' }) });
  58  |     this.submitButton = page.getByRole('button', { name: 'Submitd' });
  59  | 
  60  |     this.firstNameError = page.getByText('First Name is a required field');
  61  |     this.lastNameError = page.getByText('Last Name is a required field');
  62  | 
  63  |     // Created By AI — Date of birth calendar (required by Scenario-001)
  64  |     this.datePickerCalendar = page.locator('.react-datepicker');
  65  |     this.datePickerYearSelect = this.datePickerCalendar.locator('.react-datepicker__year-select');
  66  |     this.datePickerMonthSelect = this.datePickerCalendar.locator('.react-datepicker__month-select');
  67  | 
  68  |     this.confirmationDialog = page.getByRole('dialog');
  69  |     this.confirmationTitle = this.confirmationDialog.getByText('Thanks for submitting the form').first();
  70  |     this.dialogCloseButton = this.confirmationDialog.getByText('Close', { exact: true });
  71  |     this.dialogCloseIcon = this.confirmationDialog.getByLabel('Close');
  72  |   }
  73  | 
  74  |   public async goto(): Promise<void> {
  75  |     await this.page.goto('/practice-form');
  76  |   }
  77  | 
  78  |   public async clickPracticeForm(): Promise<void> {
  79  |     await this.practiceFormLink.click();
  80  |   }
  81  | 
  82  |   public async setFirstName(firstName: string): Promise<void> {
  83  |     await this.firstNameField.fill(firstName);
  84  |   }
  85  | 
  86  |   public async setLastName(lastName: string): Promise<void> {
  87  |     await this.lastNameField.fill(lastName);
  88  |   }
  89  | 
  90  |   /** Radios are visually styled, so a forced check is required. data-testid avoids "Male" matching "Female". */
  91  |   public async selectGender(gender: Gender): Promise<void> {
  92  |     await this.genderRadio(gender).check({ force: true });
  93  |   }
  94  | 
  95  |   public genderRadio(gender: Gender): Locator {
  96  |     return this.page.getByTestId(gender.toLowerCase());
  97  |   }
  98  | 
  99  |   public async setMobile(mobile: string): Promise<void> {
  100 |     await this.mobileField.fill(mobile);
  101 |   }
  102 | 
  103 |   public async setEmail(email: string): Promise<void> {
> 104 |     await this.emailField.fill(email);
      |                           ^ Error: locator.fill: Test timeout of 30000ms exceeded.
  105 |   }
  106 | 
  107 |   /** Types a date (e.g. "03/15/2000") and closes the calendar. */
  108 |   public async setDateOfBirth(date: string): Promise<void> {
  109 |     await this.dateOfBirthField.fill(date);
  110 |     await this.dateOfBirthField.press('Enter');
  111 |   }
  112 | 
  113 |   // Created By AI — pick Date of birth from the calendar (required by Scenario-001)
  114 |   /** Opens the calendar and picks a date, e.g. pickDateOfBirthFromCalendar(5, 'November', 2006). */
  115 |   public async pickDateOfBirthFromCalendar(day: number, month: string, year: number): Promise<void> {
  116 |     await this.dateOfBirthField.click();
  117 |     await this.datePickerCalendar.waitFor();
  118 |     await this.datePickerYearSelect.selectOption(String(year));
  119 |     await this.datePickerMonthSelect.selectOption({ label: month });
  120 |     await this.calendarDay(day, month, year).click();
  121 |   }
  122 | 
  123 |   // Created By AI — calendar day cell matched by its accessible label, e.g. "Choose Sunday, November 5th, 2006"
  124 |   public calendarDay(day: number, month: string, year: number): Locator {
  125 |     const suffix = day % 10 === 1 && day !== 11 ? 'st' : day % 10 === 2 && day !== 12 ? 'nd' : day % 10 === 3 && day !== 13 ? 'rd' : 'th';
  126 |     return this.datePickerCalendar.getByRole('option', { name: new RegExp(`, ${month} ${day}${suffix}, ${year}$`) });
  127 |   }
  128 | 
  129 |   public async setCurrentAddress(address: string): Promise<void> {
  130 |     await this.currentAddressField.fill(address);
  131 |   }
  132 | 
  133 |   /** Uses the element id, so "Java" never matches "JavaScript". */
  134 |   public async checkProgrammingLanguage(language: ProgrammingLanguage): Promise<void> {
  135 |     await this.programmingLanguageCheckbox(language).check({ force: true });
  136 |   }
  137 | 
  138 |   public programmingLanguageCheckbox(language: ProgrammingLanguage): Locator {
  139 |     return this.page.locator(`[id="${language}"]`);
  140 |   }
  141 | 
  142 |   public async selectCountry(country: string): Promise<void> {
  143 |     await this.countrySelect.selectOption({ label: country });
  144 |   }
  145 | 
  146 |   public async selectState(state: string): Promise<void> {
  147 |     await this.stateSelect.locator('option', { hasText: state }).waitFor({ state: 'attached' });
  148 |     await this.stateSelect.selectOption({ label: state });
  149 |   }
  150 | 
  151 |   public async selectCity(city: string): Promise<void> {
  152 |     await this.citySelect.locator('option', { hasText: city }).first().waitFor({ state: 'attached' });
  153 |     await this.citySelect.selectOption({ label: city });
  154 |   }
  155 | 
  156 |   public async clickSubmitButton(): Promise<void> {
  157 |     await this.submitButton.click();
  158 |   }
  159 | 
  160 |   /** Returns the value shown next to a label in the confirmation dialog, e.g. "Student Name". */
  161 |   public dialogValue(label: string): Locator {
  162 |     return this.confirmationDialog.getByRole('row').filter({ has: this.page.getByRole('cell', { name: label, exact: true }) }).getByRole('cell').nth(1);
  163 |   }
  164 | 
  165 |   public async closeConfirmationDialog(): Promise<void> {
  166 |     await this.dialogCloseButton.click();
  167 |   }
  168 | }
  169 | 
```