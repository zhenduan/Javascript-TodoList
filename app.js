// create task class
class Task {
  constructor(id, name, priority) {
    this.id = id;
    this.name = name;
    this.priority = priority;
  }
}

// variables
let editTaskId;

// get input
const name = document.getElementById("task-name");
const priority = document.getElementById("priority");

// get UI vars
const taskList = document.querySelector(".list-group");
const addBtn = document.getElementById("submit");
const editBtn = document.getElementById("edit");
const cancelBtn = document.getElementById("cancel");

// set Edit Button to hide
editBtn.style.display = "none";
// set cancel button to hide
cancelBtn.style.display = "none";

// Event Listeners
document.getElementById("submit").addEventListener("click", addTask);
document.querySelector(".list-group").addEventListener("click", removeTask);
document.querySelector(".list-group").addEventListener("click", editTask);
document.getElementById("edit").addEventListener("click", editSubmit);
document.getElementById("cancel").addEventListener("click", cancelEdit);
document.addEventListener("DOMContentLoaded", showTasks);

// Add Task
function addTask(e) {
  //   // get input
  //   const name = document.getElementById("task-name").value;
  //   const priority = document.getElementById("priority").value;
  const nameInput = name.value;
  const priorityInput = priority.value;
  if (nameInput === "" || priorityInput === "Choose Priority") {
    alert("Please check your input");
  } else {
    //   create new task object
    const newTask = new Task(getID(), nameInput, priorityInput);
    //   console.log(newTask.name, newTask.priority);
    // data.push(newTask);

    const badgeColor = getBadgeColor(newTask.priority);
    const badgeText = getBadgeText(newTask.priority);
    //   console.log(badgeColor, badgeText);

    //   Add task to list
    //   create li element
    const li = document.createElement("li");
    // add class
    li.className = "list-group-item";
    //   add id
    li.setAttribute("id", getID());
    // create text node and append to li
    li.appendChild(document.createTextNode(newTask.name));

    // Remove Icon
    // create new link element
    const remove = document.createElement("a");
    // add class for link element
    remove.className = "remove-task float-right";
    // add icon html to link
    remove.innerHTML = '<i class="far fa-trash-alt"></i>';
    // append link to li
    li.appendChild(remove);

    // Edit Icon
    // create new link element
    const edit = document.createElement("a");
    // add class for link element
    edit.className = "edit-task float-right";
    // add icon html to link
    edit.innerHTML = '<i class="far fa-edit mr-3"></i>';
    // append link to li
    li.appendChild(edit);

    // // Complete Icon
    // // create new link element
    // const complete = document.createElement("a");
    // // add class for link element
    // complete.className = "complete-task float-right";
    // // add icon html to link
    // complete.innerHTML = '<i class="far fa-check-circle mr-3"></i>';
    // // append link to li
    // li.appendChild(complete);

    // Priority
    // Create new span element
    const priorityBadge = document.createElement("span");
    // add class for span element
    priorityBadge.className = `badge ${badgeColor}  float-right mr-3`;
    // add badge to span
    priorityBadge.innerHTML = `${badgeText}`;
    // append span to li
    li.appendChild(priorityBadge);

    // append li to ul
    taskList.appendChild(li);

    // Store task in LS
    storeTaskInLocalStorate(newTask);

    //   console.log(newTask.id);
    clearInput();
  }

  e.preventDefault();
}

// Remove Task
function removeTask(e) {
  //   console.log(e.target);

  if (e.target.classList.contains("fa-trash-alt")) {
    if (confirm("Are you sure to delete?")) {
      e.target.parentElement.parentElement.remove();
      let selectedRemoveTaskID = e.target.parentElement.parentElement.id;

      deleteTaskFromStorage(selectedRemoveTaskID);
    }
  }
}

// Edit Selected Task
function editTask(e) {
  if (e.target.classList.contains("fa-edit")) {
    // get all tasks from ls
    let tasks;

    if (localStorage.getItem("tasks") === null) {
      tasks = [];
    } else {
      tasks = JSON.parse(localStorage.getItem("tasks"));
    }

    //   get task id
    const selectedTaskID = e.target.parentElement.parentElement.id;
    editTaskId = selectedTaskID;
    // populate values to input fields
    populateInputFields(
      tasks[selectedTaskID].name,
      tasks[selectedTaskID].priority
    );

    // hide add button
    addBtn.style.display = "none";
    // show edit button
    editBtn.style.display = "inline";
    // show cancel button
    cancelBtn.style.display = "inline";
    // set new values to selected task
    // get selected task values
    // console.log(data[selectedTaskID]);
  }
}

function editSubmit(e) {
  let tasks;
  if (localStorage.getItem("tasks") === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }
  // get new input values
  const editTaskName = name.value;
  const editTaskPriority = priority.value;
  // assign values to selected task
  tasks[editTaskId].name = editTaskName;
  tasks[editTaskId].priority = editTaskPriority;
  updateTaskStorage(tasks[editTaskId]);

  // remove existing tasks
  tasks.forEach(function (task) {
    document.querySelector(".list-group-item").remove();
  });

  // display the task list
  showTasks();

  // hide edit button
  editBtn.style.display = "none";
  // hide cancel button
  cancelBtn.style.display = "none";
  // show add button
  addBtn.style.display = "inline";
  e.preventDefault();
}

// populate task values to input fields
function populateInputFields(selectedTaskName, selectedTaskPriority) {
  name.value = selectedTaskName;
  priority.value = selectedTaskPriority;
}

// get tasks from ls
function showTasks() {
  let tasks;

  if (localStorage.getItem("tasks") === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }

  tasks.forEach(function (task) {
    const badgeColor = getBadgeColor(task.priority);
    const badgeText = getBadgeText(task.priority);
    //   console.log(badgeColor, badgeText);

    //   Add task to list
    //   create li element
    const li = document.createElement("li");
    // add class
    li.className = "list-group-item";
    //   add id
    li.setAttribute("id", task.id);
    // create text node and append to li
    li.appendChild(document.createTextNode(task.name));

    // Remove Icon
    // create new link element
    const remove = document.createElement("a");
    // add class for link element
    remove.className = "remove-task float-right";
    // add icon html to link
    remove.innerHTML = '<i class="far fa-trash-alt"></i>';
    // append link to li
    li.appendChild(remove);

    // Edit Icon
    // create new link element
    const edit = document.createElement("a");
    // add class for link element
    edit.className = "edit-task float-right";
    // add icon html to link
    edit.innerHTML = '<i class="far fa-edit mr-3"></i>';
    // append link to li
    li.appendChild(edit);

    // Complete Icon
    // create new link element
    const complete = document.createElement("a");
    // add class for link element
    complete.className = "complete-task float-right";
    // add icon html to link
    complete.innerHTML = '<i class="far fa-check-circle mr-3"></i>';
    // append link to li
    li.appendChild(complete);

    // Priority
    // Create new span element
    const priorityBadge = document.createElement("span");
    // add class for span element
    priorityBadge.className = `badge ${badgeColor}  float-right mr-3`;
    // add badge to span
    priorityBadge.innerHTML = `${badgeText}`;
    // append span to li
    li.appendChild(priorityBadge);

    // append li to ul
    taskList.appendChild(li);
  });
}

function cancelEdit(e) {
  addBtn.style.display = "inline";
  edit.style.display = "none";
  cancelBtn.style.display = "none";

  clearInput();
  // showTasks();
  e.preventDefault();
}

// Assign ID to task
function getID() {
  let tasks;
  if (localStorage.getItem("tasks") === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }
  let ID;
  let taskLength = tasks.length;
  ID = taskLength;

  return ID;
}
// Get Badge Color Function
function getBadgeColor(priority) {
  switch (priority) {
    case "Low":
      return "badge-secondary";
    case "Medium":
      return "badge-info";
    case "High":
      return "badge-warning";
    case "Urgent":
      return "badge-danger";
  }
}

// Get Badge Text Function
function getBadgeText(priority) {
  switch (priority) {
    case "Low":
      return "Low";
    case "Medium":
      return "Medium";
    case "High":
      return "High";
    case "Urgent":
      return "Urgent";
  }
}

// Clear input fields
function clearInput() {
  name.value = "";
  priority.value = "Choose Priority";
}

// Working with LS
// Function - Store Task In Local Storage
function storeTaskInLocalStorate(task) {
  let tasks;
  if (localStorage.getItem("tasks") === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }
  tasks.push(task);
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function updateTaskStorage(updatedTask) {
  let tasks = JSON.parse(localStorage.getItem("tasks"));

  tasks.forEach(function (task, index) {
    if (updatedTask.id === task.id) {
      tasks.splice(index, 1, updatedTask);
    }
  });
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function deleteTaskFromStorage(id) {
  let tasks = JSON.parse(localStorage.getItem("tasks"));

  tasks.forEach(function (task, index) {
    if (id == task.id) {
      tasks.splice(index, 1);
    }
  });
  localStorage.setItem("tasks", JSON.stringify(tasks));
}
