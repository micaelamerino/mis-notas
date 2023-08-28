let taskList = JSON.parse(localStorage.getItem("task")) || [];

const saveTask = () => {
  localStorage.setItem("task", JSON.stringify(taskList));
};

const form = document.getElementById("form");

const messageError = document.getElementById("messageError");

form.addEventListener("submit", addTask);

function addTask(e) {
  e.preventDefault();
  const input = document.getElementById("input");
  if (input.value === "") {
    messageError.innerHTML = `<p>*Debe completar el campo</p>`;
  } else {
    messageError.innerHTML = "";
    const taskData = {
      id: Date.now(),
      text: input.value,
    };
    taskList.unshift(taskData);
    saveTask();
    form.reset();
    input.focus();
    paintList();
  }
}

const list = document.getElementById("list");

const paintList = () => {
  list.innerHTML = "";

  if (taskList.length > 0) {
    taskList.forEach((task) => {
      const contentTask = document.createElement("div");
      contentTask.className = "content-task";
      const parrafo = document.createElement("p");
      parrafo.className = "task";
      parrafo.innerHTML = `${task.text}`;
      contentTask.appendChild(parrafo);

      const btnTrash = document.createElement("button");
      btnTrash.className = "btn-trash";
      btnTrash.innerHTML = `<img src="trash.svg"/>`;
      btnTrash.addEventListener("click", () => {
        deleteTask(task.id);
      });
      contentTask.appendChild(btnTrash);
      list.appendChild(contentTask);
    });
  }
};
paintList();

function deleteTask(id) {
  searchID = taskList.find((e) => e.id == id);
  taskList = taskList.filter((e) => e != searchID);
  paintList();
  saveTask();
  input.focus();
}
