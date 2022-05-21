import { Outlet } from 'react-router-dom';
import './App.css';
import NavButton from './components/NavButton';

function App() {
    return (
        <div className="font-body">
            <nav className="flex  mb-2 sticky">
                <header className="pt-4 pl-4"> Dictionary</header>
                <ul className="ml-auto flex gap-2">
                    <NavButton url="/tags" title="Tags" />
                    <NavButton url="/words" title="Words" />
                    <NavButton url="/words/create" title="New Word" />
                </ul>
            </nav>

            <Outlet />
        </div>
    );
}

export default App;
