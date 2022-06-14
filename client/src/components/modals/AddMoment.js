import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { ADD_MOMENT } from '../../utils/mutations';

export default function AddMoment({ timeline }) {

    //here we are creating a state for the add moment form with
    //some default values
    const [formState, setFormState] = useState({
        title: '',
        description: '',
        imageLink: '',
        year: 0,
        month: 1,
        day: 1
    });

    //here we are including the addmoment mutation so we can use it shortly
    const [addMoment] = useMutation(ADD_MOMENT);

    //we call this function with the day select element to populate
    //the days of the month
    const renderDayOptions = () => {
        let numArray = [];
        for(let i = 1; i < 32; i++) {
            numArray[i-1] = i;
        }
        return (
            <select type="text" placeholder="4th" className="input input-bordered"  name="day" onChange={handleChange}> 
            {numArray.map((num) => <option key={num} value={num}>{num}</option>)}
            </select>
        )
    }

    //this handleChange function runs everytime there is a change to the addMoment form inputs
    //it updates our formState to have the value the user entered by targeting the name property
    //on the element
    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormState({...formState, [name]: value});
    };

    //when we click submit this function runs and adds the moment to the database (timeline)
    const handleFormSubmit = async (event) => {
        event.preventDefault();

        //we use object destructuring to grab all the data from the formState
        let { title, description, imageLink, year, month, day } = formState;

        //now we try to add the moment to the database and reload the page if it works
        //otherwise we send the error to the console
        try {
            await addMoment({
                variables: {
                    timelineId: timeline._id,
                    title: title,
                    description: description,
                    imageLink: imageLink,
                    year: parseInt(year),
                    month: parseInt(month),
                    day: parseInt(day)
                }
            });

            window.location.assign('/timeline/' + timeline._id)
        } catch (e) {
            console.error(e);
        }
    };

    //the below return returns our modal - the modal is pretty standard
    //we have our add moment button at the top which is always on display
    //clicking this button will open the modal
    return (
        <div>
            <div className="card-actions justify-end m-6">
                <label htmlFor="my-modal-2" className="btn modal-button bg-primary hover:bg-secondary text-black">Add Moment</label>
            </div>

            <input type="checkbox" id="my-modal-2" className="modal-toggle" />
            <label htmlFor="my-modal-2" className="modal cursor-pointer">
                <label className="modal-box relative" htmlFor="">
                    <h3 className="text-lg font-bold text-center">Add Moment</h3>

                    <form className="form-control " onSubmit={handleFormSubmit}>
                        <div className="grid grid-cols-2 gap-4">
                            <label className="my-3  input-group input-group-vertical">
                                <span className="py-1">Title</span>
                                <input type="text" placeholder="Independence Day" className="input input-bordered" name="title" onChange={handleChange}/>
                            </label>
                            <label className="my-3  input-group input-group-vertical">
                                <span className="py-1">Image Link</span>
                                <input type="text" placeholder="image-of-freedom.com" className="input input-bordered" name="imageLink" onChange={handleChange} />
                            </label>

                        </div>
                        <label className="my-3 input-group input-group-vertical">
                            <span className="py-1">Description</span><textarea className="textarea textarea-bordered" placeholder="On July 4, 1776, the Second Continental Congress unanimously adopted the Declaration of Independence."  name="description" onChange={handleChange}></textarea>
                        </label>

                        <div className="grid-cols-3 grid">
                            <label className="my-3  input-group input-group-vertical">
                                <span className="py-1">Year</span>
                                <input type="text" placeholder="1776" className="input input-bordered"  name="year" onChange={handleChange}/>
                            </label>
                            <label className="my-3  input-group input-group-vertical">
                                <span className="py-1">Month</span>
                                <select  placeholder="July" className="input input-bordered"  name="month" onChange={handleChange}> 
                                    <option value={1}>January</option>
                                    <option value={2}>February</option>
                                    <option value={3}>March</option>
                                    <option value={4}>April</option>
                                    <option value={5}>May</option>
                                    <option value={6}>June</option>
                                    <option value={7}>July</option>
                                    <option value={8}>August</option>
                                    <option value={9}>September</option>
                                    <option value={10}>October</option>
                                    <option value={11}>November</option>
                                    <option value={12}>December</option>
                                </select>
                            </label>
                            <label className="my-3  input-group input-group-vertical">
                                <span className="py-1">Day</span>
                                {renderDayOptions()}
                            </label>
                        </div>
                        <div className="flex flex-col">
                            <button type="submit" className="btn btn-primary ">Add Moment</button>
                        </div>
                    </form>
                </label>
            </label>
        </div>
    )
}