////////////////////Save Items in LocalStorage/////////////
function saveInStorage(data){
    localStorage.setItem("data", JSON.stringify(data)) 
}

///////////////////Get All Tasks/////////////
function getStorage(){
    return JSON.parse(localStorage.getItem("data")) || [];
} 

///////////////////Get Completed Tasks/////////////
function getCompletedTasks(){
    return getStorage().filter(task => task.isDone);
}

///////////////////Get Not Completed Tasks/////////////
function getNotCompletedTasks(){
    return getStorage().filter(task => !task.isDone);
}

///////////////////Get Important Tasks/////////////
function getImportantTasks(){
    return getStorage().filter(task => task.important);
}

export { saveInStorage, getStorage, getCompletedTasks, getNotCompletedTasks, getImportantTasks };