import React, { useState, useEffect } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';

import { QUERY_USER } from '../utils/queries';

import Auth from '../utils/auth';

const Dashboard = () => {
    const { userId } = useParams();

    const { loading, data } = useQuery(
        QUERY_USER, { variables: { userId: userId } }
    );

    const user = data?.user || {};

    if (Auth.loggedIn() && Auth.getUser().data._id === userId) {
        return <Navigate to="/dashboard/:userId" />;
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
        <div className="flex flex-col">
            <h2>{user.username}'s Dashboard</h2>
            <h3>Your Timelines</h3>
            <div class="card-actions justify-end">
                                <button class="btn btn-primary">Create Timeline</button>
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