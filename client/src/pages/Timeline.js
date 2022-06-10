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

    // this function renders the moments
    // takes in a conditional to decide which moments
    // to render
    const renderMoments = (isEven) => {
        let momentArray = [];
        for (let i = 0; i < timeline.moments.length; i++) {
            if(i % 2 === 0 && isEven) {
                momentArray.push(timeline.moments[i]);
            }
            if (i % 2 !== 0 && !isEven) {
                momentArray.push(timeline.moments[i]);
            }
        }

        return (
            <div className="grid grid-row-1 grid-cols-12 gap-96 mt-16 border-b-2 pb-16">
                {!isEven ? (
                <>    
                    <div className='w-96'></div>
                    {momentArray && momentArray.map((moment) => (
                    <>
                        <div key={moment._id} class="card w-96 bg-base-100 shadow-xl">
                            <figure><img src={moment.imageLink} alt={moment.title} /></figure>
                            <div class="card-body">
                                <h2 class="card-title">{moment.month} {moment.day} {moment.year}</h2>
                                <p>{moment.description}</p>
                                <div class="card-actions justify-end">
                                    <button class="btn btn-primary">Edit Moment</button>
                                </div>
                            </div>
                        </div>
                        <div className='w-96'></div>
                    </>
                    ))}
                </>
                ) : (
                <>
                {momentArray && momentArray.map((moment) => ( 
                    <> 
                    <div key={moment._id} class="card w-96 bg-base-100 shadow-xl">
                        <figure><img src={moment.imageLink} alt={moment.title} /></figure>
                        <div class="card-body">
                            <h2 class="card-title">{moment.month} {moment.day} {moment.year}</h2>
                            <p>{moment.description}</p>
                            <div class="card-actions justify-end">
                                <button class="btn btn-primary">Edit Moment</button>
                            </div>
                        </div>
                    </div>
                    <div className='w-96'></div>
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
        <section id="timeline" className="overflow-x-scroll">
            <h2>{timeline.title}</h2>
            {renderMoments(false)}
            {renderMoments(true)}
        </section>
    )
};

export default Timeline;