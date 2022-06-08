import React, { useState } from 'react';
import Button from '../components/Button';
import PasswordInput from '../components/PasswordInput';
import TextInput from '../components/TextInput';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    return (
        <div className="flex flex-col my-16 mx-8 lg:mx-24 justify-center items-center font-body box-border">
            <div className="w-full md:w-[40rem]">
                <h1 className="font-bold text-xl mb-4">Login</h1>

                <form className="flex flex-col gap-6">
                    <TextInput
                        label="E-mail address"
                        value={email}
                        onChange={(e: any) => setEmail(e.target.value)}
                        id="email"
                        isEmail={true}
                    />

                    <PasswordInput
                        onChange={(e: any) => setPassword(e.target.value)}
                        value={password}
                    />

                    <div>
                        <Button
                            label="Log in"
                            isSubmit={true}
                            isPrimary={true}
                        />
                    </div>
                </form>
            </div>
        </div>
    );
}
