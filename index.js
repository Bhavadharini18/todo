const addBtn = document.getElementById("Addbutton");
const input = document.getElementById("taskInput");
const list = document.querySelector(".mytask-list");

addBtn.onclick = e => {
  e.preventDefault();
  const text = input.value.trim();
  if (!text) return alert("Task must have some name!");
  const tasks = getTasks();
  tasks.push({ text, completed: false });
  saveTasks(tasks);
  input.value = "";
  showTasks();
};

function getTasks() {
  return JSON.parse(localStorage.getItem("tasks")) || [];
}

function saveTasks(tasks) {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function toggleComplete(i) {
  const tasks = getTasks();
  tasks[i].completed = !tasks[i].completed;
  saveTasks(tasks);
  showTasks();
}

function editTask(i) {
  const tasks = getTasks();
  input.value = tasks[i].text;
  tasks.splice(i, 1);
  saveTasks(tasks);
  showTasks();
}

function deleteTask(i) {
  const tasks = getTasks();
  tasks.splice(i, 1);
  saveTasks(tasks);
  showTasks();
}

function showTasks() {
  const tasks = getTasks();
  list.innerHTML = "";
  tasks.forEach((t, i) => {
    list.innerHTML += `
      <li class="taskItem">
        <div class="task ${t.completed ? "completed" : ""}">
          <input type="checkbox" ${t.completed ? "checked" : ""} onchange="toggleComplete(${i})">
          <p>${t.text}</p>
        </div>
        <div class="myicons">
          <img src="./assets/edit.png" onclick="editTask(${i})">
          <img src="./assets/bin.png" onclick="deleteTask(${i})">
        </div>
      </li>
    `;
  });
  updateProgress(tasks);
}

function updateProgress(tasks) {
  const done = tasks.filter(t => t.completed).length;
  const total = tasks.length;
  document.getElementById("progress").style.width = `${(done / (total || 1)) * 100}%`;
  document.getElementById("fracnum").textContent = `${done}/${total}`;
}

showTasks();
