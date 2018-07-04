import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import NBApi from './App';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<NBApi />, document.getElementById('root'));
registerServiceWorker();
