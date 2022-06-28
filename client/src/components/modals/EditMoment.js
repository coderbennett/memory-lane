import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { EDIT_MOMENT } from '../../utils/mutations';

export default function EditMoment({ timeline, momentId }) {
    
    const getMoment = (e) => {
        let id = e.target.getAttribute("momentid");
        console.log(id);
        for(let i = 0; i < timeline.moments.length; i++) {
            if(timeline.moments[i]._id === id) {
                let thisMoment = timeline.moments[i];
                setMomentState(thisMoment);
            }
        }
    }

    const [momentState, setMomentState] = useState({});
    
    const currentModal = "my-modal-" + momentId;
    
    const [formState, setFormState] = useState({
        title: '',
        description: '',
        imageLink: '',
        year: 0,
        month: 1,
        day: 1
    });
    

    const [editMoment] = useMutation(EDIT_MOMENT);

    const renderDayOptions = (day) => {
        let numArray = [];

        for(let i = 1; i < 32; i++) {
            numArray[i-1] = i;
        }
        return (
            <select type="text" value={momentState.day} className="input input-bordered"  name="day" onChange={handleChange}> 
            {numArray.map((num) => <option key={num} value={num}>{num}</option>)}
            </select>
        )
    }

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormState({...formState, [name]: value});
    };

    const handleFormSubmit = async (event) => {
        event.preventDefault();

        let { title, description, imageLink, year, month, day} = formState;

        try {
            await editMoment({
                variables: {
                    momentId: momentId,
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

    return (
        <div>
            <div className="card-actions justify-end">
                <label htmlFor={currentModal} className="btn modal-button bg-primary hover:bg-secondary text-black" momentid={momentId} onClick={getMoment}>Edit Moment</label>
            </div>

            <input type="checkbox" id={currentModal} className="modal-toggle" />
            <label htmlFor={currentModal} className="modal cursor-pointer">
                <label className="modal-box relative" htmlFor="">
                    <h3 className="text-lg font-bold text-center">Edit Moment</h3>

                    <form className="form-control " onSubmit={handleFormSubmit}>
                        <div className="grid grid-cols-2 gap-4">
                            <label className="my-3  input-group input-group-vertical">
                                <span className="py-1">Title</span>
                                <input type="text" value={momentState.title} className="input input-bordered" name="title" onChange={handleChange}/>
                            </label>
                            <label className="my-3  input-group input-group-vertical">
                                <span className="py-1">Image Link</span>
                                <input type="text" value={momentState.imageLink} className="input input-bordered" name="imageLink" onChange={handleChange} />
                            </label>

                        </div>
                        <label className="my-3 input-group input-group-vertical">
                            <span className="py-1">Description</span><textarea className="textarea textarea-bordered" value={momentState.description}  name="description" onChange={handleChange}></textarea>
                        </label>

                        <div className="grid-cols-3 grid">
                            <label className="my-3  input-group input-group-vertical">
                                <span className="py-1">Year</span>
                                <input type="text" value={momentState.year} className="input input-bordered"  name="year" onChange={handleChange}/>
                            </label>
                            <label className="my-3  input-group input-group-vertical">
                                <span className="py-1">Month</span>
                                <select  value={momentState.month} className="input input-bordered"  name="month" onChange={handleChange}> 
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
                                {renderDayOptions(momentState.day)}
                            </label>
                        </div>
                        <div className="flex flex-col">
                            <button type="submit" className="btn btn-primary ">Edit Moment</button>
                        </div>
                    </form>
                </label>
            </label>
            
        </div>
    )
}