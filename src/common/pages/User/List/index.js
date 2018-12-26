import loadable from 'loadable-components';
import Fallback from '../../Fallback';
export default loadable(
  () => import(/* webpackChunkName: "user-list-page" */ './UserList'),
  {
    ErrorComponent: Fallback
  }
);
