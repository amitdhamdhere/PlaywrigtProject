Feature: Login functionality

  Scenario: User logs in successfully with valid credentials
    Given the user is on the Practice Test Automation login page
    When the user enters a valid username as "student"
    And the user enters a valid password as "Password123"
    And the user clicks on the login button
    Then the user should see the login success message "Logged In Successfully"

  Scenario: User logs in successfully with valid credentials
    Given the user is on the Practice Test Automation login page
    When the user enters a valid username as "student"
    And the user enters a valid password as "Password123"
    And the user clicks on the login button
    Then the user should see the login success message "Logged In Successfully"
