import React from 'react';

export default function CreateTimeline() {
    <div>
        <label for="my-modal-4" className="btn modal-button bg-primary">Login</label>

        <input type="checkbox" id="my-modal-4" className="modal-toggle" />
        <label for="my-modal-4" className="modal cursor-pointer">
            <label className="modal-box relative" for="">
                <h3 className="text-lg font-bold">Create Timeline</h3>

                <div className="form-control ">
                    <div className="grid grid-cols-2">
                        <label className="my-3 input-group input-group-vertical">
                            <span className="py-1">Title</span>
                            <input type="text" placeholder="Timeline Title" className="input input-bordered" />
                        </label>
                    </div>
                    <label className="my-3 input-group input-group-vertical">
                        <span className="py-1">Description</span><textarea class="textarea textarea-bordered" placeholder="Write a little bit about your timeline here"></textarea>
                    </label>

                    <div className="flex flex-col">
                        <button type="submit" className="btn btn-primary ">Create Timeline</button>
                    </div>
                </div>
            </label>
        </label>
    </div>
}