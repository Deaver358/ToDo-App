document.addEventListener("DOMContentLoaded", () => {
  // Grab elements
  const input = document.getElementById("taskInput");
  const addBtn = document.getElementById("addTaskBtn");
  const clearBtn = document.getElementById("clearAllBtn");
  const taskList = document.getElementById("taskList");

  // Load tasks safely from localStorage
  let tasks;
  try {
    tasks = JSON.parse(localStorage.getItem("tasks"));
    if (!Array.isArray(tasks)) tasks = [];
  } catch (e) {
    tasks = [];
  }

  // Render tasks
  function renderTasks() {
    taskList.innerHTML = ""; // Clear previous

    tasks.forEach((task, index) => {
      const li = document.createElement("li");
      li.className = "task-item";

      const span = document.createElement("span");
      span.textContent = task;

      // Edit button
      const editBtn = document.createElement("button");
      editBtn.textContent = "Edit";
      editBtn.className = "btn edit";
      editBtn.onclick = () => editTask(index);

      // Delete button
      const delBtn = document.createElement("button");
      delBtn.textContent = "Delete";
      delBtn.className = "btn danger";
      delBtn.onclick = () => deleteTask(index);

      li.appendChild(span);
      li.appendChild(editBtn);
      li.appendChild(delBtn);
      taskList.appendChild(li);
    });

    // Save updated tasks
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }

  // Add task
  addBtn.onclick = () => {
    const value = input.value.trim();
    if (value) {
      tasks.push(value);
      input.value = "";
      renderTasks();
    }
  };

  // Edit task
  function editTask(index) {
    const updated = prompt("Edit your task:", tasks[index]);
    if (updated !== null && updated.trim() !== "") {
      tasks[index] = updated.trim();
      renderTasks();
    }
  }

  // Delete task
  function deleteTask(index) {
    tasks.splice(index, 1);
    renderTasks();
  }

  // Delete all tasks
  clearBtn.onclick = () => {
    if (confirm("Delete all tasks?")) {
      tasks = [];
      renderTasks();
    }
  };

  // Initial render
  renderTasks();
});