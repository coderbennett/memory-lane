import React, { useState } from 'react';

export default function Login({ modal, setModal }) {

    return (
        <div className="addmomentmodal">

            <h3 className="text-lg font-bold">Login Here!</h3>

            <div className="form-control">
                <label className="my-3 input-group input-group-vertical">
                    <span className="py-1">Email</span>
                    <input type="email" placeholder="email@domain.com" className="input input-bordered" />
                </label>
                <label className="my-3 input-group input-group-vertical">
                    <span className="py-1">Password</span>
                    <input type="password" placeholder="password" className="input input-bordered" />
                </label>
                <div className="flex flex-row justify-center gap-4">
                    <button type="submit" className="btn btn-primary">Login</button>
                    <button onClick={() => { setModal(true) }} className="btn btn-primary">Signup</button>
                </div>
            </div>

        </div>
    )
}