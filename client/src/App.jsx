import { Link, Outlet } from 'react-router-dom';
import './App.css';

function App({ children }) {
    return (
        <div className="font-body">
            <nav className="flex  mb-2 sticky">
                <header className="pt-4 pl-4">Bluom Dictionary</header>
                <ul className="ml-auto flex gap-2">
                    <li>
                        <Link to="/words">
                            <div className="p-4">Words</div>
                        </Link>
                    </li>
                    <li>
                        <Link to="/words/create">
                            <div className="p-4">New Word</div>
                        </Link>
                    </li>
                </ul>
            </nav>

            <Outlet />
        </div>
    );
}

export default App;
