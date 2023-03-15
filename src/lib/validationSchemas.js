import * as yup from 'yup';

const methodOptions = ['GET', 'POST', 'DELETE'];

const fetchParamsValidation = () =>
  yup.object({
    method: yup
      .string()
      .required('Please provide a method')
      .test(
        'validate request method',
        `Please provide one of the following methods: ${methodOptions.join(
          ', '
        )}`,
        (value) => (value ? methodOptions.includes(value) : true)
      )
      .typeError(({ value }) => {
        return `The method parameter must be a string, ${typeof value} given`;
      }),
    path: yup
      .string()
      .required('Please provide a path')
      .typeError(({ value }) => {
        return `The path parameter must be a string, ${typeof value} given`;
      }),
    body: yup.string().when('method', {
      is: (val) => val === 'POST' || val === 'DELETE',
      then: yup
        .string()
        .required('Please provide a body')
        .test(
          'validate request body',
          'Please provide a body object for POST or DELETE requests',
          (value) => typeof JSON.parse(value) === 'object'
        ),
      otherwise: yup.string().notRequired(),
    }),
  });

const loginFormValidation = () =>
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

export { fetchParamsValidation, loginFormValidation };
