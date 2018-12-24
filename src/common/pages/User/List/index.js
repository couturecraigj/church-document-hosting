import loadable from 'loadable-components';

export default loadable(() =>
  import(/* webpackChunkName: "user-list-page" */ './UserList')
);
