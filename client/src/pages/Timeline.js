import React from 'react';
import { useMutation, useQuery } from '@apollo/client';

import { useParams } from 'react-router-dom';

import AddMoment from "../components/modals/AddMoment";

import { QUERY_TIMELINE } from '../utils/queries';
import { DELETE_MOMENT } from '../utils/mutations';


import Auth from '../utils/auth';

const Timeline = () => {
    //grab the timeline id from the URL parameters
    const { timelineId } = useParams();
    //useQuery to query the timeline at the given ID
    const { loading, data } = useQuery( QUERY_TIMELINE, {
            variables: { timelineId: timelineId }
        }
    );

    const [deleteMoment] = useMutation(DELETE_MOMENT);

    const handleDeleteBtn = async (event) => {
        const { name } = event.target;

        console.log(timelineId);
        console.log(name);
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
    const renderMoments = (isEven) => {

        let sortedMoments = [...timeline.moments];
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
        const sCols = ["grid-cols-", columns].join('');
        
        return (
            <div className={`grid grid-row-1 gap-12 mt-16 border-b-2 pb-16 w-fit ${sCols}`}>
                {!isEven ? (
                <>    
                    <div key={'firstdiv'} className='w-12'></div>
                    {momentArray && momentArray.map((moment) => (
                    <>
                        <div key={moment._id} className="mx-3 card w-96 bg-base-100 shadow-xl">
                            <figure><img src={moment.imageLink} alt={moment.title} /></figure>
                            <div className="card-body">
                                <h2 className="card-title">{moment.title}</h2>
                                <p>{moment.description}</p>
                                <div className="card-actions justify-end">
                                    {Auth.loggedIn() && Auth.getUser().data.username === timeline.author ? (<button className="btn btn-primary" name={moment._id} onClick={handleDeleteBtn}>Delete Moment</button>) : (<></>)}
                                </div>
                                <h2 className="card-title">{formatMonth(moment.month)} {formatDay(moment.day)} {moment.year}</h2>
                            </div>
                        </div>
                        <div className='w-12'></div>
                    </>
                    ))}
                </>
                ) : (
                <>
                {momentArray && momentArray.map((moment) => ( 
                <> 
                    <div key={moment._id} className="mx-3 card w-96 bg-base-100 shadow-xl">
                        <figure><img src={moment.imageLink} alt={moment.title} /></figure>
                        <div className="card-body">
                            <h2 className="card-title">{moment.title}</h2>
                            <p>{moment.description}</p>
                            <div className="card-actions justify-end">
                                {Auth.loggedIn() && Auth.getUser().data.username === timeline.author ? (<button name={moment._id} onClick={handleDeleteBtn} className="btn btn-primary">Delete Moment</button>) : (<></>)}
                            </div>
                            <h2 className="card-title">{formatMonth(moment.month)} {formatDay(moment.day)} {moment.year}</h2>
                        </div>
                    </div>
                    <div className='w-12'></div>
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
                {Auth.loggedIn() && Auth.getUser().data.username === timeline.author ? (<AddMoment timeline={timeline}/>) : (<></>)}
            </div>
                
            {hasMoments ? (
            <section id="timeline" className="overflow-x-scroll">
                {renderMoments(false)}
                {renderMoments(true)}
            </section>
            ) : (
                <h3 className="my-16 text-center text-2xl font-bold">Aww shucks! Looks like this Timeline doesn't have any moments yet..</h3>
            )}
            
        </>
    )
};

export default Timeline;