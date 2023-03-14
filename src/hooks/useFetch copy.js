/* eslint-disable no-throw-literal */
import { useEffect, useState, useRef } from 'react';

const API_URL =
  process?.env?.TEST_API_URL || process?.env?.NEXT_PUBLIC_API_URL || null;

const methodOptions = ['GET', 'POST', 'DELETE'];
const defaultState = {
  method: false,
  url: false,
  body: false,
  loading: false,
  error: false,
};

let resBody = null;

const useFetch = (initialState) => {
  const ref = useRef(true);
  const [state, setState] = useState({ ...defaultState, ...initialState });
  const [response, setResponse] = useState(false);

  /* the 2 functions below (setData and setError) could be combined to a signal
  reusable function but I currently feel the naming convention combined with 
  implicitly setting the 'loading' value is clear in the code */
  const setData = (method, url, body) => {
    setState((s) => ({ ...s, method, url, body, loading: true }));
  };

  const setError = (error) => {
    setState((s) => ({ ...s, error, loading: false }));
  };

  const sendRequest = async () => {
    try {
      // // validate that 'url' is a string
      // if (typeof state.url !== 'string')
      //   throw new Error('url must be a string');

      // // validate that 'method' is a string
      // if (
      //   typeof state.method !== 'string' ||
      //   !methodOptions.includes(state.method)
      // ) {
      //   throw new Error(
      //     `method must be one of the following string options: ${methodOptions.join(
      //       ', '
      //     )}`
      //   );
      // }

      // // validate that 'body' data is not set with 'GET' requests
      // if (state.method === 'GET' && state.body) {
      //   throw new Error('GET requests do not require body data');
      // }

      // compile the payload for fetch
      const { method, body, headers } = state;
      const payload = {
        headers: {
          'Content-Type': 'application/json',
          ...headers,
        },
        method,
        body,
      };
      if (method === 'GET') delete payload.body; // exclude body data from GET requests

      // make the fetch request and the handle response
      const res = await fetch(API_URL + state.url, payload);

      // if response is something other than 200-299, throw an error
      if (!res.ok) throw res;

      // store the successful fetch response data in local state
      if (res.bodyUsed) {
        resBody = await res.json();
      }
      setResponse((r) => ({ ...r, ...resBody }));
      setState((s) => ({ ...s, loading: false }));
    } catch (e) {
      console.error(e);
      setError(e.status);
    }
  };

  useEffect(() => {
    const abortController = new AbortController();

    if (!ref.current) {
      sendRequest();
    }
    /* ref.current ===  true on first render, set it false here 
    so that subsequent renders will trigger the above sendRequest() */
    ref.current = false;

    return () => {
      // abort request if component is unmounted
      abortController.abort();
    };
  }, [state.url]);

  return { state, setData, setError, response };
};

export default useFetch;
