import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import store from './redux'
import 'antd/dist/antd.css'

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <Suspense fallback>
          <App />
        </Suspense>
      </Provider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);