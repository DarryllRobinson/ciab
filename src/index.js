import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from 'react-router-dom';
import { TrackerProvider, Tracker } from 'react-tracker';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

const tracker = new Tracker();

ReactDOM.render(
  <TrackerProvider tracker={tracker}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </TrackerProvider>
, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
