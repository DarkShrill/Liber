import React from 'react';
import ReactDOM from 'react-dom';
import Whatever from './App';
import * as serviceWorker from './UTILS/serviceWorker';

ReactDOM.render(<Whatever />, document.getElementById('root'));
serviceWorker.unregister();
