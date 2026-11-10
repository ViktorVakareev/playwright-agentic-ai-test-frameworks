# RQ-790 Student Registration Form — BDD Test Plan
# Product: Rex Jones II | AUT: https://ui.rexjones2.com/practice-form
# Requirement: stand-in (Spira unreachable) — see RQ-790-requirement.md
# Tags: @P0 critical path | @P1 functional variation | @P2 edge/negative
#       @gap = expected behavior NOT implemented today; pending PO/BA confirmation

@RQ-790 @student-registration
Feature: Student Registration Form
  As a prospective student
  I want to submit my details through the Student Registration Form
  So that the school receives my contact and course-preference information

  Background:
    Given I open the Student Registration Form page

  # ===================== P0 — Critical paths =====================

  # Scenario-001
  @P0 @smoke
  Scenario: Submit the form with all fields valid
    When I enter "Ann" as First name and "Lee" as Last name
    And I select the "Female" gender
    And I enter "5551234567" as Mobile and "ann@example.com" as Email
    And I pick "5 November, 2006" as Date of birth from the calendar
    And I enter "1 Main St" as Current Address
    And I check the "Python" programming language
    And I select "USA", then "Texas", then "Abernathy" as Country, State and City
    And I click Submit
    Then the "Thanks for submitting the form" dialog is displayed
    And the dialog shows "Student Name" as "Ann Lee"
    And the dialog shows "Student Email" as "ann@example.com"
    And the dialog shows "Gender" as "Female"
    And the dialog shows "Mobile" as "5551234567"
    And the dialog shows "Date of Birth" as "5 November, 2006"
    And the dialog shows "Address" as "1 Main St"
    And the dialog shows "Programming Language" as "Python"
    And the dialog shows "Country" as "USA", "State / Province" as "Texas" and "City / County" as "Abernathy"

  # Scenario-002
  @P0 @smoke
  Scenario: Submit with only the mandatory fields
    When I enter "Ann" as First name and "Lee" as Last name
    And I select the "Male" gender
    And I check the "Java" programming language
    And I click Submit
    Then the "Thanks for submitting the form" dialog is displayed
    And the dialog shows "Student Name" as "Ann Lee"
    And the Email, Mobile, Date of Birth, Address, Country, State and City rows are empty

  # Scenario-003
  @P0 @smoke
  Scenario: Submitting an empty form shows required-field errors
    When I click Submit
    Then I see the error "First Name is a required field"
    And I see the error "Last Name is a required field"
    And the confirmation dialog is not displayed

  # Scenario-004
  @P0
  Scenario: Missing Gender blocks submission
    Given I have filled every field except Gender
    When I click Submit
    Then the confirmation dialog is not displayed

  # Scenario-005
  @P0
  Scenario: Missing Programming language blocks submission
    Given I have filled every field except Programming language
    When I click Submit
    Then the confirmation dialog is not displayed

  # Scenario-006
  @P0 @smoke
  Scenario: Country, State and City dropdowns cascade
    When I select "Canada" as Country
    Then the State / Province list contains "Alberta" and "Ontario"
    When I select "Alberta" as State / Province
    Then the City / County list contains "Calgary" and "Edmonton"

  # Scenario-007
  @P0
  Scenario: Close the confirmation dialog with the Close button
    Given I have submitted the form with valid mandatory fields
    When I click the "Close" button in the dialog
    Then the confirmation dialog is no longer displayed

  # ===================== P1 — Functional variations =====================

  # Scenario-008 / Scenario-009 / Scenario-010
  @P1
  Scenario Outline: Each gender option is reflected in the confirmation
    Given I have entered valid mandatory fields except Gender
    When I select the "<gender>" gender
    And I click Submit
    Then the dialog shows "Gender" as "<gender>"

    Examples:
      | id           | gender |
      | Scenario-008 | Male   |
      | Scenario-009 | Female |
      | Scenario-010 | Other  |

  # Scenario-011
  @P1
  Scenario: Gender options are mutually exclusive
    When I select the "Male" gender
    And I select the "Other" gender
    Then only "Other" is selected

  # Scenario-012
  @P1
  Scenario: Multiple programming languages are listed in the confirmation
    Given I have entered valid mandatory fields except Programming language
    When I check "Java", "TypeScript" and "C#"
    And I click Submit
    Then the dialog shows "Programming Language" containing "Java", "TypeScript" and "C#"
    And "JavaScript" is not listed

  # Scenario-013 / Scenario-014 / Scenario-015
  @P1
  Scenario Outline: Each country loads its own states or provinces
    When I select "<country>" as Country
    Then the State / Province list has <count> options besides the placeholder
    And it contains "<sample>"

    Examples:
      | id           | country | count | sample         |
      | Scenario-013 | India   | 37    | Maharashtra    |
      | Scenario-014 | Canada  | 13    | Quebec         |
      | Scenario-015 | USA     | 50    | California     |

  # Scenario-016
  @P1
  Scenario: Changing Country resets State and City
    Given I have selected "USA", "Texas" and a city
    When I change Country to "India"
    Then State / Province shows "Select State / Province:"
    And City / County shows "Select City / County:"

  # Scenario-017
  @P1
  Scenario: Pick Date of birth from the calendar
    When I open the Date of birth calendar
    And I choose year "2000", month "March" and day "15"
    Then the Date of birth field shows "15 March, 2000"

  # Scenario-018
  @P1
  Scenario Outline: Close the confirmation dialog in other ways
    Given I have submitted the form with valid mandatory fields
    When I <action>
    Then the confirmation dialog is no longer displayed

    Examples:
      | action                             |
      | click the X icon in the dialog     |
      | click the overlay outside the dialog |

  # Scenario-019
  @P1
  # Note: errors are re-evaluated on Submit only — typing or blurring does not clear them.
  Scenario: Required error clears after the field is filled and the form is resubmitted
    Given I clicked Submit on an empty form
    When I enter "Ann" as First name
    Then the error "First Name is a required field" is still shown
    When I click Submit
    Then the error "First Name is a required field" is no longer shown

  # Scenario-020
  @P1 @confirm-with-PO
  Scenario: Form keeps the entered values after the dialog is closed
    Given I have submitted the form with valid mandatory fields
    When I close the confirmation dialog
    Then First name still shows "Ann"
    And the "Java" checkbox is still checked

  # ===================== P2 — Edge cases & negative paths =====================

  # Scenario-021
  @P2 @gap
  Scenario: Mobile rejects non-digit characters
    Given I have entered valid mandatory fields
    When I enter "abcdefghij" as Mobile
    And I click Submit
    Then I see a Mobile validation error
    And the confirmation dialog is not displayed

  # Scenario-022
  @P2 @gap
  Scenario: Mobile with fewer than 10 digits is rejected
    Given I have entered valid mandatory fields
    When I enter "12345" as Mobile
    And I click Submit
    Then I see a Mobile validation error

  # Scenario-023
  @P2
  Scenario: Mobile is limited to 10 characters
    When I type "123456789012345" into Mobile
    Then Mobile contains "1234567890"

  # Scenario-024 / Scenario-025 / Scenario-026
  @P2 @gap
  Scenario Outline: Invalid email formats are rejected
    Given I have entered valid mandatory fields
    When I enter "<email>" as Email
    And I click Submit
    Then I see an Email validation error

    Examples:
      | id           | email           |
      | Scenario-024 | not-an-email    |
      | Scenario-025 | a@b             |
      | Scenario-026 | ann@@example.com |

  # Scenario-027
  @P2 @gap
  Scenario: Whitespace-only First name is treated as empty
    Given I have entered valid mandatory fields
    When I enter "   " as First name
    And I click Submit
    Then I see the error "First Name is a required field"

  # Scenario-028
  @P2 @gap
  Scenario: Future Date of birth is rejected
    Given I have entered valid mandatory fields
    When I enter "12/25/2030" as Date of birth
    And I click Submit
    Then I see a Date of birth validation error

  # Scenario-029
  @P2
  Scenario: Free text in Date of birth is cleared
    When I type "hello" into Date of birth
    And I move focus to Email
    Then Date of birth is empty

  # Scenario-030
  @P2 @security
  Scenario: HTML in a name is displayed as plain text
    Given I have entered valid mandatory fields
    When I enter "<b>X</b>" as First name
    And I click Submit
    Then the dialog shows "Student Name" as the literal text "<b>X</b> Lee"

  # Scenario-031
  @P2
  Scenario: Very long values are handled without breaking the layout
    Given I have entered valid mandatory fields
    When I enter a 300-character First name and a 5000-character Current Address
    And I click Submit
    Then the confirmation dialog is displayed and remains readable

  # Scenario-032
  @P2 @gap
  Scenario: Esc closes the confirmation dialog
    Given I have submitted the form with valid mandatory fields
    When I press "Escape"
    Then the confirmation dialog is no longer displayed

  # Scenario-033
  @P2 @gap
  Scenario: Missing Gender and Programming language show error messages
    Given I have entered "Ann" as First name and "Lee" as Last name
    When I click Submit
    Then I see a Gender required error
    And I see a Programming language required error

  # Scenario-034
  @P2 @gap
  Scenario: Page loads without console errors
    Then the browser console has no errors
