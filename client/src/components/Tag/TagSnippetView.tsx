import React from 'react';

function TagSnippetView({ text }: any) {
    return (
        <div className="border border-cyan-600 p-1 px-2 inline peer-checked:bg-cyan-600 peer-checked:text-white">
            {text}
        </div>
    );
}

export default TagSnippetView;
