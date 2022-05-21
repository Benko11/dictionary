import React from 'react';
import { Link } from 'react-router-dom';

function NavButton({ url, title }: any) {
    return (
        <li>
            <Link to={url}>
                <div className="p-4">{title}</div>
            </Link>
        </li>
    );
}

export default NavButton;
