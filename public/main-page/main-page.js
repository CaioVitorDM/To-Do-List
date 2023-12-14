async function completeTask(checkbox) {
    const task = checkbox.closest('.task');
    const separator = task.nextElementSibling;

    if (checkbox.checked) {
        setTimeout(async () => {
            task.remove();
            separator.remove();
            
            console.log(task.id);

            await fetch(`http://localhost:3000/tasks/${task.id}`, {
                method: 'DELETE'
            })
            .then(response => {
                if (response.ok) {
                    return response.json();
                }
                throw new Error('Erro ao completar tarefa');
            })
            .then(data => {
                sessionStorage.removeItem(task.id);
            })
            .catch(error => {
                console.error(error);
            });

        }, 150); // 500 milissegundos de atraso
    }
}

function createTask() {
    window.location.href = 'create-task.html';
}

async function getAllTasks() {
    const userId = localStorage.getItem('userId');

    await fetch(`http://localhost:3000/tasks/user/${userId}`)
        .then(response => {
            if (response.ok) {
                return response.json();
            }
            throw new Error('Erro ao buscar tarefas');
        })
        .then(data => {
            renderTasks(data.tasks);
        })
        .catch(error => {
            console.error(error);
        });
}

function renderTasks(tasks) {
    const tasksContainer = document.querySelector('.tasks-container');

    if (tasks.length === 0) {
        return;
    }

    for (let i = 0; i < tasks.length; i++) {
        tasksContainer.innerHTML += `
                <div class="task" id="${tasks[i].id}">
                    <div class="task-info">
                        <input type="checkbox" onchange="completeTask(this)">
                        <p>${tasks[i].title}</p>

                        <div class="button-container">
                            <button onclick="redirectEdit(${tasks[i].id})"> <i class="fa-regular fa-pen-to-square"> </i></button>
                        </div>
                    </div>

                    <div class="task-date">
                        <p id="due-date">Due Date: ${tasks[i].dueDate}</p>
                        <div class="urgencia">
                            <p>${tasks[i].urgency}</p>
                        </div>
                    </div>
                </div>
                <div class="separator"></div>
                `;
    }
}

function redirectEdit(id){
    window.location.href = 'create-task.html?id=' + id;
}

window.onload = function () {
    getAllTasks();
}