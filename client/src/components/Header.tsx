import React from 'react';
import NavButton from './NavButton';

function Header() {
    return (
        <nav className="flex mb-2 sticky">
            <header className="pt-4 pl-4">Dictionary</header>
            <ul className="ml-auto flex gap-2">
                <NavButton url="/tags" title="Tags" />
                <NavButton url="/words" title="Words" />
                <NavButton url="/words/create" title="New Word" />
            </ul>
        </nav>
    );
}

export default Header;
