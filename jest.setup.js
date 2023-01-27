import 'whatwg-fetch';
import '@testing-library/jest-dom/extend-expect';

// mock fetch
global.fetch = jest.fn();

const spies = {
  fetch: jest.spyOn(global, 'fetch'), // check if our tests make API requests (they should not)
};

// throw errors in test runs if a spy has been called
afterEach(() => {
  expect(spies.fetch).not.toHaveBeenCalled();
});
