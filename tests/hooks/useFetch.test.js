import { renderHook, act, waitFor } from '@testing-library/react';
import useFetch from '../../src/hooks/useFetch';

const { TEST_API_URL } = process?.env || 'TEST_API_URL not found';

let fetchSpy = null;

beforeEach(() => {
  fetchSpy = jest.spyOn(global, 'fetch');
});

const renderAndInitialAssertions = () => {
  const { result } = renderHook(() => useFetch());
  const { setRequestParams, request, response } = result.current;
  expect(request).toStrictEqual({
    method: false,
    path: false,
    body: false,
  });

  expect(response).toStrictEqual({
    loading: false,
    error: false,
    message: false,
    data: false,
  });

  expect(typeof setRequestParams).toBe('function');
  return result;
};

describe('useFetch: a React hook to handle API requests using fetch', () => {
  it('should return setRequestParams function and 2 objects, request and response', async () => {
    // render and initial assertions
    renderAndInitialAssertions();
  });

  it('should return a ValidationError if path is not a string', async () => {
    // render and initial assertions
    const result = renderAndInitialAssertions();

    // actions
    act(() => {
      result.current.setRequestParams('GET', 1234);
    });

    // final assertions
    await waitFor(() => {
      const { name, message } = result.current.response.error;
      expect(name).toBe('ValidationError');
      expect(message).toBe('The path parameter must be a string, number given');
      expect(fetchSpy).not.toHaveBeenCalled();
    });
  });

  it('should return a ValidationError if the method is not a string', async () => {
    // render and initial assertions
    const result = renderAndInitialAssertions();

    // actions
    act(() => {
      result.current.setRequestParams(99999, '/login');
    });

    // final assertions
    await waitFor(() => {
      const { name, message } = result.current.response.error;
      expect(name).toBe('ValidationError');
      expect(message).toBe(
        'The method parameter must be a string, number given'
      );
      expect(fetchSpy).not.toHaveBeenCalled();
    });
  });

  it('should return a ValidationError if a POST request is made without body data', async () => {
    // render and initial assertions
    const result = renderAndInitialAssertions();

    // actions
    act(() => {
      result.current.setRequestParams('POST', '/test');
    });

    // final assertions
    await waitFor(() => {
      const { name, message } = result.current.response.error;
      expect(name).toBe('ValidationError');
      expect(message).toBe(
        'Please provide a body object for POST or DELETE requests'
      );
      expect(fetchSpy).not.toHaveBeenCalled();
    });
  });

  it('return a success message in body if fetch request is successful', async () => {
    // mock fetch response
    const expected = new Response(JSON.stringify({ message: 'success' }), {
      status: 200,
      statusText: 'OK',
    });
    fetchSpy.mockImplementation(() => expected);

    // render and initial assertions
    const result = renderAndInitialAssertions();

    // actions
    const body = { email: 'johno@sr.com', password: '12345678' };
    await act(async () => {
      result.current.setRequestParams('POST', '/login', body);
    });

    // final assertions
    await waitFor(() => {
      expect(result.current.response).toStrictEqual({
        loading: false,
        error: false,
        message: false,
        data: { message: 'success' },
      });
      expect(fetchSpy).toHaveBeenNthCalledWith(1, `${TEST_API_URL}/login`, {
        headers: { 'Content-Type': 'application/json' },
        method: 'POST',
        body: JSON.stringify(body),
      });
    });
  });

  it('returns the 404 error response if it occurs', async () => {
    // mock fetch response
    const expected = new Response(null, {
      status: 404,
      statusText: 'Not Found',
    });
    fetchSpy.mockImplementation(() => Promise.resolve(expected));

    // render and initial assertions
    const result = renderAndInitialAssertions();

    // actions
    await act(async () => {
      result.current.setRequestParams('GET', '/test');
    });

    // final assertions
    await waitFor(() => {
      const { status, statusText } = result.current.response.error;
      expect(result.current.response.loading).toBe(false);
      expect(status).toBe(404);
      expect(statusText).toBe('Not Found');
      expect(fetchSpy).toHaveBeenNthCalledWith(1, `${TEST_API_URL}/test`, {
        headers: { 'Content-Type': 'application/json' },
        method: 'GET',
      });
    });
  });
});
