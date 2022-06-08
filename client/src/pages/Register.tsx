import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Button from '../components/Button';
import PasswordInput from '../components/PasswordInput';
import TextInput from '../components/TextInput';

import { register, reset } from '../features/auth/authSlice';

export default function Register() {
    const [name, setName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [dayOfBirth, setDayOfBirth] = useState('');
    const [monthOfBirth, setMonthOfBirth] = useState('');
    const [yearOfBirth, setYearOfBirth] = useState('');
    const [gender, setGender] = useState('');

    const [password, setPassword] = useState('');
    const [passwordAgain, setPasswordAgain] = useState('');

    const [genders, setGenders] = useState([]);

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { user, isLoading, isSuccess, isError, message } = useSelector(
        (state: any) => state.auth
    );

    useEffect(() => {
        fetch('http://localhost:3000/genders')
            .then((res) => res.json())
            .then((data) => setGenders(data));
    }, []);

    useEffect(() => {
        if (isError) {
            console.error(message);
        }

        if (isSuccess || user) {
            navigate('/');
        }

        dispatch(reset());
    }, [user, isLoading, isSuccess, isError, message, dispatch, navigate]);

    const checkDayValidity = (value: string): boolean => {
        const parsed = Number.parseInt(value);

        if (isNaN(parsed) && value !== '') return false;
        if (value !== '' && parsed > 31) return false;

        return true;
    };

    const checkYearValidity = (value: string): boolean => {
        const parsed = Number.parseInt(value);

        if (isNaN(parsed) && value !== '') return false;
        if (value !== '' && parsed > new Date().getFullYear() - 6) return false;
        if (
            value.length === 1 &&
            ((value.charAt(0) >= '3' && value.charAt(0) <= '9') ||
                value.charAt(0) === '0')
        )
            return false;

        return true;
    };

    const signUp = async (e: any) => {
        e.preventDefault();

        if (password !== passwordAgain) {
            console.error('Passwords do not match');
            return;
        }

        const userData = {
            name,
            email,
            password,
            gender,
        };

        dispatch(register(userData));
    };

    if (isLoading) return <p>Loading...</p>;

    return (
        <div className="flex flex-col my-16 mx-8 lg:mx-24 justify-center items-center font-body box-border">
            <div className="w-full md:w-[40rem]">
                <h1 className="font-bold text-xl mb-4">Sign up</h1>
                <form className="flex flex-col gap-6" onSubmit={signUp}>
                    <TextInput
                        label="First name"
                        id="name"
                        value={name}
                        onChange={(e: any) => setName(e.target.value)}
                    />
                    <TextInput
                        label="Last name"
                        id="lastName"
                        value={lastName}
                        onChange={(e: any) => setLastName(e.target.value)}
                    />
                    <TextInput
                        label="E-mail address"
                        id="email"
                        value={email}
                        onChange={(e: any) => setEmail(e.target.value)}
                        isEmail={true}
                    />

                    <div className="flex gap-4">
                        <div className="flex flex-col gap-2">
                            <label htmlFor="day_of_birth">Day</label>
                            <input
                                type="text"
                                name="day_of_birth"
                                id="day_of_birth"
                                size={1}
                                maxLength={2}
                                onChange={(e: any) =>
                                    checkDayValidity(e.target.value) &&
                                    setDayOfBirth(e.target.value)
                                }
                                value={dayOfBirth}
                            />
                        </div>

                        <div className="flex flex-col gap-2">
                            <label htmlFor="month_of_birth">Month</label>
                            <select
                                name="month"
                                value={monthOfBirth}
                                onChange={(e: any) =>
                                    setMonthOfBirth(e.target.value)
                                }
                            >
                                <option value="1">January</option>
                                <option value="2">February</option>
                                <option value="3">March</option>
                                <option value="4">April</option>
                                <option value="5">May</option>
                                <option value="6">June</option>
                                <option value="7">July</option>
                                <option value="8">August</option>
                                <option value="9">September</option>
                                <option value="10">October</option>
                                <option value="11">November</option>
                                <option value="12">December</option>
                            </select>
                        </div>

                        <div className="flex flex-col gap-2">
                            <label htmlFor="year_of_birth">Year</label>
                            <input
                                type="text"
                                id="year_of_birth"
                                size={2}
                                maxLength={4}
                                value={yearOfBirth}
                                onChange={(e: any) =>
                                    checkYearValidity(e.target.value) &&
                                    setYearOfBirth(e.target.value)
                                }
                            />
                        </div>
                    </div>

                    <div className="flex flex-col gap-2">
                        <label htmlFor="gender">Gender</label>
                        <select
                            name="gender"
                            id="gender"
                            onChange={(e: any) => setGender(e.target.value)}
                            value={gender}
                        >
                            {genders.map((gender: any) => (
                                <option key={genders.indexOf(gender as never)}>
                                    {gender.name.charAt(0).toUpperCase() +
                                        gender.name.slice(1)}
                                </option>
                            ))}
                        </select>
                    </div>

                    <PasswordInput
                        value={password}
                        onChange={(e: any) => setPassword(e.target.value)}
                    />

                    <PasswordInput
                        label="Password again"
                        id="password_again"
                        value={passwordAgain}
                        onChange={(e: any) => setPasswordAgain(e.target.value)}
                    />

                    <Button label="Sign up" isPrimary={true} isSubmit={true} />
                </form>
            </div>
        </div>
    );
}
