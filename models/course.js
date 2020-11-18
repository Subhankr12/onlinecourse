const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
    },
    duration: {
        type: Number,
    },
    topics: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Topic'
        }
    ]
}, 
{
    timestamps: true,
}
)

module.exports = Course = mongoose.model('Course', courseSchema);