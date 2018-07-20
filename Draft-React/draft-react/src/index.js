import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import NBApi from './NBApi';
import registerServiceWorker from './registerServiceWorker';

require('dotenv').config();

ReactDOM.render(<NBApi />, document.getElementById('root'));
registerServiceWorker();
