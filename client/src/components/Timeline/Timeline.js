import React, { useState, useEffect } from 'react';
import { useMutation, useQuery } from '@apollo/client';

import { Navigate, useParams } from 'react-router-dom';

import { QUERY_TIMELINE } from '../../utils/queries';
//we need to add the edit buttons here
import Auth from '../../utils/auth';

const Timeline = () => {
    //grab the timeline id from the URL parameters
    const { timelineId } = useParams();

    //useQuery to query the timeline at the given ID
    const { loading, data } = useQuery(
        QUERY_TIMELINE,
        {
            variables: { timelineId }
        }
    );

    const timeline = data;

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
            <div className="flex flex-row justify-evenly">
                {isEven ? (
                    <div className='w-64'></div>
                ) : (
                <></>
                )}
                {momentArray.map((moment) => (
                <>
                    <div key={moment._id} className="w-64 rounded">
                        <div className="flex flex-row">
                            <img src={moment.imageLink} alt={moment.title}></img>
                            <div className="flex flex-col justify-left ml-3">
                                <h3>{moment.title}</h3>
                                <p>{moment.description}</p>
                                <h4>{moment.month} {moment.day} {moment.year}</h4>
                            </div>
                        </div>
                    </div>
                    <div className="w-64"></div>
                </>
                ))}
            </div>
        )
    }

    return (
        <section id="timeline">
            <h2>{timeline.title}</h2>
            {renderMoments(false)}
            <hr></hr>
            {renderMoments(true)}
        </section>
    )
};

export default Timeline;