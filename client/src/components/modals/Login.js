// importing essential files
import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { LOGIN } from '../../utils/mutations';
import Auth from '../../utils/auth';
import decode from 'jwt-decode';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Login({ setModal }) {

    // we have a state to get the current form values
    const [formState, setFormState] = useState({ email: '', password: '' });

    // sets login to use the login mutation
    const [login, { error }] = useMutation(LOGIN);

    // we have a handler for form submit and we attempt to log in using the form state values.
    const handleFormSubmit = async (event) => {
        event.preventDefault();

        // uses the form state values to see if there are any accounts with the same values. if there is a match, we authenticate the user
        try {

            const { data } = await login({
                variables: { email: formState.email, password: formState.password }
            });

            const token = data.login.token;
            const decodeToken = decode(token);
            const userId = decodeToken.data._id;
            Auth.login(token, userId);
        }

        // if user authentication fails, a toast error message will appear.
        catch (e) {
            toast.error("Invalid Login Credentials", {
                position: "bottom-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                progress: undefined
            });
        };
    };

    // grabs the changed value of the text box and set the formstate accordingly to the new changed value
    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormState({ ...formState, [name]: value });
    };

    return (
        <form onSubmit={handleFormSubmit} className="loginmodal">

            <h3 className="text-lg font-bold text-center">Login Here!</h3>

            <div className="form-control ">

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
                    <button type="submit" value="Submit" className="btn btn-primary">Login</button>
                    <button onClick={() => { setModal(true) }} className="btn btn-primary">Signup</button>
                </div>
            </div>
        </form>
    );
}