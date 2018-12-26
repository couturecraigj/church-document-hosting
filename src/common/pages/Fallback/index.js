import loadable from 'loadable-components';

export default loadable(() =>
  import(/* webpackChunkName: "fallback-page" */ './Fallback')
);
