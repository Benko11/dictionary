import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Words from './pages/Words';
import WordDetail from './pages/WordDetail';
import WordCreate from './pages/WordCreate';
import NotFound from './pages/NotFound';
import WordEdit from './pages/WordEdit';
import Tags from './pages/Tags';

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLDivElement
);
root.render(
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<App />}>
                <Route path="*" element={<NotFound />} />
                <Route path="words" element={<Words />} />
                <Route path="words/create" element={<WordCreate />} />
                <Route path="words/:id" element={<WordDetail />} />
                <Route path="words/:id/edit" element={<WordEdit />} />
                <Route path="tags" element={<Tags />} />
            </Route>
        </Routes>
    </BrowserRouter>
);
