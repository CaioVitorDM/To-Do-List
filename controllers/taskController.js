const Task = require('../models/taskModel');

function createTask(req, res) {

    const { title, dueDate, taskUrgency, userId } = req.body;
  
    const newTask = new Task(null, title, dueDate, taskUrgency, userId);

    Task.create(newTask, (err, createdTask) => {
    if (err) {
        res.status(500).json({ error: 'Erro ao criar tarefa' });
        return;
    }
    res.status(201).json({ message: 'Tarefa registrada com sucesso', task: createdTask });
    });
}

function updateTask(req, res) {
    const taskId = req.params.taskId;

    const { title, dueDate, taskUrgency, userId } = req.body;
  
    if (!taskId) {
        res.status(400).json({ error: 'ID da tarefa é obrigatório para atualização' });
        return;
    }

    const updatedTask = new Task(taskId, title, dueDate, taskUrgency, userId);

    Task.update(updatedTask, (err, result) => {
        if (err) {
            res.status(500).json({ error: 'Erro ao atualizar tarefa' });
            return;
        }
        res.status(200).json({ message: 'Tarefa atualizada com sucesso', task: updatedTask });
    });
}

function getTask(req, res) {
    const taskId = req.params.taskId;

    Task.get(taskId, (err, task) => {
        if (err) {
        res.status(500).json({ error: 'Erro interno do servidor' });
        return;
        }
        res.status(200).json({ task });
    });
}

function getAllTasks(req, res) {
    const userId = req.params.userId;

    Task.getAllTasks(userId, (err, tasks) => {
        if (err) {
        res.status(500).json({ error: 'Erro interno do servidor' });
        return;
        }
        res.status(200).json({ tasks });
    });
}

function completeTask(req, res) {
    const taskId = req.params.taskId;

    Task.complete(taskId, (err, tasks) => {
        if (err) {
        res.status(500).json({ error: 'Erro interno do servidor' });
        return;
        }
        res.status(200).json({ tasks });
    });
}

module.exports = {
    createTask,
    updateTask,
    getTask,
    getAllTasks,
    completeTask
};