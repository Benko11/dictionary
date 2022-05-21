import React, { useEffect, useState } from 'react';
import TagItem from '../components/Tag/TagItem';

export default function Tags() {
    const [tags, setTags] = useState([]);
    const [title, setTitle] = useState('');

    useEffect(() => {
        fetch(`http://localhost:3000/tags`)
            .then((res) => res.json())
            .then(setTags)
            .catch(console.error);
    }, []);

    function addTag(e: any) {
        e.preventDefault();

        fetch('http://localhost:3000/tags', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ title }),
        })
            .then((res) => res.json())
            .then((data) => {
                const cloneTags: any[] = [...tags];
                cloneTags.push({ _id: data._id, title: data.title });
                setTags(cloneTags as never[]);
                setTitle('');
            })
            .catch(console.error);
    }

    function deleteTag(e: any, tag: any) {
        e.preventDefault();

        fetch(`http://localhost:3000/tags/${tag._id}`, {
            method: 'DELETE',
        })
            .then(() => {
                const newTags = [...tags].filter(
                    (item) => (item as any)._id !== tag._id
                );
                setTags(newTags);
            })
            .catch(console.error);
    }

    return (
        <main className="flex flex-col my-4 mx-8 justify-center items-center">
            <div className="w-full md:w-[40rem]">
                <div className="mb-12">
                    <h2 className="font-bold text-xl mb-4">New Tag</h2>
                    <form onSubmit={addTag}>
                        <div className="flex flex-col gap-2">
                            <label htmlFor="title">Title</label>
                            <input
                                type="text"
                                id="title"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                            />
                        </div>
                        <button
                            type="submit"
                            className=" bg-cyan-600 text-gray-100 px-6 py-3 rounded-sm hover:bg-cyan-700 mt-4"
                        >
                            Add
                        </button>
                    </form>
                </div>

                <div>
                    <h2 className="font-bold text-xl mb-4">Tags</h2>
                    <div className="flex flex-col gap-4">
                        {tags.map((tag) => (
                            <TagItem
                                tag={tag}
                                key={tags.indexOf(tag)}
                                onDelete={deleteTag}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </main>
    );
}
