import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { ADD_TIMELINE } from '../../utils/mutations';

export default function CreateTimeline({ user }) {

    //here we set up the formState for the modal form
    const [formState, setFormState] = useState({
        title: '',
        description: ''
    });

    //here we are grabbing the addtimeline mutation to use shortly
    const [addTimeline] = useMutation(ADD_TIMELINE);

    //this handlechange function gets called on change for the inputs
    //it grabs the elements name and value properties and sets the
    //form state to it (along with the formState's other values)
    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormState({ ...formState, [name]: value });
    };

    //our handleformsubmit function gets called when we submit the form (create timeline)
    const handleFormSubmit = async (event) => {
        event.preventDefault();

        //we pull the title and description from the formstate with object desctructuring
        const { title, description } = formState;

        //now we try to add a timeline to the database and reload the page
        //if it doesnt work we send an error to the console
        try {
            await addTimeline({
                variables: {
                    title: title,
                    description: description,
                    author: user.username
                }
            });
            window.location.assign('/dashboard/:' + user._id);
        } catch (e) {
            console.error(e);
        }
    }

    //the below return statement has the JSX for our modal element as well as the button that toggles the modal
    return (
        <form onSubmit={handleFormSubmit}>
            <div className="card-actions justify-end m-6">
                <label htmlFor="my-modal-4" className="btn modal-button text-neutral bg-primary relative hover:bg-secondary">Create New Timeline</label>
            </div>

            <input type="checkbox" id="my-modal-4" className="modal-toggle" />
            <label htmlFor="my-modal-4" className="modal cursor-pointer">
                <label className="modal-box" htmlFor="">
                    <h3 className="text-lg font-bold">Create Timeline</h3>

                    <div className="form-control ">
                        <div className="grid grid-cols-2">
                            <label className="my-3 input-group input-group-vertical">
                                <span className="py-1">Title</span>
                                <input type="text" placeholder="Timeline Title" className="input input-bordered" name="title" onChange={handleChange} />
                            </label>
                        </div>
                        <label className="my-3 input-group input-group-vertical">
                            <span className="py-1">Description</span><textarea className="textarea textarea-bordered" name="description" placeholder="Write a little bit about your timeline here" onChange={handleChange}></textarea>
                        </label>

                        <div className="flex flex-col">
                            <button type="submit" className="btn btn-primary ">Create Timeline</button>
                        </div>
                    </div>
                </label>
            </label>
        </form>
    );
}