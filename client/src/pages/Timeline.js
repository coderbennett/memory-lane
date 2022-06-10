import React, { useState, useEffect } from 'react';
import { useMutation, useQuery } from '@apollo/client';

import { Navigate, useParams } from 'react-router-dom';

import { QUERY_TIMELINE } from '../utils/queries';
//we need to add the edit buttons here
import Auth from '../utils/auth';

const Timeline = () => {
    //grab the timeline id from the URL parameters
    const { timelineId } = useParams();
    //useQuery to query the timeline at the given ID
    const { loading, data } = useQuery( QUERY_TIMELINE, {
            variables: { timelineId: timelineId }
        }
    );

    const timeline = data?.timeline || {};
    console.log(timeline);

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
    const renderMoments = (isEven) => {
        console.log(timeline.moments);
        let sortedMoments = [...timeline.moments];
        console.log(sortedMoments);
        if(sortedMoments !== []) {
            sortedMoments = sortedMoments.sort((a, b) => {
                return a.year - b.year || a.month - b.month || a.day - b.day;
            })
        }
        let momentArray = [];

        for (let i = 0; i < sortedMoments.length; i++) {
            if(i % 2 === 0 && isEven) {
                momentArray.push(sortedMoments[i]);
            }
            if (i % 2 !== 0 && !isEven) {
                momentArray.push(sortedMoments[i]);
            }
        }

        let columns = momentArray.length * 2;
        columns++;

        return (
            <div className={"grid grid-row-1 grid-cols-"+ columns +" gap-96 mt-16 border-b-2 pb-16 w-fit"}>
                {!isEven ? (
                <>    
                    <div className='w-72'></div>
                    {momentArray && momentArray.map((moment) => (
                    <>
                        <div key={moment._id} class="mx-3 card w-96 bg-base-100 shadow-xl">
                            <figure><img src={moment.imageLink} alt={moment.title} /></figure>
                            <div class="card-body">
                                <h2 class="card-title">{moment.title}</h2>
                                <p>{moment.description}</p>
                                <div class="card-actions justify-end">
                                    {Auth.loggedIn() && Auth.getUser().data.username === timeline.author ? (<button class="btn btn-primary">Edit Moment</button>) : (<></>)}
                                </div>
                                <h2 class="card-title">{formatMonth(moment.month)} {formatDay(moment.day)} {moment.year}</h2>
                            </div>
                        </div>
                        <div className='w-72'></div>
                    </>
                    ))}
                </>
                ) : (
                <>
                {momentArray && momentArray.map((moment) => ( 
                <> 
                    <div key={moment._id} class="mx-3 card w-96 bg-base-100 shadow-xl">
                        <figure><img src={moment.imageLink} alt={moment.title} /></figure>
                        <div class="card-body">
                            <h2 class="card-title">{moment.title}</h2>
                            <p>{moment.description}</p>
                            <div class="card-actions justify-end">
                                {Auth.loggedIn() && Auth.getUser().data.username === timeline.author ? (<button class="btn btn-primary">Edit Moment</button>) : (<></>)}
                            </div>
                            <h2 class="card-title">{formatMonth(moment.month)} {formatDay(moment.day)} {moment.year}</h2>
                        </div>
                    </div>
                    <div className='w-72'></div>
                </>
                ))}

                </>
                )}
            </div>
        )
    }
    if (loading) {
        return <div>Loading...</div>
    }

    return (
        <>
            <h2 className="mt-16 text-center text-4xl font-bold">{timeline.title}</h2>
            <div className="flex justify-end">
                <button class="btn btn-primary inline mr-6">Add Moment</button>
            </div>
                
            <section id="timeline" className="overflow-x-scroll">
                {renderMoments(false)}
                {renderMoments(true)}
            </section>
        </>
    )
};

export default Timeline;