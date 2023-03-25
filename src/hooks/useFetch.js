/* eslint-disable no-throw-literal */
import { useEffect, useState, useRef } from 'react';
import { fetchParamsValidation } from '../lib/validationSchemas';

const initialState = {
  loading: false,
  error: false,
  message: false,
  data: false,
};

const initialRequest = {
  method: false,
  path: false,
  body: false,
};

const useFetch = () => {
  const ref = useRef(true);
  const [requestParams, setRequestParams] = useState(initialRequest);
  const [state, setState] = useState(initialState);

  const request = (method, path, body = false) => {
    setRequestParams((prev) => ({
      ...prev,
      method,
      path,
      body: JSON.stringify(body),
    }));

    setState((prev) => ({
      ...prev,
      loading: true,
    }));
  };

  const sendRequest = async () => {
    try {
      // validate the requestParams
      await fetchParamsValidation().validate(requestParams, {
        strict: true,
      });

      // compile the fetch payload
      const { method, body, headers } = requestParams;
      const payload = {
        headers: {
          'Content-Type': 'application/json',
          ...headers,
        },
        method,
        body,
      };
      if (method === 'GET') delete payload.body; // exclude body data from GET requests

      // make the fetch request
      const response = await fetch(requestParams.path, payload);

      // if the request fails, throw the state to the catch block
      if (response.status !== 200) throw response;

      // get body data
      const resJson = await response.json();

      setState((prev) => ({
        ...prev,
        data: { ...resJson },
        error: false,
        loading: false,
      }));
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error({ e });
      setState((prev) => ({
        ...prev,
        ...initialState,
        loading: false,
        error: e,
      }));
    }
  };

  useEffect(() => {
    const abortController = new AbortController();

    if (!ref.current && state.loading && requestParams.path) {
      sendRequest();
    }
    /* ref.current ===  true on first render, set it false here 
    so that subsequent renders will trigger the above sendRequest() */
    ref.current = false;

    return () => {
      // abort request if component is unmounted
      abortController.abort();
    };
  }, [requestParams.path, state.loading]);

  return { request, state };
};

export default useFetch;
