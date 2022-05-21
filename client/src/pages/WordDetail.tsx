import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import TagSnippetView from '../components/Tag/TagSnippetView';
import Meaning from '../components/Word/WordMeaning';
import Word from '../interfaces/Word';

export default function WordDetail() {
    const p = useParams();
    const [word, setWord] = useState<Word>();
    const [tags, setTags] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetch(`http://localhost:3000/words/${p.id}`)
            .then((res) => res.json())
            .then(setWord)
            .then(() => {
                fetch(`http://localhost:3000/tags`)
                    .then((r) => r.json())
                    .then(setTags);
            })
            .catch(() => navigate(`/error`));
    }, [p.id, navigate]);

    function deleteWord(e: any) {
        e.preventDefault();

        fetch(`http://localhost:3000/words/${p.id}`, {
            method: 'DELETE',
        })
            .then(() => {
                navigate(`/words`, { replace: true });
            })
            .catch(console.error);
    }

    if (word == null)
        return (
            <>
                <div className="flex flex-col my-16 mx-8 lg:mx-24 justify-center items-center font-body box-border">
                    <div className="w-full md:w-[40rem]">
                        <p>Loading...</p>
                    </div>
                </div>
            </>
        );

    return (
        <div className="flex flex-col my-16 mx-8 lg:mx-24 justify-center items-center font-body box-border">
            <div className="w-full md:w-[40rem]">
                <h1 className="text-3xl font-bold text-cyan-600 font-headers mb-4">
                    {word.name}
                </h1>

                {word.tags &&
                    tags.length > 0 &&
                    word.tags.map((tag) => {
                        return (
                            <TagSnippetView
                                key={word.tags.indexOf(tag)}
                                text={
                                    (tags as any[]).filter(
                                        (item) => (item as any)._id === tag
                                    )[0].title
                                }
                            />
                        );
                    })}

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

                <div className="flex flex-row">
                    <Link to={`/words/${p.id}/edit`}>
                        <button className="text-cyan-600 mt-4">
                            Update word
                        </button>
                    </Link>
                    <div className="pt-4 ml-auto">
                        <form action="" onSubmit={deleteWord}>
                            <button className="text-red-500">
                                Delete word
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
