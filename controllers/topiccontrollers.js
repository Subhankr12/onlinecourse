const Course = require('../models/course');
const Topic = require('../models/topic');

module.exports.getTopics = async(req, res) => {
    try {
        const course = await Course.findOne({_id: req.params.id})
                                    .populate('topics')
                                    .exec()
                                    .then();
        return res.json(course);
    }catch(err) {
        console.log(err);
    }
}

module.exports.create = async(req, res) => {
    try{
        const course = await Course.findOne({_id: req.query.id});

        await Topic.create({
            title: req.body.title,
            description: req.body.description,
        }, (err, topic) => {
            if(err) {
                console.log(err);
                return;
            }
            course.topics.push(topic._id);
            course.save();
            topic.save();
            return res.json(course);
        })
    }catch(err){
        console.log(err);
    }
}

module.exports.delete = async(req, res) => {
    try{
        await Course.findOne({_id: req.body.courseId}, (err, course) => {
            if(err){
                console.log(err);
                return;
            }

            course.topics.splice(course.topics.findIndex(topicId => topicId == req.body.topicId), 1);
            course.save();

            Topic.findByIdAndDelete(req.body.topicId, (err) => {
                if(err){
                    console.log(err);
                    return;
                }

                return res.json({message: 'Delete topic successful'});
            })
        })
    }catch(err){
        console.log(err);
        return;
    }
}