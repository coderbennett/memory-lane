const { Schema, model } = require('mongoose');

const timelineSchema = new Schema({
    title: {
        type: String,
        required: true,
        minlength: 8,
        trim: true
    },
    description: {
        type: String,
        required: true,
        trim: true,
    },
    author: {
        type: String,
        required: true
    },
    moments: [
        {
            title: {
                type: String,
                required: true,
                minlength: 8,
                trim: true
            },
            description: {
                type: String,
                required: true,
                trim: true,
            },
            imageLink: {
                type: String,
                required: true
            },
            year: {
                type: Number,
                required: true
            },
            month: {
                type: Number,
                required: true
            },
            day: {
                type: Number,
                required: true
            }
        }
    ]

})