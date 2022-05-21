import React from 'react';

function WordMeaning({ order, meaning, sentences }: any) {
    return (
        <div className="flex gap-3">
            <div className="font-bold text-xl mt-1 w-4 order">{order}</div>

            <div className="flex flex-col">
                <p className="font-body leading-7 mb-2 meaning">{meaning}</p>
                <div className="sentences">
                    {sentences?.map((sentence: any) => {
                        return (
                            <p
                                className="mt-2 text-[0.9rem] italic"
                                key={sentences.indexOf(sentence)}
                            >
                                {sentence}
                            </p>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}

export default WordMeaning;
