import { test, expect } from '@playwright/test';
// FIXME - tidy up/remove commented code
// import { Common } from '../../../support/common';

// const { step, describe, beforeEach, afterEach } = test;
const { step, describe, afterEach } = test;
// let common = false;

describe('AgentProperties page', () => {
  // beforeEach(({ page }) => {
  //   common = new Common(page);
  // });

  afterEach(async ({ page }) => {
    // common.unMockApiResponse();
    await page.close();
    // common = null;
  });

  test('I want see a suitable error message when I visit the agent properties page and the application fails to get the properties', async ({
    page,
  }) => {
    // common.stubApiResponse('**/dev/agents/1/properties', 404, {
    //   message: 'Not found',
    // });

    await page.route('**/dev/agents/1/properties', (route) => {
      route.fulfill({
        status: 404,
        body: JSON.stringify({ message: 'Not found' }),
      });
    });

    await step(
      'Given I visit the properties page of a specific agent',
      async () => {
        await page.goto('/agents/1/properties');
        await expect(page).toHaveTitle('Agent Properties');
        await expect(page.getByTestId('agent-properties-page')).toBeVisible();
      }
    );

    await step(
      'Then I see a suitable error message if the backend request fails',
      async () =>
        expect(page.getByTestId('agent-properties-error')).toHaveText(
          'Properties not found'
        )
    );
  });
});
