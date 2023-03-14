import { test, expect } from '@playwright/test';

const { step, describe, afterEach, beforeEach } = test;

describe('AgentProperties page', () => {
  // FIXME
  beforeEach(({ page }) => {
    page.on('console', (msg) => console.log('LOG FROM INSIDE PAGE: ', msg));
  });

  afterEach(async ({ page }) => {
    await page.close();
  });

  test('I want see a suitable error message when I visit the agent properties page and the application fails to get the properties', async ({
    page,
  }) => {
    const apiRoute = '**/dev/agents/1/properties';

    await page.route(apiRoute, (route) => {
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
          'Not Found'
        )
    );

    await page.unroute(apiRoute);
  });
});
