const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');

router.post('/create', taskController.createTask);
router.get('/user/:userId', taskController.getAllTasks);
router.delete('/:taskId', taskController.completeTask);

module.exports = router;
