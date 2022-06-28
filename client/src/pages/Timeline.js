import React from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { useParams } from 'react-router-dom';
import AddMoment from "../components/modals/AddMoment";
import EditMoment from "../components/modals/EditMoment";
import { QUERY_TIMELINE } from '../utils/queries';
import { DELETE_MOMENT } from '../utils/mutations';
import { useBreakpoints} from 'react-breakpoints-hook';
import Auth from '../utils/auth';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Timeline = () => {

    //we set the breakpoints with the useBreakpoints function
    //we only need one breakpoint lg
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

    //we have imported the delete moment mutation above
    //now we are setting it up here to be used shortly
    const [deleteMoment] = useMutation(DELETE_MOMENT);


    //this function is called on clicking the delete button
    const handleDeleteBtn = async (event) => {
        //here we are grabbing the name property from the button
        //this is the id of the moment we want to delete
        const { name } = event.target;

        //within this try block we try to delete the moment
        //if it passes, the moment will be deleted and we will
        //refresh the page
        //if it fails an error will log to the console
        try {
            await deleteMoment({
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

    //here we are setting the data we received from our usequery
    //and setting it to the variable timeline
    const timeline = data?.timeline || {};

    //we are defining the format day function here, which
    //will format the day (int) to look nicer on the webpage
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

    //here we are defining the format month function, which
    //will format the month (int) to look nicer on the webpage
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

    const checkImage = (imgLink) => {
        console.log(imgLink);
        fetch(imgLink)
            .then((res) => {
                console.log("res: "+res);
                if (res.status === 200){
                    return true;
                }
                else {
                    return false;
                }
        });
    }

    // this function renders the (desktop/web view) moments
    const renderMoments = () => {

        //here we are spreading the moments array from the
        //timeline we queried above, and setting it to a 
        //new array named sortedMoments
        let sortedMoments = [...timeline.moments];

        //if sortedMoments is not an array, then we skip this
        if (sortedMoments !== []) {
            //now we use the built in sort function to sort each item in the array
            //by comparing the date variables against eachother
            sortedMoments = sortedMoments.sort((a, b) => {
                return a.year - b.year || a.month - b.month || a.day - b.day;
            })
        }

        //now we have all we need to return the sortedMoments 
        return (
            //we create a flex column to put the timeline into
            <div className="flex flex-col justify-center">

                {/*if sortedMoments is truthy, then we can map through the moments keeping in mind their index*/}
                {sortedMoments && sortedMoments.map((moment, i) => (

                    <div key={moment._id} className="grid grid-rows-1 grid-cols-3 mx-auto">
                        {/*above this line we set 3 columns and 1 row for each moment in the timeline 
                           below this line we are checking if the current index is odd or even and then
                           rendering opposites for each to create a zigzag timeline*/}

                        {i % 2 === 0 ? (
                            <>
                                <div className="w-100 text-center mt-36 ">
                                    {/*this is an empty container*/}
                                </div>

                                <div className="w-0 border-4 border-neutral mx-auto">{/*this is the timeline line for this row*/}</div>

                                {/*this is the parent div for our even card*/}
                                <div className="mr-16 card w-100 bg-secondary shadow-xl border border-zinc-900">
                                    {checkImage(moment.imageLink) ? (
                                        <figure><img src={moment.imageLink} alt={moment.title} /></figure>
                                    ) : 
                                    (<></>)
                                    }

                                    <div className="card-body">
                                        <h2 className="card-title">{moment.title}</h2>
                                        <p>{moment.description}</p>
                                        {/*Here we are using verifying the user is logged in and the author so they can
                                        delete moments if they want */}
                                        {Auth.loggedIn() && Auth.getUser().data.username === timeline.author ? (
                                        <div className="card-actions justify-end">
                                            <EditMoment timeline={timeline} momentId={moment._id}/>
                                            <button className="btn btn-error hover:btn-warning" name={moment._id} onClick={handleDeleteBtn}>Delete Moment</button>
                                        </div>
                                        ) : (<></>)}
                                        <h2 className="card-title">{formatMonth(moment.month)} {formatDay(moment.day)} {moment.year}</h2>
                                    </div>

                                </div>
                            </>
                        ) : (
                            <>
                                {/*this is the parent div for our odd card*/}
                                <div className="ml-16 bg-secondary card w-100 shadow-xl border border-zinc-900">
                                    {checkImage(moment.imageLink) ? (
                                        <figure><img src={moment.imageLink} alt={moment.title} /></figure>
                                    ) : 
                                    (<></>)
                                    }

                                    <div className="card-body">
                                        <h2 className="card-title">{moment.title}</h2>
                                        <p>{moment.description}</p>
                                        {/*Here we are using verifying the user is logged in and the author so they can
                                        delete moments if they want */}
                                        {Auth.loggedIn() && Auth.getUser().data.username === timeline.author ? (
                                        <div className="card-actions justify-end">
                                            <EditMoment timeline={timeline} momentId={moment._id}/>
                                            <button className="btn btn-error hover:btn-warning" name={moment._id} onClick={handleDeleteBtn}>Delete Moment</button>
                                        </div>
                                        ) : (<></>)}
                                        <h2 className="card-title">{formatMonth(moment.month)} {formatDay(moment.day)} {moment.year}</h2>
                                    </div>

                                </div>

                                <div className="w-0 border-4 border-neutral mx-auto">{/*this is the timeline line for this row*/}</div>

                                <div className="w-100">
                                    {/*this is an empty container*/}
                                </div>
                            </>
                        )}
                    </div>
                ))}
            </div>
        )
    };

    //this function renders our moments for the mobile version of the site
    const renderMobileMoments = () => {

        //we create a sortedMoments array just like the other render function
        let sortedMoments = [...timeline.moments];

        if (sortedMoments !== []) {
            sortedMoments = sortedMoments.sort((a, b) => {
                return a.year - b.year || a.month - b.month || a.day - b.day;
            })
        }

        //now we have sorted our moments we can generate them from top to bottom (in order)
        return (
            <div className="flex flex-col">

                {sortedMoments && sortedMoments.map((moment, i) => (

                    <div key={moment._id} className="grid grid-rows-1 mx-auto grid-cols-4">

                        <div className="w-0 border-4 border-neutral ml-8">{/*this is the timeline line*/}</div>

                        <div key={moment._id} className="my-6 mx-3 card w-fit bg-secondary border border-zinc-900 shadow-xl col-span-3">  
                            {checkImage(moment.imageLink) ? (
                                            <figure><img src={moment.imageLink} alt={moment.title} /></figure>
                                        ) : 
                                        (<></>)
                                        }

                            <div className="card-body">
                                <h2 className="card-title">{moment.title}</h2>
                                <p>{moment.description}</p>
                                {/*Here we are using verifying the user is logged in and the author so they can
                                delete moments if they want */}
                                {Auth.loggedIn() && Auth.getUser().data.username === timeline.author ? (
                                <div className="card-actions justify-end">
                                    <EditMoment timeline={timeline} moment={moment._id}/>
                                    <button className="btn btn-error hover:btn-warning" name={moment._id} onClick={handleDeleteBtn}>Delete Moment</button>
                                </div>
                                ) : (<></>)}
                                <h2 className="card-title">{formatMonth(moment.month)} {formatDay(moment.day)} {moment.year}</h2>
                            </div>

                        </div>

                    </div>

                ))}

            </div>)
    }

    //here we are creating style objects to apply to our JSX elements
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

    if(loading) {
        return (<h4>Loading...</h4>)
    }

    return (
        <>
            <h2 className="mt-32 text-center text-neutral text-4xl font-bold" style={fontStyle}><u style={underlineStyle}>{timeline.title}</u></h2>
            
            <div className="flex justify-between">
                {/*this is our label for the share timeline button, and on click it calls this inline function to
                post a toast message (as well as send the url to the clipboard)*/}
                <label onClick={() => {
                    navigator.clipboard.writeText(window.location.href);
                    toast.success("Copied to clipboard!", {
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
                {/*if the author user is logged in then they can see the addmoment 
                button which opens the add moment modal*/}
                {Auth.loggedIn() && Auth.getUser().data.username === timeline.author ? (<AddMoment timeline={timeline} />) : (<></>)}
            </div>

            <section id="timeline">
                {/*below here we are using the useBreakpoints variable lg to conditionally render
                either mobile or web versions of the page*/}
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
        </>
    )
};

export default Timeline;