import { renderHook, act } from '@testing-library/react';
import useFetch from '../../src/hooks/useFetch';

let fetchSpy = null;

beforeEach(() => {
  fetchSpy = jest.spyOn(window, 'fetch');
});

const renderAndInitialAssertions = () => {
  const { result } = renderHook(() => useFetch());
  const { state, setData } = result.current;
  expect(state).toStrictEqual({
    method: false,
    url: false,
    body: false,
    loading: false,
    error: false,
  });
  expect(typeof setData).toBe('function');
  return result;
};

describe('useFetch', () => {
  it('should return a state object and setData function', async () => {
    // render and initial assertions
    renderAndInitialAssertions();
  });

  it('should be able to set the state values from outside the hook', async () => {
    // render and initial assertions
    const result = renderAndInitialAssertions();

    // actions
    act(() => {
      result.current.setData('POST', '/login', {
        email: 'kaew@sr.com',
        password: '87654321',
      });
    });

    // final assertions
    const { url, body } = result.current.state;
    expect(url).toBe('/login');
    expect(body).toStrictEqual({
      email: 'kaew@sr.com',
      password: '87654321',
    });
    expect(window.fetch).toHaveBeenNthCalledWith(1, '/login', {
      body: { email: 'kaew@sr.com', password: '87654321' },
      headers: { 'Content-Type': 'application/json' },
      method: 'POST',
    });
  });

  it('return an error if url is not a string', async () => {
    // render and initial assertions
    const result = renderAndInitialAssertions();

    // actions
    act(() => {
      result.current.setData('GET', 1234);
    });

    // final assertions
    expect(result.current.state.error).toBe('url must be a string');
    expect(window.fetch).not.toHaveBeenCalled();
  });

  it('return an error if an incorrect method option is provided', async () => {
    // render and initial assertions
    const result = renderAndInitialAssertions();

    // actions
    act(() => {
      result.current.setData(99999, '/login', {
        email: 'dave@sr.com',
        password: '22222222',
      });
    });

    // final assertions
    expect(result.current.state.error).toBe(
      'method must be one of the following string options: GET, POST, DELETE'
    );
    expect(window.fetch).not.toHaveBeenCalled();
  });

  it('return an error if body data is passed with a GET method', async () => {
    // render and initial assertions
    const result = renderAndInitialAssertions();

    // actions
    act(() => {
      result.current.setData('GET', '/tickets', {
        randomNote: 'body argument should not be used',
      });
    });

    // final assertions
    expect(result.current.state.error).toBe(
      'GET requests do not require body data'
    );
    expect(window.fetch).not.toHaveBeenCalled();
  });

  it('return an success response if fetch request is successful', async () => {
    // mock fetch response
    fetchSpy.mockImplementation(() =>
      Promise.resolve({
        ok: true,
        status: 200,
        json: async () => ({ data: false, message: 'success' }),
      })
    );

    // render and initial assertions
    const result = renderAndInitialAssertions();

    // actions
    await act(async () => {
      result.current.setData('POST', '/login', {
        email: 'johno@sr.com',
        password: '12345678',
      });
    });

    // final assertions
    expect(result.current.response).toStrictEqual({
      data: false,
      message: 'success',
    });
    expect(window.fetch).toHaveBeenNthCalledWith(1, '/login', {
      body: { email: 'johno@sr.com', password: '12345678' },
      headers: { 'Content-Type': 'application/json' },
      method: 'POST',
    });
  });
});
