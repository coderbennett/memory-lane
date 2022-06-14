import React from 'react';
import { Navigate, useParams, Link } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/client';
import { QUERY_USER, QUERY_TIMELINES } from '../utils/queries';
import { DELETE_TIMELINE } from '../utils/mutations';
import CreateTimeline from "../components/modals/CreateTimeline";
import Auth from '../utils/auth';

const Dashboard = () => {
    //grab the userId from the url with useParams
    const { userId } = useParams();

    //here we are grabbing the mutation delete timeline to be used shortly
    const [deleteTimeline] = useMutation(DELETE_TIMELINE);

    //we're setting the userId and removing the colon from the url
    let id = userId.substring(1);

    //this function handles the delete button functionality when it is clicked
    const handleDeleteBtn = async (event) => {
        //we access the name property from the button clicked
        //with object destructuring
        const { name } = event.target;

        //we try to delete the timeline and refresh the page
        //if it fails we send an error to the console
        try {
            await deleteTimeline({
                variables: { timelineId: name }
            });


            window.location.assign('/dashboard/:' + id);
        } catch (e) {
            console.error(e);
        }
    };

    //we are using usequery here to query the database for a user with the given id
    const { loading, data } = useQuery(
        QUERY_USER, { variables: { userId: id } }
    );

    //here we set the user data to the user variable (if there is no data it is set to an empty object)
    const user = data?.user || {};

    //we also use usequery to query the database for all the timelines with the current user as an author
    const timelineResponse = useQuery(
        QUERY_TIMELINES, { variables: { author: user.username } }
    );

    //we set the timelines variable to the response from the query above
    const timelines = timelineResponse.data?.userTimelines || [];

    //if you're logged in and you accidentally go to the wrong dashboard
    //somehow we redirect you to the correct dashboard
    if (Auth.loggedIn() && Auth.getUser().data._id !== id) {
        return <Navigate to={"/dashboard/:" + id} />;
    }

    //if you're trying to get here without being logged in we send you to the
    //homepage
    if (!Auth.loggedIn()) {
        return <Navigate to={"/"} />;
    }

    //while the queries load we post this to the page
    if (loading) {
        return <div>Loading...</div>
    }

    //we create two style objects to apply to some of our JSX elements below
    const fontStyle = {
        fontFamily: "Indie Flower",
    }
    const underlineStyle = {
        fontFamily: "Indie Flower",
        background: "linear-gradient(to left, #f69ec4, #f9dd94 100%)",
        backgroundPosition: "0 100%",
        backgroundSize: "100% 2px",
        backgroundRepeat: "repeat-x",
        textDecoration: "none"
    }

    //this returns our dashboard page with the user's timelines (if they have any)
    return (
        <div className="flex flex-col mt-16">

            {/*we display the user's name at the top and have a createtimeline component, passing the user data as a prop*/}
            <h2 className="mt-16 text-center text-4xl font-bold" style={fontStyle}><u style={underlineStyle}>{user.username}'s Dashboard</u></h2>
            <CreateTimeline user={user} />

            {/*if timelines.length is more than 1 we render 'your timelines' otherwise we let them know they can create a timeline*/}
            {timelines.length ? (
                <h3 className="my-6 text-center text-2xl font-bold">Your Timelines</h3>
            ) : (
                <h3 className="my-6 text-center text-2xl font-bold">Create a Timeline to See it Listed Below</h3>
            )}
        
            {/*if we have timelines then we map across the array and display them in cards top to bottom*/}
            {timelines &&
                timelines.map((timeline) => (
                    <div key={timeline._id} className="mx-auto border border-zinc-900 my-8 card w-3/4 bg-primary shadow-xl">
                        <h2 className="card-title m-6 text-center font-bold">{timeline.title}</h2>
                        <div className="card-body bg-base-100">
                            <p>{timeline.description}</p>
                            <div className="card-actions justify-end">
                                <Link to={"/timeline/" + timeline._id}>
                                    <button className="btn btn-primary">View Timeline</button>
                                </Link>
                                <button className="btn btn-error hover:btn-warning" name={timeline._id} onClick={handleDeleteBtn}>Delete Timeline</button>
                            </div>
                        </div>
                    </div>
                ))}
        </div>
    )
};

export default Dashboard;