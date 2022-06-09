import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { Link } from 'react-router-dom';
import { LOGIN } from '../utils/mutations';
import Auth from '../utils/auth';

export default function AddMoment() {

    const [formState, setFormState] = useState({ email: '', password: '' });
    const [login, { error }] = useMutation(LOGIN);

    const handleFormSubmit = async (event) => {
        event.preventDefault();
        try {
            const mutationResponse = await login({
                variables: { email: formState.email, password: formState.password },
            });
            const token = mutationResponse.data.login.token;
            Auth.login(token);
        } catch (e) {
            console.log(e);
        }
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormState({
            ...formState,
            [name]: value,
        });
    };

    return (
        <div className="addmomentmodal">
            <h3 className="text-lg font-bold">Login Here!</h3>

            <form className="form-control" onSubmit={handleFormSubmit}>
                <label className="my-3 input-group input-group-vertical">
                    <span className="py-1" htmlFor="email">Email</span>
                    <input name="email" type="email" id="email"
                        onChange={handleChange} placeholder="email@domain.com" className="input input-bordered" />
                </label>
                <label htmlFor="pwd" className="my-3 input-group input-group-vertical">
                    <span className="py-1">Password</span>
                    <input name="password" type="password" id="pwd"
                        onChange={handleChange} placeholder="password" className="input input-bordered" />
                </label>
                <div className="flex flex-row justify-between">
                    <button type="submit" className="btn btn-primary">Login</button>
                    <button className="btn btn-primary">Signup</button>
                </div>
                {error ? (
                    <div>
                        <p className="error-text">Invalid Email or Password</p>
                    </div>
                ) : null}
            </form>
        </div>
    )
}