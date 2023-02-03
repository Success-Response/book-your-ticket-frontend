import { test, expect } from '@playwright/test';

const { step, describe } = test;

describe('Login / As a user I want to login to the application so that I can view the main dashboard', () => {
  test('FE / The login feature contains the correct components', async ({
    page,
  }) => {
    await step('Given I am on the login page', async () => {
      await page.goto('/account/login');
      await expect(page).toHaveTitle('Login');
      await expect(page.getByTestId('login-page')).toBeVisible();
    });

    await step(
      'Then I should see a title of "Login" and description of "Please enter your email and password"',
      async () => {
        await expect(page.getByTestId('page-title')).toHaveText('Login');
        await expect(page.getByTestId('page-description')).toHaveText(
          'Please enter your email and password'
        );
      }
    );

    await step('And an email field with label "Email"', async () => {
      await expect(page.getByTestId('email-label')).toHaveText('Email');
      await expect(page.getByTestId('email-input')).toBeVisible();
    });

    await step('And a password field with label “Password”', async () => {
      await expect(page.getByTestId('password-label')).toHaveText('Password');
      await expect(page.getByTestId('password-input')).toBeVisible();
    });

    await step('And a submit button with the copy "Login"', async () => {
      await expect(page.getByTestId('login-submit')).toHaveText('Login');
    });
  });
});
