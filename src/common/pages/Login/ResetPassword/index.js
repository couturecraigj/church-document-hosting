import loadable from 'loadable-components';

export default loadable(() =>
  import(/* webpackChunkName: "reset-password-page" */ './ResetPassword')
);
