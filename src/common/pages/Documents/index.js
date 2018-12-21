import loadable from 'loadable-components';

export default loadable(() =>
  import(/* webpackChunkName: "documents" */ './Documents')
);
