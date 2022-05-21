import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import WordForm from '../components/Word/WordForm';

export default function WordEdit() {
    const p = useParams();
    const [currentWord, setCurrentWord] = useState({});
    console.log(p.id);
    useEffect(() => {
        fetch(`http://localhost:3000/words/${p.id}`)
            .then((res) => res.json())
            .then(setCurrentWord);
    }, [p.id]);

    return <WordForm currentWord={currentWord} />;
}
