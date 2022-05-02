import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function WordCreate() {
    const [word, setWord] = useState('');
    const [meaning, setMeaning] = useState('');
    const [sentences, setSentences] = useState('');

    const navigate = useNavigate();

    function addWord(e) {
        e.preventDefault();

        console.log(JSON.stringify({ name: word, meaning, sentences }));
        fetch('http://localhost:3000/words', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name: word, meaning, sentences }),
        })
            .then((res) => res.json())
            .then(console.log)
            .catch((err) => console.error(err));
    }

    return (
        <div className="flex flex-col my-16 mx-8 lg:mx-24 justify-center items-center font-body box-border">
            <div className="w-full md:w-[40rem]">
                <h2 className="text-xl font-bold">New Word</h2>

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
                            cols="30"
                            rows="10"
                            onChange={(e) => setSentences(e.target.value)}
                            value={sentences}
                            className="border-slate-200 hover:border-slate-300 focus:border-cyan-600 focus:ring-0 rounded-sm resize-none"
                        ></textarea>
                        <p className="text-sm">
                            <em>Sentences can be separated with a new line</em>
                        </p>
                    </div>

                    <div>
                        <button
                            type="submit"
                            className="bg-cyan-600 text-gray-100 px-6 py-3 rounded-sm hover:bg-cyan-700"
                        >
                            Add word
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default WordCreate;
