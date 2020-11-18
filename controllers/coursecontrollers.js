const Course = require('../models/course');
const Topic = require('../models/topic');

module.exports.getCourses = async (req, res) => {
   try{
       await Course.find({}, (err, courses) => {
           if(err){
               console.log(err);
               return;
           }

           return res.json(courses);
       });

   }catch(err){
       console.log(err);
   }
}

module.exports.create = async (req, res) => {
    try{
        await Course.findOne({title: req.body.title}, (err, course) => {
            if(err){
                console.log(err);
                return;
            }
            if(course) return res.json({message: "Course already exists with the same name!!"})

            Course.create({
                title: req.body.title,
                description: req.body.description,
                duration: req.body.duration,
            }, (err, newCourse) => {
                if(err){
                    console.log(err);
                    return;
                }

                return res.json({
                    course: newCourse,
                    message: "created"
                });
            })            
        })
    }catch(err){
        console.log(err);
    }
}

module.exports.delete = async(req, res) => {
    try {
        await Course.findByIdAndDelete({_id: req.body.id}, async(err, course) => {
            if(err){
                console.log(err);
                return;
            }

            await course.topics.forEach(topicId => {
                Topic.findByIdAndDelete({_id: topicId}, (err) => {
                    if(err){
                        console.log(err);
                        return;
                    }
                });
            });

            return res.json({message: 'Deleted Course Successfully!!'});
        })
    }catch(err){
        console.log(err);
        return;
    }
}

