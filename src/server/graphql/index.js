import { ApolloServer } from 'apollo-server-express';
import typeDefs from './typeDefs';
import resolvers from './resolvers';
import { makeExecutableSchema } from 'graphql-tools';

const stripe = require('stripe')(process.env.RAZZLE_STRIPE_SECRET_KEY);

const addApollo = app => {
  const schema = makeExecutableSchema({ typeDefs, resolvers });

  const server = new ApolloServer({
    schema,
    context: obj => ({ ...obj, db: obj.req.db, stripe: stripe })
  });
  schema.context = {
    stripe: stripe
  };
  server.applyMiddleware({ app });
  app.set('apolloSchema', schema);
  return app;
};

export default addApollo;
