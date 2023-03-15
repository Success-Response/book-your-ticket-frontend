// eslint-disable-next-line func-names
export default function (e, message = false) {
  const defaultResponse = 'Something went wrong';
  let response = false;

  if (e instanceof TypeError) {
    response = defaultResponse;
  }

  if (e instanceof Response) {
    switch (e.status) {
      case 404:
        response = message ? `${message} not found` : defaultResponse;
        break;
      case 401:
        response = 'You are unable to access this resource';
        break;
      default:
        response = defaultResponse;
        break;
    }
  }
  return response;
}
