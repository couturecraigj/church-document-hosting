import App from '../common/App';
import React from 'react';
import { Helmet } from 'react-helmet';
import { StaticRouter } from 'react-router-dom';
import { ServerStyleSheet, StyleSheetManager } from 'styled-components';
import { getLoadableState } from 'loadable-components/server';
import { ApolloProvider, getDataFromTree } from 'react-apollo';
import { SchemaLink } from 'apollo-link-schema';
import express from 'express';
import { renderToString } from 'react-dom/server';
import config from './config';
import createClient from '../common/apollo';
import app from './api';

const assets = require(process.env.RAZZLE_ASSETS_MANIFEST);
const subscriptions = [];
const server = express();
server.set('addSubscription', subscription => {
  subscriptions.push(subscription);
});
server.set('subscriptionList', subscriptions);
config(server);

server
  .disable('x-powered-by')
  .use(express.static(process.env.RAZZLE_PUBLIC_DIR))
  .get('/*', async (req, res) => {
    const context = {};
    const sheet = new ServerStyleSheet();

    const client = createClient({
      link: new SchemaLink({
        schema: req.app.get('apolloSchema'),
        context: () => ({
          ...req.app.get('apolloSchema').context,
          req,
          db: req.db,
          res
        })
      }),
      ssrMode: true
    });
    const Application = (
      <StyleSheetManager sheet={sheet.instance}>
        <ApolloProvider client={client}>
          <StaticRouter context={context} location={req.url}>
            <App />
          </StaticRouter>
        </ApolloProvider>
      </StyleSheetManager>
    );

    await getDataFromTree(Application);
    const loadableState = await getLoadableState(Application);

    const markup = renderToString(sheet.collectStyles(Application));
    const styleElement = sheet.getStyleTags();
    // renderToString(Application);

    const apolloState = client.extract();

    const helmet = Helmet.renderStatic();
    // console.log(helmet);
    if (context.url) {
      res.redirect(context.url);
    } else {
      res.status(200).send(
        `<!doctype html>
    <html lang="">
    <head>
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta charset="utf-8" />
        <script id="stripe-js" async src="https://js.stripe.com/v3/"></script>
        ${styleElement}
        ${helmet.title.toString()}${helmet.meta.toString()}${helmet.link.toString()}
        <meta name="viewport" content="width=device-width, initial-scale=1">
        ${
          assets.client.css
            ? `<link rel="stylesheet" href="${assets.client.css}">`
            : ''
        }
        <script>window.__APOLLO_STATE__=${JSON.stringify(apolloState).replace(
          /</g,
          '\\u003c'
        )}</script>
        ${
          process.env.NODE_ENV === 'production'
            ? `<script src="${assets.client.js}" defer></script>`
            : `<script src="${assets.client.js}" defer crossorigin></script>`
        }
    </head>
    <body>
        <div id="root">${markup}</div>
        ${loadableState.getScriptTag()}
    </body>
</html>`
      );
    }
  });

export default server;
