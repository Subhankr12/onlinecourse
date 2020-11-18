const router = require('express').Router();
const courseControllers = require('../controllers/coursecontrollers');

router.get('/', courseControllers.getCourses);
router.post('/create', courseControllers.create);
router.post('/delete', courseControllers.delete);

module.exports = router;