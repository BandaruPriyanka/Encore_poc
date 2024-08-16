@Opportunity
@createData1
Feature: Opportunity Page
  
  Scenario: create an Oppurtunity
    Given I am on the login page
    When I login with email and password
    # Then I see the profile button
    Then I click on compass
    Then I create new oppurtunity
    Then I click on plus button to navigation
