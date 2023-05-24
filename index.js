import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push, onValue, remove } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

const appSetting = {
    databaseURL: "https://todo-c2744-default-rtdb.asia-southeast1.firebasedatabase.app/"
}

const app = initializeApp(appSetting)
const database = getDatabase(app)
const tasksInDB = ref(database, "Tasks")


const inputFieldEl = document.getElementById("input-field")
const addButtonEl = document.getElementById("add-button")
const taskListEl = document.getElementById("task-list")


addButtonEl.addEventListener("click", function() {
    let inputValue = inputFieldEl.value
    if(inputValue){
        push(tasksInDB, inputValue)
    }
    
    clearInputFieldEl()
})

onValue(tasksInDB, function(snapshot) {

    if(snapshot.exists()){
        let tasksArray = Object.entries(snapshot.val())
    
        clearTaskListEl()
        
        for (let i = 0; i < tasksArray.length; i++) {
            let currentTask = tasksArray[i]
            let currentTaskID = currentTask[0]
            let currentTaskValue = currentTask[1]

            addItemToTaskList(currentTask)
        }
    }
    else{
        taskListEl.innerHTML = "No Tasks"
    }
})

function clearTaskListEl() {
    taskListEl.innerHTML = ""
}

function clearInputFieldEl() {
    inputFieldEl.value = ""
}

function addItemToTaskList(task) {
    let taskID = task[0]
    let taskValue = task[1]

    let newEl = document.createElement("li")
    newEl.textContent = taskValue

    newEl.addEventListener("click", function(){
        let exactLocationOfTaskInDB = ref(database, `Tasks/${taskID}`)
        remove(exactLocationOfTaskInDB)
    })

    taskListEl.append(newEl)
}