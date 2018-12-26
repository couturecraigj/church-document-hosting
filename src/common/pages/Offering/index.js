import loadable from 'loadable-components';
import Fallback from '../Fallback';
export default loadable(
  () => import(/* webpackChunkName: "offering" */ './Offering'),
  {
    ErrorComponent: Fallback
  }
);
