import { test, expect } from '@playwright/test';
import { getAgentPropertiesSuccess } from '../../support/apiResponseBody';

const { step, describe, beforeEach } = test;

beforeEach(async ({ page }) => {
  await page.goto('/agents/1/properties');
});

const assertAgentPropertiesPage = async (page) => {
  await expect(page).toHaveTitle('Agent Properties');
  await expect(page.getByTestId('agent-properties-page')).toBeVisible();
};

describe.only('AgentProperties page', () => {
  test('I want see a suitable error message if an agent has not listed any properties', async ({
    page,
  }) => {
    const apiRoute = '**/api/agents/1/properties';

    await page.route(apiRoute, (route) => {
      route.fulfill({
        status: 404,
        statusText: 'Not Found',
      });
    });

    await step(
      'Given I visit the properties page of a specific agent',
      async () => {
        await assertAgentPropertiesPage(page);
      }
    );

    await step(
      'Then I see a suitable error message if the backend request fails',
      async () => {
        await expect(page.getByTestId('error')).toHaveText(
          'Properties not found'
        );
        expect(page.getByTestId('loading')).toBeHidden();
        expect(page.getByTestId('success')).toBeHidden();
      }
    );

    await page.unroute(apiRoute);
  });

  test('As any user, I want to view all the properties listed by an agent', async ({
    page,
  }) => {
    const apiRoute = '**/api/agents/1/properties';
    const { message } = getAgentPropertiesSuccess;

    await page.route(apiRoute, (route) => {
      route.fulfill({
        status: 200,
        body: JSON.stringify(getAgentPropertiesSuccess),
      });
    });

    await step(
      'Given I visit the properties page of a specific agent',
      async () => {
        await assertAgentPropertiesPage(page);
      }
    );

    await step(
      'Then I see a list of all currently available properties',
      async () => {
        await expect(page.getByTestId('success')).toBeVisible();
        await expect(page.locator(`text=${message}`)).toBeVisible();
        expect(page.getByTestId('error')).toBeHidden();
        expect(page.getByTestId('loading')).toBeHidden();
        await expect(page.locator('.agent-property')).toHaveCount(2);
      }
    );

    await page.unroute(apiRoute);
  });
});
