import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import './assets/sass/global.scss';
import AppComponent from './components/app/app';
import * as serviceWorker from './service-worker';

ReactDOM.render(
    <BrowserRouter>
        <AppComponent />
    </BrowserRouter>,
    document.getElementById('root')
);

serviceWorker.unregister();