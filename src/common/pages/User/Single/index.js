import loadable from 'loadable-components';
import Fallback from '../../Fallback';

export default loadable(
  () => import(/* webpackChunkName: "user-page" */ './SingleUser'),
  {
    ErrorComponent: Fallback
  }
);
