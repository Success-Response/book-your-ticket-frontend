// eslint-disable-next-line consistent-return
const errorHandler = (e, message = false) => {
  // FIXME
  // if (e instanceof TypeError) {
  if (e?.name === 'TypeError') {
    return 'Something went wrong';
  }

  // FIXME
  // if (e instanceof Response) {
  if (e?.status) {
    switch (e.status) {
      case 404:
        return `${message} not found`;
      case 401:
        return 'Something went wrong';
      default:
        break;
    }
  }
};

export default errorHandler;
