let taskNameInput = document.querySelector("#task-name-input");
let addTaskButton = document.querySelector("#add-task-btn");
let startMessage = document.querySelector("#start-message");
let taskList = document.querySelector(".task-list");
let notCompleted = document.querySelector('#not-completed-tasks');
let showAll = document.querySelector('#show-all');
let tasks = [];

addTaskButton.addEventListener("click", addTaskHandler);

taskNameInput.addEventListener("keydown", function (e) {
  if (e.code == "Enter") addTaskHandler();
})



function addTaskHandler() {
  if (taskNameInput.value) {
    if (!startMessage.hidden) startMessage.hidden = true;
    let newTask = new Task(taskNameInput.value);
    newTask.createTask(taskList);
    taskNameInput.value = "";
  } else {
    alert('Enter task name')
  }
}

class Task {
  constructor(text) {
    this.text = text;
    this.isDone = false;
    this.div = null;
  }

  createTask (element) {
    this.div = document.createElement("div");
    this.div.classList.add("task");
  
    let p = document.createElement("p");
    p.innerText = this.text;
  
    let input = document.createElement("input");
    input.addEventListener("click", () => this.changeState(this.div));
    input.type = "checkbox";
  
    let deleteButton = document.createElement('input');
    deleteButton.addEventListener('click', () => this.deleteTask(this.div))
    deleteButton.type = "button";
    deleteButton.classList.add('deleteButton')
  
    this.div.append(p);
    this.div.append(input);
    this.div.append(deleteButton);
  
    if (this.isDone) {
      this.div.classList.add('completed');
      input.checked = true;
    }
    element.append(this.div);
  }

  changeState (element){
    this.isDone = !this.isDone;
    element.classList.toggle("completed");
  }

  deleteTask() {
    this.div.remove();
  }

}



notCompleted.addEventListener('click', showNotCompleted);
showAll.addEventListener('click', showAllTasks)

function showNotCompleted() {
  taskList.innerHTML = '';
  for (let task of tasks) {
    if (!task.isDone) {
    task.createTask(taskList)
  }
}
}

function showAllTasks() {
  taskList.innerHTML = '';
  tasks.forEach(task => task.createTask(taskList))
}