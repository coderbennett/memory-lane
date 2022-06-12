import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { Link } from 'react-router-dom';
import { LOGIN } from '../../utils/mutations';
import Auth from '../../utils/auth';
import decode from 'jwt-decode';

export default function Login({ setModal }) {
    const [formState, setFormState] = useState({ email: '', password: ''});
    const [login, { error }] = useMutation(LOGIN);

    const handleFormSubmit = async (event) => {
        event.preventDefault();
        try {
            const { data } = await login({
                variables: { email: formState.email, password: formState.password }
            });
            console.log(data);

            const token = data.login.token;
            const decodeToken = decode(token);
            const userId = decodeToken.data._id;
            Auth.login(token, userId);
        } catch (e) {
            console.log(e);
        }
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormState({ ...formState, [name]: value });
    };


    return (
        <form onSubmit={handleFormSubmit} className="loginmodal">

            <h3 className="text-lg font-bold text-center">Login Here!</h3>

            <div className="form-control">
                <label className="my-3 input-group input-group-vertical">
                    <span className="py-1">Email</span>
                    <input type="email" name="email" id="email" onChange={handleChange} placeholder="email@domain.com" className="input input-bordered" />
                </label>
                <label className="my-3 input-group input-group-vertical">
                    <span className="py-1">Password</span>
                    <input type="password" name="password" id="password" onChange={handleChange} placeholder="password" className="input input-bordered" />
                </label>
                <div className="flex flex-row justify-center gap-4">

                    {/* if user is authenticated, send to dashboard */}
                    <button type="submit" value="Submit"  className="btn btn-primary">Login</button>
                    <button onClick={() => { setModal(true) }} className="btn btn-primary">Signup</button>
                </div>
            </div>

        </form>
    )
}