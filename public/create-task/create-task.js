document.getElementById('taskForm').addEventListener('submit', saveTask);

async function saveTask(event) {
    const taskForm = document.getElementById('taskForm');
    const userId = localStorage.getItem('userId');
    const taskId = getParameterByName('id');

    if(taskForm.checkValidity()) {
        event.preventDefault();

        const formData = new FormData(taskForm);
        formData.append('userId', userId);

        if (taskId) {
            await fetch(`http://localhost:3000/tasks/update${taskId}`, {
                method: 'PUT',
                body: formData
            })
            .then(response => {
                if (response.ok) {
                    return response.json();
                }
                throw new Error('Erro ao atualizar task');
            })
            .then(data => {
                console.log(data);
                window.location.href = 'main-page.html';
            })
            .catch(error => {
                console.error(error);
            });
        } else {
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
        }
    }  else {
        alert('Por favor, preencha todos os campos.')
    }
}

async function getTask() {
    const taskId = getParameterByName('id');
 
    if (taskId) {
        await fetch(`http://localhost:3000/tasks/${taskId}`)
            .then(response => {
                if (response.ok) {
                    return response.json();
                }
                throw new Error('Erro ao buscar tarefa');
            })
            .then(data => {
                title.value = data.task.title;
                dueDate.value = data.task.dueDate;
                taskUrgency.value = data.task.urgency;
            })
            .catch(error => {
                console.error(error);
            });
    }
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

window.onload = function () {
    getTask();
}



