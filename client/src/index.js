import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import './Styleshseets/style.css';
import 'react-datetime/css/react-datetime.css'
import App from './App';
import AuthProvider from './Context/AuthContext';

ReactDOM.render(
  <AuthProvider>
    <App />
  </AuthProvider>,
  document.getElementById('root')
);

