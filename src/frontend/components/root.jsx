import { Provider } from 'react-redux';
import React from 'react';
import FormContainer from './form_container';

const Root = ({ store }) => {
  return (
    <Provider store={store}>
      <FormContainer/>
    </Provider>
  )
};


export default Root;
