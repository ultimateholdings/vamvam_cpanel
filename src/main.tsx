import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';
import './index.css';
import './satoshi.css';
import { Provider } from 'react-redux';
import store from './store/index';
import { IoProvider } from 'socket.io-react-hook';
const MODE = import.meta.env.MODE

const content = (<IoProvider>
  <Provider store={store()}>
    <App />
  </Provider>
</IoProvider>);

console.log(MODE);

const toRender = 
  MODE === 'production' 
  ? <Router basename='/vamvam_panel'> {content} </Router> 
  : <React.StrictMode> <Router> {content} </Router> </React.StrictMode>


ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(toRender);
 