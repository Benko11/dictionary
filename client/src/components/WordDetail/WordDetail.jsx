import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Meaning from './Meaning';

function WordDetail() {
    const p = useParams();
    const [word, setWord] = useState();

    useEffect(() => {
        fetch(`http://localhost:3000/words/${p.id}`)
            .then((res) => res.json())
            .then(setWord)
            .catch((err) => console.error(err));
    }, [p.id]);

    if (word == null) return;

    return (
        <div className="flex flex-col my-16 mx-8 lg:mx-24 justify-center items-center font-body box-border">
            <div className="w-full md:w-[40rem]">
                <h1 className="text-3xl font-bold text-cyan-600 font-headers">
                    {word.name}
                </h1>

                <h2 className="mt-4 font-bold text-lg mb-2">Meanings</h2>
                <div className="flex flex-col gap-2 ">
                    {word.meanings.map((item) => (
                        <Meaning
                            order={word.meanings.indexOf(item) + 1}
                            meaning={item.meaning}
                            sentences={item.sentences}
                            key={word.meanings.indexOf(item)}
                        />
                    ))}
                </div>

                {word.media?.length > 0 && (
                    <div className="pt-4 pl-1">
                        {word.media.map((item) => (
                            <img
                                src={item}
                                alt=""
                                key={word.media.indexOf(item)}
                                style={{ maxWidth: '400px' }}
                            />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

export default WordDetail;
