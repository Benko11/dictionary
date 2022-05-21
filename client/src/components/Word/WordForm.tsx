import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TagSnippet from '../Tag/TagSnippet';

interface Props {
    currentWord?: any;
}

function WordForm({ currentWord }: Props) {
    const navigate = useNavigate();

    const [word, setWord] = useState('');
    const [meaning, setMeaning] = useState('');
    const [sentences, setSentences] = useState('');
    const [tags, setTags] = useState([]);

    const [allTags, setAllTags] = useState([]);

    function addWord(e: any) {
        e.preventDefault();

        fetch('http://localhost:3000/words', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name: word, meaning, sentences }),
        })
            .then((res) => res.json())
            .then((data) => navigate(`/words/${data._id}`))
            .catch((err) => console.error(err));
    }

    useEffect(() => {
        setWord(currentWord?.name || '');
        setMeaning(currentWord?.meanings?.[0].meaning || '');
        setSentences(currentWord?.meanings?.[0].sentences.join('\n') || '');
        setTags(currentWord?.tags || []);
    }, [currentWord]);

    useEffect(() => {
        fetch('http://localhost:3000/tags')
            .then((res) => res.json())
            .then(setAllTags);
    }, [allTags]);

    return (
        <div className="flex flex-col my-16 mx-8 lg:mx-24 justify-center items-center font-body box-border">
            <div className="w-full md:w-[40rem]">
                <h2 className="text-xl font-bold mb-4">
                    {currentWord != null ? `Update '${word}'` : 'New Word'}
                </h2>

                <form
                    action="/"
                    method="post"
                    className="flex flex-col gap-4"
                    onSubmit={addWord}
                >
                    <div className="flex flex-col gap-2 justify-center">
                        <label htmlFor="name">Name</label>
                        <input
                            type="text"
                            id="name"
                            value={word}
                            onChange={(e) => setWord(e.target.value)}
                            className="border-slate-200 hover:border-slate-300 focus:border-cyan-600 focus:ring-0 rounded-sm"
                        />
                    </div>

                    <div className="flex flex-col gap-2 justify-center">
                        <label htmlFor="meaning">Meaning</label>
                        <input
                            type="text"
                            id="meaning"
                            value={meaning}
                            onChange={(e) => setMeaning(e.target.value)}
                            className="border-slate-200 hover:border-slate-300 focus:border-cyan-600 focus:ring-0 rounded-sm"
                        />
                    </div>

                    <div className="flex flex-col gap-2 justify-center">
                        <label htmlFor="sentences">Sentences</label>
                        <textarea
                            id="sentences"
                            cols={30}
                            rows={10}
                            onChange={(e) => setSentences(e.target.value)}
                            value={sentences}
                            className="border-slate-200 hover:border-slate-300 focus:border-cyan-600 focus:ring-0 rounded-sm resize-none"
                        ></textarea>
                        <p className="text-sm">
                            <em>Sentences can be separated with a new line</em>
                        </p>
                    </div>

                    <div className="mb-4">
                        <p className="mt-4 mb-2">Tags</p>

                        <div className="flex gap-2 flex-wrap leading-8">
                            {allTags.map((tag) => (
                                <TagSnippet
                                    id={(tag as any)._id}
                                    key={(tag as any)._id}
                                    name={(tag as any).title}
                                    checked={false}
                                />
                            ))}
                        </div>
                    </div>

                    <div>
                        <button
                            type="submit"
                            className="bg-cyan-600 text-gray-100 px-6 py-3 rounded-sm hover:bg-cyan-700"
                        >
                            {currentWord == null ? 'Add' : 'Update'} word
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default WordForm;
