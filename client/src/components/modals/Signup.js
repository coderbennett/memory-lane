// importing essential files
import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import Auth from '../../utils/auth';
import { ADD_USER } from '../../utils/mutations.js';
import decode from 'jwt-decode';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Signup({ setModal }) {

    // creates a form state that saves the user input
    const [formState, setFormState] = useState({
        input: {
            username: '',
            email: '',
            password: '',
            confirm_password: ''
        }, errors: {}
    });

    // sets addUser to use the add_user mutation
    const [addUser, { error, data }] = useMutation(ADD_USER);

    // grabs the changed value of the text box and set the formstate accordingly to the new changed value
    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormState({
            input: { ...formState.input, [name]: value },
            errors: { ...formState.errors }
        });
    };

    // we have a handler for form submit and we attempt to log in using the form state values.
    const handleFormSubmit = async (event) => {
        event.preventDefault();

        // checks to see validate returns true or false
        if (validate()) {

            const { username, email, password } = formState.input;

            // create a new user using the formstate values and then authenticate them
            try {
                const { data } = await addUser({
                    variables: {
                        username: username,
                        email: email,
                        password: password
                    },
                });

                const token = data.addUser.token;
                const decodeToken = decode(token);
                const userId = decodeToken.data._id;
                Auth.login(token, userId);
            } catch (e) {

            }
        }
    };

    // we have a function to valudate if the user has inputted acceptable values into the fields
    const validate = () => {
        let input = formState.input;
        let errors = {};
        let isValid = true;

        // checks if username is empty
        if (!input.username) {
            isValid = false;
            toast.error("Please enter a username", {
                position: "bottom-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                progress: undefined
            });
        };

        // checks if the email box is empty
        if (!input.email) {
            isValid = false;
            toast.error("Please enter an email", {
                position: "bottom-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                progress: undefined
            });
        };

        // checks to see if the email follows an appropriate format
        if (typeof input.email !== "undefined") {

            var pattern = new RegExp(/^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/);
            if (!pattern.test(input.email)) {
                isValid = false;
                toast.error("Please enter a valid email address", {
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

        // checks to see if the password box is empty
        if (!input.password) {
            isValid = false;
            toast.error("please enter a valid password", {
                position: "bottom-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                progress: undefined
            });
        };

        // checks to see if confirm password box is empty
        if (!input.confirm_password) {
            isValid = false;
            toast.error("Please confirm password", {
                position: "bottom-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                progress: undefined
            });
        };

        // checks to see if both password and confirm password are not undefined
        if (typeof input.password !== "undefined" && typeof input.confirm_password !== "undefined") {

            // checks to see if password and confirm password have the same values
            if (input.password !== input.confirm_password) {
                isValid = false;
                toast.error("Password does not match", {
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

        // sets the values of the form into the formstate
        setFormState({
            input: input, errors: errors
        });

        // if all the validations pass, return true. if not, return false
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
    );
};