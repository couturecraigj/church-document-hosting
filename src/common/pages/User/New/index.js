import loadable from 'loadable-components';

export default loadable(() =>
  import(/* webpackChunkName: "new-user-page" */ './NewUser')
);
