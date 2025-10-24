
let lineTask = (task) => { 
    return `
            <div class="task ${(task.isDone) ? "done-task": ""}">
                <div class="info">
                    <h2 class="title" title="${task.title}">${task.title}</h2>
                    <p class="date">${task.date}</p>
                </div>
                <ul class="control">
                    <li>
                        <button id=${task.id} class="update-task" title='Edit Task' aria-label="Update the task">
                            <i class="fa-solid fa-pen"></i>
                        </button>
                    </li>
                    <li>
                        <button id=${task.id} class="complete-bttn ${task.isDone ? 'complete' : ''}" title='Complete Task' aria-label="Complete the task">
                            <i class="${task.isDone ? 'fa-check' : 'fa-xmark'} fa-solid"></i>
                        </button>
                    </li>
                    <li>
                        <button id=${task.id} class="delete-task" title='Delete Task' aria-label="Delete the task">
                            <i class="fa-solid fa-trash"></i>
                        </button>
                    </li>
                    <li>
                        <button id=${task.id} class="important-bttn ${task.important ? "important" : ""}" title='Important Task' aria-label="Important task">
                            <i class="fa-solid fa-star"></i>
                        </button>
                    </li>
                </ul>
            </div>
        `;
} 

export { lineTask }; 
 
