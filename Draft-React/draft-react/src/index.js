import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import NBApiForm from './App';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<NBApiForm />, document.getElementById('root'));
registerServiceWorker();
