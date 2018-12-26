import loadable from 'loadable-components';
import Fallback from '../../Fallback';

export default loadable(
  () => import(/* webpackChunkName: "document" */ './Document'),
  {
    ErrorComponent: Fallback
  }
);
