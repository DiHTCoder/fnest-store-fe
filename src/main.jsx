import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { SidebarProvider } from './context/sidebar_context.jsx';
import { store } from '../store.js';
import { Provider } from 'react-redux';

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <Provider store={store}>
            <SidebarProvider>
                <App />
            </SidebarProvider>
        </Provider>
    </React.StrictMode>,
);
