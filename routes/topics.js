const router = require('express').Router();
const topicControllers = require('../controllers/topiccontrollers');

router.get('/:id', topicControllers.getTopics);
router.post('/create?:id', topicControllers.create);
router.post('/delete', topicControllers.delete);

module.exports = router;