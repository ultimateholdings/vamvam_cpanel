import React from 'react';
import ReactDOM from 'react-dom/client';
import { HashRouter, BrowserRouter as Router } from 'react-router-dom';
import App from './App';
import './index.css';
import './satoshi.css';
import { Provider } from 'react-redux';
import store from './store/index';
import { IoProvider } from 'socket.io-react-hook';
import { ErrorBoundary } from 'react-error-boundary'
import MyFallbackComponent from './utils/helpers/MyFallbackComponent';
import LoggerService from './services/log/logger.service';


const MODE = import.meta.env.MODE

const content = (<IoProvider>
  <Provider store={store}>

    <ErrorBoundary
      FallbackComponent={MyFallbackComponent}
      onReset={() => { // reset the state of your app here
      }}
      resetKeys={['someKey']}
      onError={LoggerService.logErrorToService}
    >
      <App />
    </ErrorBoundary>
  </Provider>
</IoProvider>);

console.log("MODE", MODE);
console.log("MODE",  import.meta.env.VITE_API_URL);

// set Router config for dev or prod mode
const toRender =
  MODE === 'production'
    ? <HashRouter basename='/vamvam_panel'>{content}</HashRouter> 
    : <React.StrictMode> <Router> {content} </Router> </React.StrictMode>


ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(toRender);
