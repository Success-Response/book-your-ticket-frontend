import Head from 'next/head';
import { useEffect } from 'react';
import useFetch from 'hooks/useFetch';
import { useRouter } from 'next/router';
import errorHandler from 'lib/errorHandler';

const AgentProperties = () => {
  const { setRequestParams, response } = useFetch();
  const { loading, error, message, data } = response;
  const {
    query: { agentId },
  } = useRouter();

  useEffect(() => {
    if (agentId) {
      setRequestParams('GET', `/api/agents/${agentId}/properties`);
    }
  }, [agentId]);

  return (
    <>
      <Head>
        <title>Agent Properties</title>
        <meta name="description" content="Agent Properties page" />
      </Head>
      <div data-testid="agent-properties-page">
        {loading ? (
          <div>Loading</div>
        ) : (
          <div>
            {error ? (
              <p data-testid="agent-properties-error">
                {errorHandler(error, 'Properties')}
              </p>
            ) : (
              <div>
                <h2>{message}</h2>
                {data?.agentProperties?.map((p) => (
                  <div key={p.id}>
                    <div>Agent ID: {p.agentId}</div>
                    <div>Beds: {p.beds}</div>
                    <div>Bathrooms: {p.bathrooms}</div>
                    <div>Deposit: {p.deposit}</div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default AgentProperties;
