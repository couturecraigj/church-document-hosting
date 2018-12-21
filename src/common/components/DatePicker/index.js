import loadable from 'loadable-components';

export default loadable(() =>
  import(/* webpackChunkName: "date-picker" */ './DatePicker')
);
