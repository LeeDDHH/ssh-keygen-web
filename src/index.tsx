'use strict';

import React from 'react';
import ReactDOM from 'react-dom';

import { ChakraProvider } from '@chakra-ui/react';
import { theme } from './Theme';

import App from './components/App';

const Root = () => {
  return (
    <ChakraProvider theme={theme}>
      <App />
    </ChakraProvider>
  );
};

ReactDOM.render(<Root />, document.getElementById('root'));
