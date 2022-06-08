import React from 'react';
interface Props {
    label?: string;
    id?: string;
    value: string;
    onChange: any;
}

function PasswordInput({ label, id, value, onChange }: Props) {
    const passwordId = id || 'password';
    return (
        <div className="flex flex-col gap-2">
            <label htmlFor={passwordId}>{label || 'Password'}</label>
            <input
                type="password"
                id={passwordId}
                value={value}
                onChange={onChange}
                className="border-slate-200 hover:border-slate-300 focus:border-cyan-600 focus:ring-0 rounded-sm"
            />
        </div>
    );
}

export default PasswordInput;
