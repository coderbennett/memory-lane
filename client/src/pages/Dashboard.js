import React, { useState, useEffect } from 'react';
import { Navigate, useParams, Link } from 'react-router-dom';
import { useQuery } from '@apollo/client';

import { QUERY_USER, QUERY_TIMELINES } from '../utils/queries';

import CreateTimeline from "../components/modals/CreateTimeline";

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
    console.log(user.username);
  
    const timelineResponse = useQuery(
        QUERY_TIMELINES, { variables: { author: user.username }}
    );

    const navigateToTimeline = (timelineId) => {
        return <Navigate to={"/timeline/:" + timelineId }/>
    }

    const timelines = timelineResponse.data?.userTimelines || [];
    console.log(timelines);

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
            <CreateTimeline user={user}/>
            {timelines.length ? (
                <h3 className="my-6 text-center text-2xl font-bold">Your Timelines</h3>
            ) : (
                <h3 className="my-6 text-center text-2xl font-bold">Create a Timeline to See it Listed Below</h3>
            )}
            <div className="flex justify-end">
            </div>
            {timelines &&
                timelines.map((timeline) => (
                    <div className="mx-auto card w-3/4 bg-primary shadow-xl">
                    <h2 className="card-title m-6 text-center font-bold">{timeline.title}</h2>
                        <div className="card-body bg-base-100">
                            <p>{timeline.description}</p>
                            <div className="card-actions justify-end">
                                <Link to={"/timeline/" + timeline._id}>
                                    <button className="btn btn-primary" onClick={navigateToTimeline(timeline._id)}>View Timeline</button>
                                </Link>
                            </div>
                        </div>
                    </div>
                ))}
        </div>
    )
};

export default Dashboard;