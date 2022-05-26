import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
// import Words from './NUKE/pages/Words';
// import WordDetail from './NUKE/pages/WordDetail';
// import WordCreate from './NUKE/pages/WordCreate';
// import NotFound from './NUKE/pages/NotFound';
// import WordEdit from './NUKE/pages/WordEdit';
// import Tags from './NUKE/pages/Tags';
import { Provider } from 'react-redux';
import { store } from './app/store';
// import Login from './public/Login';
// import Register from './public/Register';

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLDivElement
);
root.render(
    <React.StrictMode>
        <Provider store={store}>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<App />}></Route>
                </Routes>
            </BrowserRouter>
        </Provider>
    </React.StrictMode>
);
