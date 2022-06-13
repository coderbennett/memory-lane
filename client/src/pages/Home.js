import React from 'react';

export default function Home() {

    const fontStyle = {
        fontFamily: "Indie Flower"
    }

    return (
        <div className="hero min-h-screen" style={{ backgroundImage: "url(https://images.unsplash.com/photo-1531845116688-48819b3b68d9?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1742&q=80)" }}>
            <div className="hero-overlay bg-opacity-40"></div>
            <div className="hero-content text-center text-neutral-content">
                <div className="max-w-md outline rounded-full bg-neutral bg-opacity-50 p-10">
                    <h1 className="mb-5 text-5xl text-base-100 text-base-100 font-bold" style={fontStyle}>Memory Lane</h1>
                    <p className="mb-5 text-base-100 text-2xl"><i>Create a timeline that suits your nostalgic needs.</i></p>
                </div>
            </div>
        </div>
    );
}