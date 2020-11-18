const mongoose = require('mongoose');

const topicSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
    }
}, {
    timestamps: true,
}
)

module.exports = Topic = mongoose.model('Topic', topicSchema);