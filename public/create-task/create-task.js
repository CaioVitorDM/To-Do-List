let lastUsedID = sessionStorage.getItem('lastUsedID') || 0;
let taskId;

const task = {
    'id': null,
    'title': '',
    'dueDate': '',
    'urgencyLevel': ''
}

document.getElementById('taskForm').addEventListener('submit', saveTask);

async function saveTask(event) {
    const taskForm = document.getElementById('taskForm');
    const userId = localStorage.getItem('userId');

    if(taskForm.checkValidity()) {
        event.preventDefault();

        const formData = new FormData(taskForm);
        formData.append('userId', userId);

        await fetch('http://localhost:3000/tasks/create', {
            method: 'POST',
            body: formData
        })
        .then(response => {
            if (response.ok) {
                return response.json();
            }
            throw new Error('Erro ao salvar task');
        })
        .then(data => {
            console.log(data);
            window.location.href = 'main-page.html';
        })
        .catch(error => {
            console.error(error);
        });
    } else {
        alert('Por favor, preencha todos os campos.')
    }

    /*event.preventDefault();

    const taskTitle = document.getElementById("title");
    const dueDate = document.getElementById("due-date");
    const taskUrgency = document.getElementById("task-urgencia");

    if (taskId) {
        // Modo edição: Atualiza a tarefa existente no sessionStorage
        const existingTask = JSON.parse(sessionStorage.getItem(taskId));
        existingTask.title = taskTitle.value;
        existingTask.dueDate = dueDate.value;
        existingTask.urgencyLevel = taskUrgency.value;
        sessionStorage.setItem(taskId, JSON.stringify(existingTask));
    } else {
        // Modo criação: Cria uma nova tarefa no sessionStorage
        task.title = taskTitle.value;
        task.dueDate = dueDate.value;
        task.urgencyLevel = taskUrgency.value;
        lastUsedID++;
        task.id = lastUsedID;
        sessionStorage.setItem('lastUsedID', lastUsedID);
        sessionStorage.setItem(lastUsedID, JSON.stringify(task));
    }*/
}

function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}

window.onload = function(){
    taskId = getParameterByName('id');

    if (taskId) {
        // Traz a task com base no ID do sessionStorage
        const existingTask = JSON.parse(sessionStorage.getItem(taskId));
        if (existingTask) {
            // Preenche os campos do formulário com os valores existentes
            document.getElementById("title").value = existingTask.title;
            document.getElementById("due-date").value = existingTask.dueDate;
            document.getElementById("task-urgencia").value = existingTask.urgencyLevel;
        } else {
            alert('Tarefa não encontrada.'); // Trate a situação em que a tarefa não é encontrada
        }
    }
}



