import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Words from './pages/Words';
import WordDetail from './components/WordDetail/WordDetail';
import WordCreate from './components/WordCreate/WordCreate';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<App />}>
                <Route path="words" element={<Words />} />
                <Route path="words/create" element={<WordCreate />} />
                <Route path="words/:id" element={<WordDetail />} />
            </Route>
        </Routes>
    </BrowserRouter>
);
