import loadable from 'loadable-components';

export default loadable(() =>
  import(/* webpackChunkName: "home-page" */ './Home')
);
