import loadable from 'loadable-components';
import Fallback from '../../Fallback';
export default loadable(
  () => import(/* webpackChunkName: "new-user-page" */ './NewUser'),
  {
    ErrorComponent: Fallback
  }
);
