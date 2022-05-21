import React, { useEffect, useState } from 'react';

export default function TagSnippet({ id, name, checked }: any) {
    const [ticked, setTicked] = useState(false);
    useEffect(() => {
        setTicked(checked || false);
    }, [checked]);

    return (
        <div className="select-none">
            <input
                type="checkbox"
                id={`tag-${id}`}
                className="peer hidden"
                value={id}
                checked={ticked}
                onChange={() => setTicked((prev) => !prev)}
            />
            <label
                htmlFor={`tag-${id}`}
                className="border border-cyan-600 p-1 px-2 cursor-pointer peer-checked:bg-cyan-600 peer-checked:text-white"
            >
                {name}
            </label>
        </div>
    );
}
