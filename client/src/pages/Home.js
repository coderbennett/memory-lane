import React from 'react';
import { Link } from 'react-router-dom';

export default function Home() {

    const fontStyle = {
        fontFamily: "Indie Flower"
    }

    return (   
    <> 
        <div className="hero min-h-screen" style={{ backgroundImage: "url(https://images.unsplash.com/photo-1531845116688-48819b3b68d9?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1742&q=80)" }}>
            <div className="hero-overlay bg-opacity-40"></div>
            <div className="hero-content text-center text-neutral-content">
                <div className="max-w-md outline rounded-full bg-neutral bg-opacity-50 p-10">
                    <h1 className="mb-5 text-5xl text-base-100 text-base-100 font-bold" style={fontStyle}>Memory Lane</h1>
                    <p className="mb-5 text-base-100 text-2xl"><i>Create a timeline that suits your nostalgic needs.</i></p>
                </div>
            </div>
        </div>

        <h3 className="mt-8 mb-16 text-center text-neutral text-xl font-bold" >View some of our already built timelines for some inspiration!</h3>

        <div className="card w-2/3 bg-base-100 shadow-xl mx-auto my-12">
            <figure><img src="https://i.imgur.com/mR1LpPK.png" alt="Hiking adventure timeline" /></figure>
            <div className="card-body">
                <h2 className="card-title">Timeline of Hiking Adventures</h2>
                <p>A personal timeline of hiking adventures.</p>
                <div className="card-actions justify-end">
                <Link to={"/timeline/62a6c00e9d2bb28ed6147db7"}>
                    <button className="btn btn-primary">View Timeline</button>
                </Link>
                </div>
            </div>
        </div>

        <div className="card w-2/3 bg-base-100 shadow-xl mx-auto my-12">
            <figure><img src="https://i.imgur.com/kDTKJsa.png" alt="Star wars movies timeline" /></figure>
            <div className="card-body">
                <h2 className="card-title">Timeline of Star Wars Movies</h2>
                <p>All the Star Wars movies in Earth-time chronological order.</p>
                <div className="card-actions justify-end">
                <Link to={"/timeline/62a6d62f57bb816e1730b731"}>
                    <button className="btn btn-primary">View Timeline</button>
                </Link>
                </div>
            </div>
        </div>

        <div className="card w-2/3 bg-base-100 shadow-xl mx-auto my-12">
            <figure><img src="https://i.imgur.com/u7bIGGz.png" alt="US history timeline" /></figure>
            <div className="card-body">
                <h2 className="card-title">Timeline of US Historical Events</h2>
                <p>Major historical events that occurred in the United States.</p>
                <div className="card-actions justify-end">
                <Link to={"/timeline/62a6dae757bb816e1730b762"}>
                    <button className="btn btn-primary">View Timeline</button>
                </Link>
                </div>
            </div>
        </div>
    </>
    );
}