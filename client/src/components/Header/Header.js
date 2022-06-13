import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Login from "../modals/Login";
import Signup from "../modals/Signup";
import Auth from '../../utils/auth';
import decode from 'jwt-decode';
import Logo from "../../assets/logo.png"

export default function Header() {

    const [modal, setModal] = useState(false);
    let loggedIn = false;
    let curToken = "";

    if (Auth.getToken()) {
        curToken = decode(Auth.getToken());
        console.log(curToken.data);
        loggedIn = true;
        console.log("Logged in status: ", loggedIn);
    }

    const headerStyle = {
        backgroundColor: "rgba(250,229,201,1)",
        borderBottom: "1px solid #A45771",
    }

    return (
        <div className="navbar drop-shadow-2xl fixed top-0 w-100 z-50" style={headerStyle}>
            <div className="flex-1">
                <a href="/"><img src={Logo} width="50%" alt="logo" /></a>
            </div>
            <div className="flex-none">
                {loggedIn ?
                    <ul className="menu menu-horizontal gap-4 p-0">
                        <li><Link to={`/dashboard/:${curToken.data._id}`}>Dashboard</Link></li>
                        <li>
                            <label className="btn modal-button bg-primary hover:bg-secondary text-black" onClick={Auth.logout}>Logout</label>
                        </li>
                    </ul>

                    : <ul className="menu menu-horizontal gap-4 p-0">
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
                }
            </div>
        </div >
    );
}