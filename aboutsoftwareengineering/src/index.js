import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import {BrowserRouter, Route, Redirect} from 'react-router-dom';

import HomePage from './pages/homepage.js';
import Login from './pages/login.js';

ReactDOM.render((
    <BrowserRouter>
      <div>
        <div>
          <div>
            <Route path= '/login' component={Login} />
            <Route exact path= '/' component={HomePage} />
          </div>
        </div>
      </div>
    </BrowserRouter>
                ), document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
