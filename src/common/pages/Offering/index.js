import loadable from 'loadable-components';

export default loadable(() =>
  import(/* webpackChunkName: "offering" */ './Offering')
);
