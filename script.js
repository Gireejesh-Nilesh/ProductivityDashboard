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
              ${
                e.details
                  ? `
                <details>
                  <summary></i></summary>
                  <p>${e.details}</p>
                </details>
              `
                  : ""
              }
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

function dailyPanner() {
  let dayPlanData = JSON.parse(localStorage.getItem("dayPlanData")) || {};
  let dayPlanner = document.querySelector(".day-plannner");

  let hours = Array.from(
    { length: 18 },
    (_, idx) => `${6 + idx}:00 - ${7 + idx}:00`
  );

  let wholeDaySum = "";
  hours.forEach((elem, idx) => {
    let savedData = dayPlanData[idx] || "";
    wholeDaySum += `<div class="day-planner-time">
            <p>${elem}</p>
            <input id=${idx} type="text" placeholder="..." value=${savedData}>
          </div>`;
  });

  dayPlanner.innerHTML = wholeDaySum;
  let dayPlannerInput = document.querySelectorAll(".day-plannner input");
  dayPlannerInput.forEach((elem) => {
    elem.addEventListener("input", () => {
      dayPlanData[elem.id] = elem.value;
      localStorage.setItem("dayPlanData", JSON.stringify(dayPlanData));
    });
  });

  function scheduleClearLocalStorage() {
    const now = new Date();
    const nextMidnight = new Date();
    nextMidnight.setHours(24, 0, 0, 0);

    const timeUntilMidnight = nextMidnight.getTime() - now.getTime();
    setTimeout(() => {
      localStorage.clear();
      console.log("LocalStorage cleared at midnight!");
      setInterval(() => {
        localStorage.clear();
        console.log("LocalStorage cleared again at midnight!");
      }, 24 * 60 * 60 * 1000);
    }, timeUntilMidnight);
  }

  scheduleClearLocalStorage();
}
dailyPanner();

function motivationalQuote() {
  let motivationQuoteContent = document.querySelector(".motivation2 h1");
  let motivationAuthor = document.querySelector(".motivation3 h2");

  async function fetchQuote() {
    let response = await fetch(
      "https://motivational-spark-api.vercel.app/api/quotes/random"
    );
    let data = await response.json();
    motivationQuoteContent.textContent = data.quote;
    motivationAuthor.textContent = "- " + data.author;
  }
  fetchQuote();
}
motivationalQuote();
