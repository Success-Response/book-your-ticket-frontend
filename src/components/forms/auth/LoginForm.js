import { Form, Formik, Field, ErrorMessage } from 'formik';
import * as yup from 'yup';

const validation = () =>
  yup.object({
    email: yup
      .string()
      .email('Please provide a valid email address')
      .required('Please provide an email address'),
    password: yup
      .string()
      .min(6, 'The password must be at least 6 characters')
      .required('Please provide a password'),
  });

const LoginForm = () => {
  return (
    <Formik
      initialValues={{ email: '', password: '' }}
      validationSchema={validation}
    >
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
              <ErrorMessage
                name="email"
                component="div"
                data-testid="email-error"
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
              <ErrorMessage
                name="password"
                component="div"
                data-testid="password-error"
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
