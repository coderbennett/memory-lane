import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { Navigate } from 'react-router-dom';
import { ADD_TIMELINE } from '../../utils/mutations';

export default function CreateTimeline({ user }) {

    const [formState, setFormState] = useState({
        title: '',
        description: ''
    });

    const [addTimeline, { error, data }] = useMutation(ADD_TIMELINE);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormState({ ...formState, [name]: value });
    };

    const handleFormSubmit = async (event) => {
        event.preventDefault();

        const { title, description } = formState;

        console.log(formState);
        console.log(title);
        console.log(description);
        console.log(user.username);
        try {
            const { data } = await addTimeline({
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