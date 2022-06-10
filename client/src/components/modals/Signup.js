import React from 'react';

export default function Signup() {

    return (
        <div>

            <h3 className="text-lg font-bold">Signup Here!</h3>

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
                <div className="flex flex-row justify-between">
                    <button type="submit" className="btn btn-primary">Login</button>
                    <button type="submit" id="signupBtn" className="btn btn-primary">Signup</button>
                </div>
            </div>

        </div>
    )
}