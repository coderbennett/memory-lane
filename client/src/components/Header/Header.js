import React, { useState } from 'react';
import Login from "../modals/Login";
import Signup from "../modals/Signup";

export default function Header() {

    const [modal, setModal] = useState(false);

    return (
        <div className="navbar fixed top-0 w-100 z-50 bg-base-100">
            <div className="flex-1">
                <a href="/" className="btn btn-ghost normal-case text-xl">Memory Lane</a>
            </div>
            <div className="flex-none">
                <ul className="menu menu-horizontal gap-4 p-0">
                    <li><a>Item 1</a></li>
                    <li><a>Item 1</a></li>

                    {/* login/signup modal */}
                    <li>
                        <label htmlFor="my-modal-1" className="btn modal-button bg-primary hover:bg-secondary">Login</label>

                        <input type="checkbox" id="my-modal-1" className="modal-toggle" />
                        <div className="modal active:bg-transparent">
                            <div className="modal-box relative">
                                <label htmlFor="my-modal-1" onClick={() => { setModal(false) }} className="btn btn-sm btn-circle text-primary-content bg-primary absolute right-2 top-2 hover:bg-secondary">✕</label>

                                {/* conditonally change between login and signup modal */}
                                {!modal ? <Login setModal={setModal} /> : <Signup setModal={setModal} />}
                            </div>
                        </div>




                    </li>
                </ul>
            </div>
        </div >
    );
}