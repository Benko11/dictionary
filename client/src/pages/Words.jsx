import React, { useEffect, useState } from 'react';
import Word from '../components/Word';

function Words() {
    const [words, setWords] = useState([]);

    useEffect(() => {
        fetch('http://localhost:3000/words')
            .then((res) => res.json())
            .then(setWords)
            .catch((err) => console.error(err));
    }, []);

    return (
        <main className="grid grid-flow-row sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-7 2xl:grid-cols-9 gap-y-2 p-4">
            {words.map((word) => {
                return <Word key={words.indexOf(word)} word={word} />;
            })}
        </main>
    );
}

export default Words;
