import React from 'react';
import { Link } from 'react-router-dom';

function WordItem({ word }: any) {
    return (
        <div>
            <Link to={`/words/${word._id}`}>
                <h2 className="text-2xl font-bold text-cyan-600 font-headers inline-block">
                    {word.name}
                </h2>
            </Link>
        </div>
    );
}

export default WordItem;
