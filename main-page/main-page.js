/*
function completeTask(checkbox) {
    const task = checkbox.closest('.task');
    const completedTasksContainer = document.querySelector('.completed-tasks-container');
    const separator = task.nextElementSibling;

    if (checkbox.checked) {
        // Move the task to the completed section
        completedTasksContainer.appendChild(task);
        task.classList.add("completed");
        if (separator) {
            separator.remove();
            completedTasksContainer.appendChild(separator);
        }
    } 
    else {
        // Move the task back to the normal tasks
        const tasksContainer = document.querySelector('.tasks-container');
        task.classList.remove("completed");
        tasksContainer.appendChild(task);
        if(separator){
            separator.remove();
        }

        // Re-add the separator if needed
    
        const newSeparator = document.createElement('div');
        newSeparator.className = 'separator';
        tasksContainer.appendChild(newSeparator);
        
    }

    // Toggle the completed-task class for styling
    task.classList.toggle('completed-task', checkbox.checked);

    // Ensure details is the last element
    document.querySelector('.to-do-container').appendChild(document.querySelector('.completed-tasks-details'));
}*/

let tasks = [];

function completeTask(checkbox) {
    const task = checkbox.closest('.task');
    const separator = task.nextElementSibling;

    if (checkbox.checked) {
        setTimeout(() => {
            task.remove();
            separator.remove();
            localStorage.removeItem(task.id)
        }, 150); // 500 milissegundos de atraso
    }
}

function createTask() {
    window.location.href = '../create-task/create-task.html';
}

function getAllTasks() {
    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);

        if (key !== 'lastUsedID' && key !== 'users') {
            const value = localStorage.getItem(key);

            tasks.push(JSON.parse(value));
        }
    }
}

function loadTasksIntoTable() {
    const tasksContainer = document.querySelector('.tasks-container');

    if (tasks.length === 0) {
        return;
    }

    for (let i = 0; i < tasks.length; i++) {
        const task = tasks[i];

        if (!task || !task.id || !task.dueDate || !task.urgencyLevel) {
            console.error('Invalid task: ', task);
            continue;
        }

        tasksContainer.innerHTML += `
                <div class="task" id="${tasks[i].id}">
                    <div class="task-info">
                        <input type="checkbox" onchange="completeTask(this)">
                        <p>${tasks[i].title}</p>

                        <div class="button-container">
                            <button> <i class="fa-regular fa-pen-to-square"> </i></button>
                            <button><i class="fa-solid fa-trash"></i></button>
                        </div>
                    </div>

                    <div class="task-date">
                        <p id="due-date">Due Date: ${tasks[i].dueDate}</p>
                        <div class="urgencia">
                            <p>${tasks[i].urgencyLevel}</p>
                        </div>
                    </div>
                </div>
                <div class="separator"></div>
                `;
    }
}


window.onload = function () {

    getAllTasks();
    loadTasksIntoTable();
}