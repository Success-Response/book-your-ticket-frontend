/* eslint-disable no-throw-literal */
import { useEffect, useState, useRef } from 'react';
import { fetchParamsValidation } from '../lib/validationSchemas';

const API_URL =
  process?.env?.TEST_API_URL || process?.env?.NEXT_PUBLIC_API_URL || null;

const initialResponse = {
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
  const [request, setRequest] = useState(initialRequest);
  const [response, setResponse] = useState(initialResponse);

  const setRequestParams = (method, path, body = false) => {
    setRequest((prev) => ({
      ...prev,
      method,
      path,
      body: JSON.stringify(body),
    }));

    setResponse((prev) => ({
      ...prev,
      loading: true,
    }));
  };

  const sendRequest = async () => {
    try {
      // validate the request
      await fetchParamsValidation().validate(request, {
        strict: true,
      });

      // compile the fetch payload
      const { method, body, headers } = request;
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
      const fetchReponse = await fetch(API_URL + request.path, payload);

      // if the request fails, throw the response to the catch block
      if (fetchReponse.status !== 200) throw fetchReponse;

      // get body data
      const resBody = await fetchReponse.json();

      setResponse((prev) => ({
        ...prev,
        data: { ...resBody },
        error: false,
        loading: false,
      }));
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error({ e });

      // FIXME - if this works we might need to refactor
      let error = {};

      if (e?.name) {
        error = { name: e.name, message: e.message };
      }

      if (e?.status) {
        // FIXME
        console.log('e.status: ', e.status);
        console.log('e.statusText: ', e.statusText);
        console.log('e.url: ', e.url);
        console.log('e.type: ', e.type);
        switch (e.status) {
          case 404:
            error = { status: e.status, statusText: e.statusText };
            break;
          case 401:
            error = { status: e.status, statusText: 'Something went wrong' };
            break;
          default:
            break;
        }
      }

      setResponse((prev) => ({
        ...prev,
        ...initialResponse,
        loading: false,
        error,
      }));
    }
  };

  useEffect(() => {
    const abortController = new AbortController();

    if (!ref.current && response.loading && request.path) {
      sendRequest();
    }
    /* ref.current ===  true on first render, set it false here 
    so that subsequent renders will trigger the above sendRequest() */
    ref.current = false;

    return () => {
      // abort request if component is unmounted
      abortController.abort();
    };
  }, [request.path, response.loading]);

  return { setRequestParams, request, response };
};

export default useFetch;
