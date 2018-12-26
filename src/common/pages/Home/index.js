import loadable from 'loadable-components';
import Fallback from '../Fallback';
export default loadable(
  () => import(/* webpackChunkName: "home-page" */ './Home'),
  {
    ErrorComponent: Fallback
  }
);
