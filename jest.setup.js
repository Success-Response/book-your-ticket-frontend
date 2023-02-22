import 'whatwg-fetch';
import '@testing-library/jest-dom/extend-expect';

beforeAll(() => {
  global.fetch = jest.fn();
});
