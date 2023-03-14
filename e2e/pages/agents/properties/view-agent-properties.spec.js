import { test, expect } from '@playwright/test';
import { Common } from '../../../support/common';

const { step, describe, beforeEach } = test;
let common = false;

describe('<AgentProperties />', () => {
  beforeEach(({ page }) => {
    common = new Common(page);
  });

  test('I want see a suitable error message when I visit the agent properties page and the application fails to get the properties', async ({
    page,
  }) => {
    common.stubApiResponse('**/dev/agents/1/properties', 404, {
      message: 'Not found',
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
