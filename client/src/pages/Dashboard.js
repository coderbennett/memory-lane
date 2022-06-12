import React, { useState, useEffect } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';

import { QUERY_USER } from '../utils/queries';

import Auth from '../utils/auth';

const Dashboard = () => {
    const { userId } = useParams();

    console.log(userId);

    let id = userId.substring(1);
    console.log(id);
    const { loading, data } = useQuery(
        QUERY_USER, { variables: { userId: id } }
    );

    const user = data?.user || {};

    if (Auth.loggedIn() && Auth.getUser().data._id !== id) {
        return <Navigate to={"/dashboard/:" + id } />;
    }

    if (!Auth.loggedIn()) {
        return <Navigate to={"/"} />;
    }

    if (loading) {
        return <div>Loading...</div>
    }

    if (!user?.username) {
        return (
            <h4>
                You need to be logged in to see your dashboard page. Use the log in button to log in or sign up.
            </h4>
        )
    }

    return (
        <div className="flex flex-col mt-16">
            <h2 className="mt-8 text-center text-4xl font-bold">{user.username}'s Dashboard</h2>
            <div class="card-actions justify-end">
                <button class="btn btn-primary m-6">Create New Timeline</button>
            </div>
            {user.timelines.length ? (
                <h3 className="mt-6 text-center text-2xl font-bold">Your Timelines</h3>
            ) : (<></>)}
            <div className="flex justify-end">
            </div>
            {user.timelines &&
                user.timelines.map((timeline) => (
                    <div className="card w-3/4 bg-base-100 shadow-xl">
                        <div className="card-body">
                            <h2 className="card-title">{timeline.title}</h2>
                            <p>{timeline.description}</p>
                            <div className="card-actions justify-end">
                                <button className="btn btn-primary">View Timeline</button>
                            </div>
                        </div>
                    </div>
                ))}
        </div>
    )
};

export default Dashboard;