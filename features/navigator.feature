@Navigator
@createData2
Feature: Navigator Operations

  Scenario: User creates and manages a new order
    Given I am on the navigator login page
    When I log in with a valid email and password
    When Create the new order
    When Click on jobs
    When Select the Items in the page
    Then Select the Labour items in the order