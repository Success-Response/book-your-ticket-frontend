import { Form, Formik, Field } from 'formik';

const LoginForm = () => {
  return (
    <Formik initialValues={{ email: '', password: '' }}>
      {() => (
        <Form>
          <div data-testid="login-form">
            <div>
              <label htmlFor="email" data-testid="email-label">
                Email
              </label>
              <Field
                type="email"
                name="email"
                placeholder="you@email.com"
                data-testid="email-input"
              />
            </div>
            <div>
              <label htmlFor="password" data-testid="password-label">
                Password
              </label>
              <Field
                type="password"
                name="password"
                placeholder="you@email.com"
                data-testid="password-input"
              />
            </div>
            <div>
              <button type="submit" data-testid="login-submit">
                Login
              </button>
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default LoginForm;
