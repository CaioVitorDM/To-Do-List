const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');

router.post('/create', taskController.createTask);
router.put('/update:taskId', taskController.updateTask);
router.get('/:taskId', taskController.getTask);
router.get('/user/:userId', taskController.getAllTasks);
router.delete('/:taskId', taskController.completeTask);

module.exports = router;
