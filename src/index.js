import React from 'react';
import ReactDOM from 'react-dom';
// import './index.css';
// import App from './App';
import MainMap from './components/MainMap';

import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<MainMap />, document.getElementById('root'));
registerServiceWorker();
