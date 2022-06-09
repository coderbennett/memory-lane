import React from 'react';
import { Link } from 'react-router-dom'

export default function Header() {
    return (
        <div className="navbar fixed top-0 w-100 z-50 bg-base-100">
            <div className="flex-1">
                <a href="/" className="btn btn-ghost normal-case text-xl">daisyUI</a>
            </div>
            <div className="flex-none">
                <ul className="menu menu-horizontal p-0">
                    <li><a>Item 1</a></li>
                    <li><a>Item 1</a></li>
                    <li>
                        <label for="my-modal-4" className="btn modal-button bg-primary">Login</label>


                        <input type="checkbox" id="my-modal-4" className="modal-toggle" />
                        <label for="my-modal-4" className="modal cursor-pointer">
                            <label className="modal-box relative" for="">
                                <h3 className="text-lg font-bold">Login Here!</h3>

                                <div className="form-control">
                                    <label className="my-3 input-group input-group-vertical">
                                        <span className="py-1">Email</span>
                                        <input type="text" placeholder="email@domain.com" className="input input-bordered" />
                                    </label>
                                    <label className="my-3 input-group input-group-vertical">
                                        <span className="py-1">Password</span>
                                        <input type="password" placeholder="password" className="input input-bordered" />
                                    </label>
                                    <div className="flex flex-row justify-between">
                                        <button type="submit" className="btn btn-primary">Login</button>
                                        <button type="submit" className="btn btn-primary">Signup</button>
                                    </div>
                                </div>
                            </label>
                        </label>
                    </li>




                </ul>
            </div>
        </div>
    );
}