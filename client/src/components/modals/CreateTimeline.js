import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { ADD_TIMELINE } from '../../utils/mutations';

export default function CreateTimeline({ user }) {

    const [formState, setFormState] = useState({

    })

    return (
    <div>
        <div className="card-actions justify-end m-6">
            <label htmlFor="my-modal-4" className="btn modal-button text-neutral bg-primary">Create New Timeline</label>
        </div>

        <input type="checkbox" id="my-modal-4" className="modal-toggle" />
        <label htmlFor="my-modal-4" className="modal cursor-pointer">
            <label className="modal-box relative" htmlFor="">
                <h3 className="text-lg font-bold">Create Timeline</h3>

                <div className="form-control ">
                    <div className="grid grid-cols-2">
                        <label className="my-3 input-group input-group-vertical">
                            <span className="py-1">Title</span>
                            <input type="text" placeholder="Timeline Title" className="input input-bordered" />
                        </label>
                    </div>
                    <label className="my-3 input-group input-group-vertical">
                        <span className="py-1">Description</span><textarea className="textarea textarea-bordered" placeholder="Write a little bit about your timeline here"></textarea>
                    </label>

                    <div className="flex flex-col">
                        <button type="submit" className="btn btn-primary ">Create Timeline</button>
                    </div>
                </div>
            </label>
        </label>
    </div>
    );
}