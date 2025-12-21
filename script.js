function openFeatures() {
  const allElems = document.querySelectorAll(".elem");
  const fullElemPage = document.querySelectorAll(".fullElem");
  const fullElemPageBackBtn = document.querySelectorAll(".fullElem .close-btn");

  allElems.forEach((elem) => {
    elem.addEventListener("click", () => {
      fullElemPage[elem.id].style.display = "block";
    });
  });

  fullElemPageBackBtn.forEach((backBtn) => {
    backBtn.addEventListener("click", () => {
      fullElemPage[backBtn.id].style.display = "none";
    });
  });
}
openFeatures();

function todoList() {
  var currentTasks = [];

  if (localStorage.getItem("currentTask")) {
    currentTasks = JSON.parse(localStorage.getItem("currentTask"));
  } else {
    console.log("Task list is Empty");
  }

  function renderTask() {
    let allTask = document.querySelector(".allTask");

    let sum = "";
    currentTasks.forEach((e, idx) => {
      sum += `<div class="task">
              <h5>${e.task}<span class="${e.imp}">imp</span></h5>
              ${e.details ? `
                <details>
                  <summary></i></summary>
                  <p>${e.details}</p>
                </details>
              ` : ""}
              <button id=${idx}>Mark as complete</button>
              
            </div>`;
    });

    allTask.innerHTML = sum;
    localStorage.setItem("currentTask", JSON.stringify(currentTasks));

    document.querySelectorAll(".task button").forEach((btn) => {
      btn.addEventListener("click", () => {
        currentTasks.splice(btn.id, 1);
        renderTask();
      });
    });
  }
  renderTask();

  let form = document.querySelector(".addTask  form");
  let taskInput = document.querySelector(".addTask form #task-input");
  let taskDetailsInput = document.querySelector(".addTask form textarea");
  let taskCheckbox = document.querySelector(".addTask form #check");

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    currentTasks.push({
      task: taskInput.value,
      details: taskDetailsInput.value,
      imp: taskCheckbox.checked,
    });
    renderTask();
    taskCheckbox.checked = false;
    taskDetailsInput.value = "";
    taskInput.value = "";
  });
}
todoList();
