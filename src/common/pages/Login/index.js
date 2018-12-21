import loadable from 'loadable-components';

export default loadable(() =>
  import(/* webpackChunkName: "login-page" */ './Login')
);
