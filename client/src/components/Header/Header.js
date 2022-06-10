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
                <ul className="menu menu-horizontal p-0">
                    <li><a>Item 1</a></li>
                    <li><a>Item 1</a></li>

                    {/* login/signup modal */}
                    <li>
                        <label for="my-modal-1" class="btn modal-button bg-primary">Login</label>

                        <input type="checkbox" id="my-modal-1" class="modal-toggle" />
                        <div class="modal">
                            <div class="modal-box relative">
                                <label for="my-modal-1" onClick={() => { setModal(false) }} class="btn btn-sm btn-circle absolute right-2 top-2">✕</label>

                                {/* conditonally change between login and signup modal */}
                                {!modal ? <Login modal={modal} setModal={setModal} /> : <Signup modal={modal} setModal={setModal} />}
                            </div>
                        </div>




                    </li>
                </ul>
            </div>
        </div >
    );
}