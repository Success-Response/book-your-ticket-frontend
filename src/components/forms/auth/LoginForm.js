import { Form, Formik, Field, ErrorMessage } from 'formik';
import * as yup from 'yup';
import useFetch from 'hooks/useFetch';
import { useEffect } from 'react';
import { useRouter } from 'next/router';

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
  const { state, setData, setError, response } = useFetch();
  const { error, loading } = state;

  const handleSubmit = async (values) => {
    if (!loading) {
      try {
        setData('POST', '/api/auth/login', { ...values });
      } catch (e) {
        setError(e?.message || 'Something went wrong');
      }
    }
  };

  useEffect(() => {
    if (response && !error) {
      const router = useRouter();
      router.push('/');
    }
  });

  return (
    <Formik
      initialValues={{ email: '', password: '' }}
      validationSchema={validation}
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
                {loading ? 'Submitting...' : 'Login'}
              </button>
            </div>
            <div>{error && <div data-testid="login-error">{error}</div>}</div>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default LoginForm;
