import loadable from 'loadable-components';

export default loadable(() => import(/* webpackChunkName: "me-page" */ './Me'));
