import React from 'react';

const dev = process.env.NODE_ENV !== 'production';

const FormDebugger = ({ values }) =>
  dev ? <pre>{JSON.stringify(values, null, 2)}</pre> : null;

export default FormDebugger;
