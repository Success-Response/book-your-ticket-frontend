// eslint-disable-next-line consistent-return
const errorHandler = (e, message = false) => {
  let response = 'Something went wrong';
  // FIXME
  // if (e instanceof TypeError) {
  //   return response;
  // }

  if (e instanceof Response) {
    switch (e.status) {
      case 404:
        response = message ? `${message} not found` : response;
        break;
      case 401:
        response = 'You are unable to access this resource';
        break;
      default:
        break;
    }
  }
  return response;
};

export default errorHandler;
