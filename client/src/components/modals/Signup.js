import React from 'react';

export default function Signup({ setModal }) {

    return (
        <div className="signupModal">

            <h3 className="text-lg font-bold text-center">Signup Here!</h3>

            <div className="form-control">
                <label className="my-3 input-group input-group-vertical">
                    <span className="py-1">Email</span>
                    <input type="email" placeholder="email@domain.com" className="input input-bordered" />
                </label>
                <label className="my-3 input-group input-group-vertical">
                    <span className="py-1">Username</span>
                    <input type="text" placeholder="Username" className="input input-bordered" />
                </label>
                <label className="my-3 input-group input-group-vertical">
                    <span className="py-1">Password</span>
                    <input type="password" placeholder="password" className="input input-bordered" />
                </label>
                <label className="my-3 input-group input-group-vertical">
                    <span className="py-1">Confirm Password</span>
                    <input type="password" placeholder="password" className="input input-bordered" />
                </label>
                <div className="flex flex-row gap-4 justify-center">

                    {/* send to dashboard after successful signup */}
                    <button type="submit" id="signupBtn" className="btn btn-primary">Signup</button>
                    <button type="submit" onClick={() => { setModal(false) }} className="btn btn-primary">Back to Login</button>
                </div>
            </div>

        </div>
    )
}