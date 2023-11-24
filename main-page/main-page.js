function completeTask(checkbox) {
    const task = checkbox.closest('.task');
    const completedTasksContainer = document.querySelector('.completed-tasks-container');
    const separator = task.nextElementSibling;

    if (checkbox.checked) {
        // Move the task to the completed section
        completedTasksContainer.appendChild(task);
        if (separator) {
            separator.remove();
            completedTasksContainer.appendChild(separator);
        }
    } 
    else {
        // Move the task back to the normal tasks
        const tasksContainer = document.querySelector('.tasks-container');
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
}
