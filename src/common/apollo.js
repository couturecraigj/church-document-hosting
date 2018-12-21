import { ApolloClient } from 'apollo-client';
import { onError } from 'apollo-link-error';
import { ApolloLink } from 'apollo-link';
import { InMemoryCache } from 'apollo-cache-inmemory';
// import { SchemaLink } from 'apollo-link-schema';

const createClient = ({
  ssrMode = false,
  link,
  ssrForceFetchDelay = 100,
  currentState
}) => {
  const client = new ApolloClient({
    link: ApolloLink.from([
      onError(({ graphQLErrors, networkError, response }) => {
        if (graphQLErrors) {
          graphQLErrors.map(({ message, locations, path }) =>
            console.error(
              `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
            )
          );

          // return {
          //   graphQLErrors,
          //   networkError,
          //   message: graphQLErrors.map(({ message }) => message).join(' and ')
          // };
        }
        if (networkError) console.error(`[Network error]: ${networkError}`);
      }),
      link
    ]),
    ssrMode,
    ssrForceFetchDelay,
    cache: currentState
      ? new InMemoryCache().restore(currentState)
      : new InMemoryCache()
  });

  return client;
};

export default createClient;
