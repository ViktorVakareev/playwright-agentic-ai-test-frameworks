# Created By AI
# RQ:795 Add Book Form Validation & Required Fields | User Story | Importance: 2 - High
# Release: 1.0.0.0 - TAU - Playwright & Agentic AI | AUT: https://ui.rexjones2.com/add-book
# Source: transcribed from a Spira screenshot (Spira MCP unreachable). Some text was hidden behind
#         the presenter's webcam; bracketed words are inferred: "[...]".
# DOM reference: .playwright-cli/rq795-01-add-book.yml, .playwright-cli/rq795-02-empty-submit.yml
#
# Gaps found during exploration (take to PO/BA):
#   GAP-795-1  AC1 lists 7 text fields; the form has 9. Pages shows "Pages must be a number" and
#              Publish Date shows "Publish Date must be a date" — neither is covered by RQ:795.
#   GAP-795-2  Publish Date's message is a <p> without aria-live; the other 8 are <div aria-live="polite">.
#   GAP-795-3  No input has `required` or `aria-invalid`; errors are not linked via aria-describedby.
#   GAP-795-4  No format rules defined for ISBN (10/13 digits?) or Website (URL?) — any text is accepted.
#   GAP-795-5  The page is reachable without a Book Store login (see RQ:796 GAP-796-1).

@RQ-795 @book-store
Feature: Add Book form validation and required fields
  As a Book Store Administrator
  I want the system to enforce data integrity on the "Add Book" form
  So that incomplete or corrupt records cannot be [saved]

  Background:
    Given I open the Add Book page

  # Scenario-001
  @P0 @smoke
  Scenario: Submitting an empty form shows a red required message under every text field and sends no API request
    When I click Submit
    Then I see these messages in red beneath their fields:
      | ISBN is a required field        |
      | Title is a required field       |
      | Sub Title is a required field   |
      | Author is a required field      |
      | Publisher is a required field   |
      | Description is a required field |
      | Website is a required field     |
    And no request is sent to the Book Store API

  # Scenario-002
  @P1
  Scenario: Pages and Publish Date show their own messages on an empty submit
    When I click Submit
    Then I see "Pages must be a number"
    And I see "Publish Date must be a date"

  # Scenario-003
  @P1
  Scenario Outline: Only the empty field is flagged
    Given I fill every field with valid data except "<field>"
    When I click Submit
    Then I see "<message>"
    And no request is sent to the Book Store API

    Examples:
      | field       | message                         |
      | ISBN        | ISBN is a required field        |
      | Title       | Title is a required field       |
      | Description | Description is a required field |
      | Website     | Website is a required field     |

  # Scenario-004
  @P2 @gap
  Scenario: Whitespace-only text is treated as empty
    Given I fill every field with valid data
    And I enter "   " as Title
    When I click Submit
    Then I see "Title is a required field"
