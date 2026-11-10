# Created By AI
# RQ:796 Successful Catalog Entry Creation | User Story | Importance: 4 - Low
# Release: 1.0.0.0 - TAU - Playwright & Agentic AI | AUT: https://ui.rexjones2.com/add-book
# Source: transcribed from a Spira screenshot (Spira MCP unreachable). Bracketed words are inferred: "[...]".
# DOM reference: .playwright-cli/rq796-02-after-alert.yml, rq796-03-bookstore-login.yml
#   (no snapshot exists between Submit and the alert — the native alert blocks page access)
#
# Gaps found during exploration (take to PO/BA):
#   GAP-796-1  BLOCKER — Submitting a fully valid form sends POST https://api.rexjones2.com/api/books with
#              "Authorization: Bearer null" and the API returns 403 Forbidden. The record is NOT persisted,
#              yet the UI shows a "Success" alert and clears the form (false success). AC1 cannot pass
#              without a Book Store login, and no credentials are documented in RQ:796.
#   GAP-796-2  Publish Date off-by-one: picking 15 May 2024 sends "2024-05-14T21:00:00.000Z" (local date
#              serialized to UTC). The stored date depends on the browser's time zone.
#   GAP-796-3  Success feedback is a native window.alert("Success") — not part of the page, not accessible,
#              and does not say which book was added.
#   GAP-796-4  "Structurally valid information matching the field rules" — the field rules are not defined
#              (ISBN format, Website URL, Pages range, Publish Date range).
#   GAP-796-5  "Immediately available for searching" — no step defines how to verify it (Search Books page?).
#   GAP-796-6  Duplicate ISBN behavior is undefined.

@RQ-796 @book-store
Feature: Successful catalog entry creation
  As an Inventory Manager
  I want to successfully save fully completed book entries
  So that they are immediately available for system searching

  Background:
    Given I open the Add Book page

  # Scenario-001
  @P0 @smoke
  Scenario: Submitting all nine valid fields confirms success and clears the form
    When I fill all nine fields with valid data:
      | ISBN         | AI-TEST-<unique>                        |
      | Title        | Agentic Playwright Testing              |
      | Sub Title    | An AI-assisted guide                    |
      | Author       | Test Author                             |
      | Publisher    | Test Press                              |
      | Pages        | 250                                     |
      | Publish Date | 15 May, 2024 (picked from the calendar) |
      | Description  | Created by AI test run - safe to delete |
      | Website      | https://example.com/book                |
    And I click Submit
    Then a "Success" confirmation is shown
    And a create request carrying all nine values is sent to the Book Store API
    And every field is cleared

  # Scenario-002
  @P0 @blocked
  Scenario: The submitted book is persisted in the catalog
    Given I am logged in to the Book Store
    When I submit all nine fields with valid data
    Then the Book Store API responds with a success status
    And the book appears on the Search Books page

  # Scenario-003
  @P2 @gap
  Scenario: The picked Publish Date is sent without shifting a day
    When I pick 15 May 2024 as Publish Date and submit valid data
    Then the request carries publishDate "2024-05-15"
