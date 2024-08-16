const reporter = require("cucumber-html-reporter");

(async () => {
  try {
    const options = {
      jsonDir: "reports/json", 
      // jsonFile: "reports/json/ui_cucumber_report.json",
      launchReport: false,
      noInlineScreenshots: false,
      screenshotsDirectory: "reports/screenshots/",
      output: "reports/ui/cucumber.html",
      reportSuiteAsScenarios: true,
      scenarioTimestamp: true,
      storeScreenshots: true,
      theme: "bootstrap",
      metadata: {
            "Test Environment": "STAGING",
            "Browser": "Chrome  122.0.6261.95 ",
            "Platform": "Windows 10",
            "Serial": "Scenarios",
            "Executed": "Remote"
        },
      failedSummaryReport: true,
    };
    reporter.generate(options);
  } catch (error) {
    console.error("Error occurred:", error);
  }
})();
