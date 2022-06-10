import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import Auth from '../../utils/auth';
import { ADD_USER } from '../../utils/mutations'
import { assertValidSDL } from 'graphql/validation/validate';

export default function Signup({ setModal }) {

    const [formState, setFormState] = useState({
        input: {
            username: "",
            email: "",
            password: "",
            confirm_password: ""
        }, errors: {}
    });

    const [addUser, { data, loading, error }] = useMutation(ADD_USER);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormState({
            input: { ...formState.input, [name]: value },
            errors: { ...formState.errors },

        });
    };


    const handleFormSubmit = async (event) => {
        event.preventDefault();

        console.log(formState);
        console.log(formState.input);

        if (validate()) {
            console.log(formState);
            console.log(formState.input.email);
            console.log(formState.input.password);
            console.log(formState.input.username);

            const mutationResponse = await addUser({
                variables: {
                    email: formState.input.email,
                    password: formState.input.password,
                    username: formState.input.username,
                },
            });

            const token = mutationResponse.data.addUser.token;
            const userId = mutationResponse.data.addUser.user._id;
            Auth.login(token, userId);

            let input = {
                username: "",
                email: "",
                password: "",
                confirm_password: ""
            };
            setFormState({ input: input });

            alert('Successful Signup');
        }
    };




    const validate = () => {
        let input = formState.input;
        let errors = {};
        let isValid = true;

        if (!input.username) {
            isValid = false;
            errors.username = "Please enter a username";
        }

        if (!input.email) {
            isValid = false;
            errors.email = "Please enter an email Address";
        }

        if (typeof input.email !== "undefined") {

            var pattern = new RegExp(/^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/);
            if (!pattern.test(input.email)) {
                isValid = false;
                errors.email = "Please enter valid email address";
            }
        }

        if (!input.password) {
            isValid = false;
            errors.password = "Please enter a password";
        }

        if (!input.confirm_password) {
            isValid = false;
            errors.confirm_password = "Please confirm your password";
        }

        if (typeof input.password !== "undefined" && typeof input.confirm_password !== "undefined") {

            if (input.password != input.confirm_password) {
                isValid = false;
                errors.password = "Passwords don't match";
            }
        }

        setFormState({
            input: input, errors: errors
        });

        console.log(isValid);
        return isValid;
    };


    return (
        <form onSubmit={handleFormSubmit} className="signupModal">

            <h3 className="text-lg font-bold text-center">Signup Here!</h3>

            <div className="form-control">
                <label className="my-3 input-group input-group-vertical">
                    <span className="py-1">Email</span>
                    <input type="email" name="email" onChange={handleChange} id="email" placeholder="email@domain.com" className="input input-bordered" />
                    <div className="text-error">{formState.errors.email}</div>
                </label>
                <label className="my-3 input-group input-group-vertical">
                    <span className="py-1">Username</span>
                    <input type="text" onChange={handleChange} id="username" name="username" placeholder="Username" className="input input-bordered" />
                    <div className="text-error">{formState.errors.username}</div>
                </label>
                <label className="my-3 input-group input-group-vertical">
                    <span className="py-1">Password</span>
                    <input type="password" name="password" onChange={handleChange} placeholder="password" className="input input-bordered" />
                    <div className="text-error">{formState.errors.password}</div>
                </label>
                <label className="my-3 input-group input-group-vertical">
                    <span className="py-1">Confirm Password</span>
                    <input type="password" name="confirm_password" id="confirm_password" onChange={handleChange} placeholder="Confirm password" className="input input-bordered" />
                    <div className="text-error">{formState.errors.confirm_password}</div>
                </label>
                <div className="flex flex-row gap-4 justify-center">

                    {/* send to dashboard after successful signup */}
                    <button type="submit" value="Submit" id="signupBtn" className="btn btn-primary">Signup</button>
                    <button onClick={() => { setModal(false) }} className="btn btn-primary">Back to Login</button>
                </div>
            </div>

        </form>
    )
}