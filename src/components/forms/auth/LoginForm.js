import { Form, Formik, Field, ErrorMessage } from 'formik';
import useFetch from 'hooks/useFetch';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import errorHandler from 'lib/errorHandler';
import { loginFormValidation } from 'lib/validationSchemas';

const LoginForm = () => {
  const { setRequestParams, response } = useFetch();
  const { loading, error, data } = response;

  const handleSubmit = async (values) => {
    if (!loading) {
      setRequestParams('POST', '/api/auth/login', { ...values });
    }
  };

  useEffect(() => {
    if (data && !error) {
      const router = useRouter();
      router.push('/');
    }
  }, [data, error]);

  return (
    <Formik
      initialValues={{ email: '', password: '' }}
      validationSchema={loginFormValidation}
      onSubmit={handleSubmit}
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
                placeholder="your password"
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
                {loading ? 'Submitting...' : 'Login'}
              </button>
            </div>
            <div>
              {error && (
                <div data-testid="login-error">{errorHandler(error)}</div>
              )}
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default LoginForm;
