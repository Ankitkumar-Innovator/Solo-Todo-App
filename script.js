document.addEventListener("DOMContentLoaded", function () {
  const addTaskButton = document.getElementById("add-task-btn");
  const todoInput = document.getElementById("todo-input");
  const todoList = document.getElementById("todo-list");

  let tasks = JSON.parse(localStorage.getItem("TASKS")) || [];

  tasks.forEach((task) => {
    renderTask(task);
  });

  addTaskButton.addEventListener("click", function () {
    const taskText = todoInput.value.trim();

    if (taskText !== "") {
      const newTask = {
        id: Date.now(),
        text: taskText,
        isCompleted: false,
      };
      tasks.push(newTask);
      renderTask(newTask);
      saveTasks();
      todoInput.value = "";
      //console.log(tasks);
    }
  });

  function renderTask(task) {
    const li = document.createElement("li");
    li.setAttribute("data-id", task.id);

    if(task.isCompleted){
      li.classList.add("completed");
    }

    li.innerHTML = `
    <div class="task-content">
            <input type="checkbox" class="task-checkbox" ${task.isCompleted ? "checked" : ""} />
            <span>${task.text}</span>
          </div>
          <button class="delete-btn">Delete</button>`;

    todoList.appendChild(li);
  }

  // Event Delegation -ONCE

  // for DELETE
  todoList.addEventListener("click", function (e) {
    if (e.target.classList.contains("delete-btn")) {
      const li = e.target.closest("li");
      const taskId = Number(li.getAttribute("data-id"));

      // [1] Remove from data
      tasks = tasks.filter(task => task.id !== taskId);

      // [2] Save updated data
      saveTasks();

      // [3] Remove from UI
      li.remove();

    }
  });

  // for COMPLETE
todoList.addEventListener("change",function(e){
  if(e.target.classList.contains("task-checkbox")){

    const li = e.target.closest("li");
     const taskId2 = Number(li.getAttribute("data-id"));

     // [1] Update data
     const task = tasks.find(task => task.id === taskId2)
     task.isCompleted = e.target.checked;

     // [2] Update UI
     li.classList.toggle("completed",task.isCompleted);

     // [3] Save
     saveTasks();
  }
})


  function saveTasks() {
    // Save tasks to local storage
    localStorage.setItem("TASKS", JSON.stringify(tasks));
  }
});
