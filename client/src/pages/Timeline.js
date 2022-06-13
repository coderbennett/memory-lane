import React, { useState } from 'react';
import { useMutation, useQuery } from '@apollo/client';

import { useParams } from 'react-router-dom';

import AddMoment from "../components/modals/AddMoment";

import { QUERY_TIMELINE } from '../utils/queries';
import { DELETE_MOMENT } from '../utils/mutations';

import { useBreakpoints, useCurrentWidth } from 'react-breakpoints-hook';

import Auth from '../utils/auth';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Timeline = () => {
    let width = useCurrentWidth();
    let { lg } = useBreakpoints({
        lg: { min: 961, max: null }
    });

    //grab the timeline id from the URL parameters
    const { timelineId } = useParams();
    //useQuery to query the timeline at the given ID
    const { loading, data } = useQuery(QUERY_TIMELINE, {
        variables: { timelineId: timelineId }
    }
    );

    const [deleteMoment] = useMutation(DELETE_MOMENT);

    const handleDeleteBtn = async (event) => {
        const { name } = event.target;

        try {
            const { data } = await deleteMoment({
                variables: {
                    timelineId: timelineId,
                    momentId: name
                }
            });

            window.location.assign('/timeline/' + timelineId);
        } catch (e) {
            console.error(e);
        }
    };

    let hasMoments = true;

    const timeline = data?.timeline || {};

    const formatDay = (day) => {
        switch (day) {
            case 1:
                return '1st,';
            case 21:
                return '21st,';
            case 31:
                return '31st,';
            case 2:
                return '2nd,';
            case 22:
                return '22nd,';
            case 3:
                return '3rd,';
            case 23:
                return '23rd,';
            default:
                return day + 'th,'
        }
    };

    const formatMonth = (month) => {
        switch (month) {
            case 1:
                return 'January';
            case 2:
                return 'February';
            case 3:
                return 'March';
            case 4:
                return 'April';
            case 5:
                return 'May';
            case 6:
                return 'June';
            case 7:
                return 'July';
            case 8:
                return 'August';
            case 9:
                return 'September';
            case 10:
                return 'October';
            case 11:
                return 'November';
            default:
                return 'December';
        }
    }

    // this function renders the moments
    // takes in a conditional to decide which moments
    // to render
    const renderMoments = () => {

        let sortedMoments = [...timeline.moments];
        if (sortedMoments !== []) {
            sortedMoments = sortedMoments.sort((a, b) => {
                return a.year - b.year || a.month - b.month || a.day - b.day;
            })
        }

        return (
            <div className="flex flex-col justify-center">
                {sortedMoments && sortedMoments.map((moment, i) => (
                    <div key={moment._id} className="grid grid-rows-1 grid-cols-3 mx-auto">
                        {i % 2 === 0 ? (
                            <>
                                <div className="w-100 text-center mt-36">
                                </div>
                                <div className="w-0 border-4 border-neutral mx-auto"></div>
                                <div className="mr-24 card w-100 bg-secondary shadow-xl">
                                    <figure><img src={moment.imageLink} alt={moment.title} /></figure>
                                    <div className="card-body">
                                        <h2 className="card-title">{moment.title}</h2>
                                        <p>{moment.description}</p>
                                        <div className="card-actions justify-end">
                                            {Auth.loggedIn() && Auth.getUser().data.username === timeline.author ? (<button className="btn btn-error hover:btn-warning" name={moment._id} onClick={handleDeleteBtn}>Delete Moment</button>) : (<></>)}
                                        </div>
                                        <h2 className="card-title">{formatMonth(moment.month)} {formatDay(moment.day)} {moment.year}</h2>
                                    </div>
                                </div>
                            </>
                        ) : (
                            <>
                                <div className="ml-16 bg-secondary card w-100 shadow-xl">
                                    <figure><img src={moment.imageLink} alt={moment.title} /></figure>
                                    <div className="card-body">
                                        <h2 className="card-title">{moment.title}</h2>
                                        <p>{moment.description}</p>
                                        <div className="card-actions justify-end">
                                            {Auth.loggedIn() && Auth.getUser().data.username === timeline.author ? (<button className="btn btn-error hover:btn-warning" name={moment._id} onClick={handleDeleteBtn}>Delete Moment</button>) : (<></>)}
                                        </div>
                                        <h2 className="card-title">{formatMonth(moment.month)} {formatDay(moment.day)} {moment.year}</h2>
                                    </div>
                                </div>
                                <div className="w-0 border-4 border-neutral mx-auto"></div>
                                <div className="w-100">
                                </div>
                            </>
                        )}
                    </div>
                ))}
            </div>
        )
    };

    const renderMobileMoments = () => {

        let sortedMoments = [...timeline.moments];
        if (sortedMoments !== []) {
            sortedMoments = sortedMoments.sort((a, b) => {
                return a.year - b.year || a.month - b.month || a.day - b.day;
            })
        }

        return (
            <div className="flex flex-col">
                {sortedMoments && sortedMoments.map((moment, i) => (
                    <div key={moment._id} className="grid grid-rows-1 mx-auto grid-cols-4">
                        <div className="w-0 border-4 border-neutral"></div>
                        <div key={moment._id} className="my-6 mx-auto card w-96 bg-secondary shadow-xl col-span-3">
                            <figure><img src={moment.imageLink} alt={moment.title} /></figure>
                            <div className="card-body">
                                <h2 className="card-title">{moment.title}</h2>
                                <p>{moment.description}</p>
                                <div className="card-actions justify-end">
                                    {Auth.loggedIn() && Auth.getUser().data.username === timeline.author ? (<button className="btn btn-error hover:btn-warning" name={moment._id} onClick={handleDeleteBtn}>Delete Moment</button>) : (<></>)}
                                </div>
                                <h2 className="card-title">{formatMonth(moment.month)} {formatDay(moment.day)} {moment.year}</h2>
                            </div>
                        </div>
                    </div>
                ))}
            </div>)
    }


    if (loading) {
        return <div>Loading...</div>
    }

    return (
        <>
            <h2 className="mt-24 text-center text-neutral text-4xl font-bold">{timeline.title}</h2>
            <div className="flex justify-between">

                <label onClick={() => {
                    navigator.clipboard.writeText(window.location.href);
                    toast.success("Copid to clipboard", {
                        position: "bottom-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: false,
                        draggable: true,
                        progress: undefined
                    });
                }
                } className="btn m-6 text-black modal-button bg-primary hover:bg-secondary">Share timeline</label>
                {Auth.loggedIn() && Auth.getUser().data.username === timeline.author ? (<AddMoment timeline={timeline} />) : (<></>)}
            </div>

            {hasMoments ? (
                <section id="timeline">
                    {lg ? (
                        <>
                            {renderMoments()}
                        </>
                    ) : (
                        <>
                            {renderMobileMoments()}
                        </>
                    )}
                </section>
            ) : (
                <h3 className="my-16 text-center text-2xl font-bold">Aww shucks! Looks like this Timeline doesn't have any moments yet..</h3>
            )}

        </>
    )
};

export default Timeline;