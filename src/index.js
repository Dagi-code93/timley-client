import React from 'react';
import ReactDOM from 'react-dom';

// context provider
import { GoalsContextProvider } from './context/goalsContext';
import { AuthContextProvider } from './context/authContext';

import './index.css';
import App from './App';

ReactDOM.render(
    <AuthContextProvider>
        <GoalsContextProvider>
            <App />
        </GoalsContextProvider>        
    </AuthContextProvider>
, document.getElementById('root'));
