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

  test('FE / A validation message is displayed due to an email address in the wrong format', async ({
    page,
  }) => {
    await step('Given I am on the login page', async () => {
      await page.goto('/account/login');
      await expect(page).toHaveTitle('Login');
      await expect(page.getByTestId('login-page')).toBeVisible();
    });

    await step(
      'And I enter an email address in the wrong format i.e. "daveATemailDOTcom"',
      async () => {
        await page.getByTestId('email-input').fill('daveATemailDOTcom');
      }
    );

    await step('When I move to the password field', async () => {
      await page.getByTestId('password-input').focus();
    });

    await step(
      'Then a email validation error message is displayed under the email input field',
      async () => {
        await expect(page.getByTestId('email-error')).toBeVisible();
      }
    );
  });

  test('FE / A validation message is displayed if I move from the email address field to the password field without providing an email', async ({
    page,
  }) => {
    await step('Given I am on the login page', async () => {
      await page.goto('/account/login');
      await expect(page).toHaveTitle('Login');
      await expect(page.getByTestId('login-page')).toBeVisible();
    });

    await step(
      'And I select the email address field without entering and information',
      async () => {
        await page.getByTestId('email-input').focus();
      }
    );

    await step('When I move to the password field', async () => {
      await page.getByTestId('password-input').focus();
    });

    await step(
      'Then a email validation error message is displayed under the email input field',
      async () => {
        await expect(page.getByTestId('email-error')).toBeVisible();
      }
    );
  });

  test('FE / A validation message is displayed due to a password less than 6 characters', async ({
    page,
  }) => {
    await step('Given I am on the login page', async () => {
      await page.goto('/account/login');
      await expect(page).toHaveTitle('Login');
      await expect(page.getByTestId('login-page')).toBeVisible();
    });

    await step('And I enter a password less than 6 characters', async () => {
      await page.getByTestId('password-input').fill('pass');
    });

    await step('When I move away from the password field', async () => {
      await page.getByTestId('email-input').focus();
    });

    await step(
      'Then the following validation error message is displayed: The password must be at least 6 characters',
      async () => {
        await expect(page.getByTestId('password-error')).toHaveText(
          'The password must be at least 6 characters'
        );
      }
    );
  });

  test('FE / A validation message is displayed if I move away from the password field without providing some input', async ({
    page,
  }) => {
    await step('Given I am on the login page', async () => {
      await page.goto('/account/login');
      await expect(page).toHaveTitle('Login');
      await expect(page.getByTestId('login-page')).toBeVisible();
    });

    await step('And I select the password field', async () => {
      await page.getByTestId('password-input').focus();
    });

    await step(
      'When I move away from the password field without providing some input',
      async () => {
        await page.getByTestId('email-input').focus();
      }
    );

    await step(
      'Then the following validation error message is displayed: Please provide a password',
      async () => {
        await expect(page.getByTestId('password-error')).toHaveText(
          'Please provide a password'
        );
      }
    );
  });
});
