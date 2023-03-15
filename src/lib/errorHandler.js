const defaultMessage = {
  notFound: 'Resource not found',
};

// eslint-disable-next-line consistent-return
const errorHandler = (e, message = false) => {
  if (e instanceof TypeError) {
    return 'Something went wrong';
  }

  if (e instanceof Response) {
    switch (e.status) {
      case 404:
        return message ? `${message} not found` : defaultMessage.notFound;
      case 401:
        return 'Something went wrong';
      default:
        break;
    }
  }
};

export default errorHandler;
