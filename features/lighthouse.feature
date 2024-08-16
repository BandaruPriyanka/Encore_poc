@regression
Feature: LightHouse Operations

  Scenario: Checking the search functionality
    Given I am on the lighthouse login page
    When I am login with a valid email and password
    Then I see the search input
    Then I changed the location and search with invalid data
    Then I search with valid phrase and validate the result
    Then I change the date with the text phrase and check the search input
    Then I click on the cross icon previous flowsheet is restored
    Then I perform scrolling
    Then I check search Case-insensitive
    
  Scenario: Checking the Status and Group functionalities in flowsheet
    Given I am on the lighthouse page login
    When Login with valid email id and password
    Then Search the job number for details
    Then Hover on the flowsheet card
    Then Check the selected date should equal to current date
    Then Reload the page and check the status is save

  Scenario: Test the mood change logic
    Given I am on the lighthouse login page
    When I am login with a valid email and password
    Then I search for the room
    Then I click on the room see the mood change icon
    Then I click on the mood change icon mood modal is displayed
    Then I click on happy icon and check the validations
    Then I click on neutral icon and check the validations
    Then I click on angry icon and check the validations