import loadable from 'loadable-components';

export default loadable(() =>
  import(/* webpackChunkName: "user-page" */ './SingleUser')
);
