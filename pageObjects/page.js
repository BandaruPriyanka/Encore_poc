module.exports = class Page {
  open(baseUrl) {
    return global.page.goto(baseUrl);
  }

  navigator(navigatorUrl){
    return global.page.goto(navigatorUrl);
  }
};
