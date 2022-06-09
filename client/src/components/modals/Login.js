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

            <div class="form-control">
                <label class="my-3 input-group input-group-vertical">
                    <span className="py-1">Email</span>
                    <input type="text" placeholder="email@domain.com" class="input input-bordered" />
                </label>
                <label class="my-3 input-group input-group-vertical">
                    <span className="py-1">Password</span>
                    <input type="password" placeholder="password" class="input input-bordered" />
                </label>
                <div className="flex flex-row justify-between">
                    <button type="submit" class="btn btn-primary">Login</button>
                    <button type="submit" class="btn btn-primary">Signup</button>
                </div>
            </div>
        </div>
    )
}