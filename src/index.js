// import '../node_modules/bootstrap/scss/bootstrap.scss';
import './index.css';

import React from 'react';
import ReactDOM from 'react-dom';
import RootComponent from './components/root/RootComponent';
import 'bootstrap';
import 'bootstrap/scss/bootstrap.scss';
import reportWebVitals from './reportWebVitals';

ReactDOM.render(<React.StrictMode>
    <RootComponent/>
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();
