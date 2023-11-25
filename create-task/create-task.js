let lastUsedID = localStorage.getItem('lastUsedID') || 0;

const task = {
    'id': null,
    'title': '',
    'dueDate': '',
    'urgencyLevel': ''
}

function saveTask(event){
    event.preventDefault();

    const taskTitle = document.getElementById("title");
    const dueDate = document.getElementById("due-date");
    const taskUrgency = document.getElementById("task-urgencia");

    task.title = taskTitle.value;
    task.dueDate = dueDate.value;
    task.urgencyLevel = taskUrgency.value;

    lastUsedID++;
    task.id = lastUsedID;
    localStorage.setItem('lastUsedID', lastUsedID);
    localStorage.setItem(lastUsedID, JSON.stringify(task));

    window.location.href = '../main-page/main-page.html';

}

document.getElementById('taskForm').addEventListener('submit', saveTask);


