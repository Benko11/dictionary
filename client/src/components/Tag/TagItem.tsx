import React from 'react';

function TagItem({ tag, onDelete }: any) {
    return (
        <form
            method="post"
            action={`/tags/${tag._id}`}
            onSubmit={(e) => onDelete(e, tag)}
        >
            <div className="flex">
                <div>{tag.title}</div>
                <button
                    type="submit"
                    className="ml-auto border border-red-700 text-red-700 hover:text-gray-50 hover:bg-red-700 p-2 px-4 rounded-sm"
                >
                    Delete
                </button>
            </div>
        </form>
    );
}

export default TagItem;
