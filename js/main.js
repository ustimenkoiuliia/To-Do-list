let taskNameInput = document.querySelector("#task-name-input");
let addTaskButton = document.querySelector("#add-task-btn");
let startMessage = document.querySelector("#start-message");
let taskList = document.querySelector(".task-list");
let notCompleted = document.querySelector('#not-completed-tasks');
let showAll = document.querySelector('#show-all');
let dateInput = document.querySelector('#date-input');
let today = new Date();
let minDate = today.getFullYear()+'-'+(today.getMonth()+1).toString().padStart(2,'0')+'-'+today.getDate().toString().padStart(2,'0');
dateInput.setAttribute('min', minDate);


let tasks = [];


addTaskButton.addEventListener("click", addTaskHandler);

taskNameInput.addEventListener("keydown", function (e) {
  if (e.code == "Enter") addTaskHandler();
})

notCompleted.addEventListener('click', showNotCompleted);
showAll.addEventListener('click', showAllTasks);

dateInput.addEventListener('keydown', function (e) {
  if (e.code == 'Enter') addTaskHandler();
})



function addTaskHandler() {
  if (taskNameInput.value) {
    if (!startMessage.hidden) startMessage.hidden = true;
    let newTask = new Task(taskNameInput.value, dateInput.value);
    newTask.createTask(taskList);
    tasks.push(newTask);
    taskNameInput.value = "";


  } else {
    alert('Enter task name')
  }
}


class Task {
  constructor(text, dueDate) {
    this.text = text;
    this.isDone = false;
    this.div = null;
    this.isDeleted = false;
    this.dueDate = dueDate;
    this.currentDate = Date.now();
  }

  createTask (element) {
    this.div = document.createElement("div");
    this.div.classList.add("task");
  
    let p = document.createElement("p");
    p.innerText = this.text;
  
    let input = document.createElement("input");
    input.addEventListener("click", () => this.changeState(this.div));
    input.type = "checkbox";

    let editButton = document.createElement('div');
    editButton.classList.add('edit-button');
    editButton.addEventListener('click', () => this.editTask(p));

  
    let deleteButton = document.createElement('div');
    deleteButton.dataset.id = 'delete';
    deleteButton.addEventListener('click', () => this.deleteTask());

    let dateIcon = document.createElement('div')
    dateIcon.textContent = this.dueDate;
    dateInput.value = '';


    this.div.append(input);
    this.div.append(p);
    this.div.append(dateIcon);
    this.div.append(editButton);
    this.div.append(deleteButton);
  
    if (this.isDone) {
      this.div.classList.add('completed');
      input.checked = true;
    }

    if (!this.isDeleted) {
      element.append(this.div);
    }

    if (new Date(this.currentDate) >= new Date(this.dueDate)) {
      this.div.classList.add('expired');
      p.innerText = this.text + ' ' + 'Expired!!!';
    }

  }

  changeState (element){
    this.isDone = !this.isDone;
    element.classList.toggle("completed");
  }

  deleteTask() {
    this.div.remove();
    this.isDeleted = true;
  }

  editTask(element) {
    element.innerText = '';
    let newInput = document.createElement('input');
    newInput.setAttribute('type', 'text');
    element.append(newInput);
    newInput.addEventListener('keydown', function (e) {
      let newValue = newInput.value;
      if (e.code == "Enter") {
        element.innerText = newValue;
      }
    })
  }

  // toSettleDate(element, paragraph) {
  //   let date = dateInput.value;
  //   let dateIcon = document.createElement('div')
  //   dateIcon.classList.add('date')
  //   dateIcon.innerText = date;
  //   element.append(dateIcon)
  //   dateInput.value = '';

  //   let now = Date.now();
  //   if (new Date(now) > new Date(date)) {
  //     element.classList.add('expired');
  //     paragraph.innerText = this.text + ' ' + ' Expired!!!'
  //   }
  // }


}


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




let checkDateButton = document.createElement('div');
checkDateButton.textContent = 'Check';
checkDateButton.classList.add('check');
let bottom = document.querySelector('.bottom');
bottom.append(checkDateButton);
checkDateButton.addEventListener('click', checkTasks)
  
function checkTasks() {
  tasks.forEach(task => {
    const currentDate = new Date();
    const dueDate = new Date(task.dueDate);

    if (currentDate > dueDate) {
      task.div.classList.add('expired');
    } 
  });
}

