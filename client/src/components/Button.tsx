import React from 'react';

interface Props {
    label: string;
    isSubmit?: boolean;
    isPrimary?: boolean;
}

function Button({ label, isSubmit, isPrimary }: Props) {
    const classes = isPrimary
        ? 'bg-cyan-600 text-gray-100 px-6 py-3 rounded-sm hover:bg-cyan-700'
        : '';
    return (
        <button className={classes} type={isSubmit ? `submit` : undefined}>
            {label}
        </button>
    );
}

export default Button;
