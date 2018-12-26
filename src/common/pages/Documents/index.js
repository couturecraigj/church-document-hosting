import loadable from 'loadable-components';
import Fallback from '../Fallback';

export default loadable(
  () => import(/* webpackChunkName: "documents" */ './Documents'),
  {
    ErrorComponent: Fallback
  }
);
