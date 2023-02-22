// playwright-dev-page.js
exports.Common = class Common {
  constructor(page) {
    this.page = page;
  }

  async stubApiResponse(path, status, body) {
    await this.page.route(path, (route) => {
      route.fulfill({
        status,
        body: JSON.stringify(body),
      });
    });
  }
};
