import React from 'react';

export default function AddMoment() {

    return (
        <div>
            <label htmlFor="my-modal-2" className="btn modal-button bg-primary hover:bg-secondary text-black">Add Moment</label>

            <input type="checkbox" id="my-modal-2" className="modal-toggle" />
            <label htmlFor="my-modal-2" className="modal cursor-pointer">
                <label className="modal-box relative" htmlFor="">
                    <h3 className="text-lg font-bold text-center">Add Moment</h3>

                    <form className="form-control ">
                        <div className="grid grid-cols-2 gap-4">
                            <label className="my-3  input-group input-group-vertical">
                                <span className="py-1">Title</span>
                                <input type="text" placeholder="Timeline Title" className="input input-bordered" />
                            </label>
                            <label className="my-3  input-group input-group-vertical">
                                <span className="py-1">Image Link</span>
                                <input type="text" placeholder="placeholderimage.com" className="input input-bordered" />
                            </label>

                        </div>
                        <label className="my-3 input-group input-group-vertical">
                            <span className="py-1">Description</span><textarea className="textarea textarea-bordered" placeholder="Write a little bit about the moment here"></textarea>
                        </label>

                        <div className="grid-cols-2 grid">
                            <label className="my-3  input-group input-group-vertical">
                                <span className="py-1">Image Link</span>
                                <input type="text" placeholder="placeholderimage.com" className="input input-bordered" />
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