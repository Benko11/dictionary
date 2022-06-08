import React from 'react';

interface Props {
    label: string;
    id: string;
    value: string;
    onChange: any;
    isEmail?: boolean;
}

function TextInput({ label, id, value, onChange, isEmail }: Props) {
    return (
        <div className="flex flex-col gap-2">
            <label htmlFor={id}>{label}</label>
            <input
                type={isEmail ? 'email' : 'text'}
                id={id}
                value={value}
                onChange={onChange}
                className="border-slate-200 hover:border-slate-300 focus:border-cyan-600 focus:ring-0 rounded-sm"
            />
        </div>
    );
}

export default TextInput;
