import Head from 'next/head';

import LoginForm from 'components/forms/auth/LoginForm';

const Login = () => {
  return (
    <>
      <Head>
        <title>Login</title>
        <meta name="description" content="Login page" />
      </Head>
      <div data-testid="login-page">
        <h1 data-testid="page-title">Login</h1>
        <p data-testid="page-description">
          Please enter your email and password
        </p>
        <LoginForm />
      </div>
    </>
  );
};

export default Login;
