const API_KEY = window.WEATHER_API_KEY;

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

  function scheduleClearDayPlanData() {
    const now = new Date();
    const nextMidnight = new Date();
    nextMidnight.setHours(18, 0, 0, 0);

    const timeUntilMidnight = nextMidnight.getTime() - now.getTime();

    setTimeout(() => {
      localStorage.removeItem("dayPlanData");

      setInterval(() => {
        localStorage.removeItem("dayPlanData");
      }, 18 * 60 * 60 * 1000);
    }, timeUntilMidnight);
  }
  scheduleClearDayPlanData();
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
function pomodoroTimer() {
  let totSec = 25 * 60;
  let startBtn = document.querySelector(".pomo-timer .start-timer");
  let pauseBtn = document.querySelector(".pomo-timer .pause-timer");
  let resetBtn = document.querySelector(".pomo-timer .reset-timer");
  let session = document.querySelector(".pomodoro-fullpage .session");

  let isWorkSession = true;

  let timerInterval = null;
  let timer = document.querySelector(".pomo-timer h1");
  function updateTimer() {
    let minutes = Math.floor(totSec / 60);
    let secs = totSec % 60;
    timer.innerHTML = `${String(minutes).padStart(2, "0")}:${String(
      secs
    ).padStart(2, "0")}`;
  }

  function startTimer() {
    clearInterval(timerInterval);

    if (isWorkSession) {
      timerInterval = setInterval(() => {
        if (totSec > 0) {
          totSec--;
          updateTimer();
        } else {
          isWorkSession = false;
          clearInterval(timerInterval);
          timer.innerHTML = `05:00`;
          session.innerHTML = "Take a Break";
          session.style.backgroundColor = "var(--blue)";
          totSec = 5 * 60;
        }
      }, 1000);
    } else {
      timerInterval = setInterval(() => {
        if (totSec > 0) {
          totSec--;
          updateTimer();
        } else {
          isWorkSession = true;
          clearInterval(timerInterval);
          timer.innerHTML = `25:00`;
          session.innerHTML = "Work Session";
          session.style.backgroundColor = "var(--green)";
          totSec = 25 * 60;
        }
      }, 1000);
    }
  }

  function pauseTimer() {
    clearInterval(timerInterval);
  }
  function resetTimer() {
    clearInterval(timerInterval);
    totSec = 25 * 60;
    updateTimer();
  }

  startBtn.addEventListener("click", startTimer);
  pauseBtn.addEventListener("click", pauseTimer);
  resetBtn.addEventListener("click", resetTimer);
}
pomodoroTimer();

function weatherFunctionality() {
  let header1Time = document.querySelector(".header1 h1");
  let header1Date = document.querySelector(".header1 h2");
  let header2Temp = document.querySelector(".header2 h2");
  let header2Condition = document.querySelector(".header2 h4");
  let precipitation = document.querySelector(".header2 .precipitation");
  let humidity = document.querySelector(".header2 .humidity");
  let wind = document.querySelector(".header2 .wind");
  let headerCity = document.querySelector(".header1 h4");

  let city = "Hyderabad";

  async function weatherAPICall() {
    const response = await fetch(
      `https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${city}`
    );
    const data = await response.json();

    header2Temp.innerHTML = `${data.current.temp_c}°C`;
    header2Condition.innerHTML = data.current.condition.text;
    wind.innerHTML = `Wind: ${data.current.wind_kph}km/h`;
    humidity.innerHTML = `Humidity: ${data.current.humidity}%`;
    precipitation.innerHTML = `Heat Index: ${data.current.heatindex_c}°C`;
  }

  function detectLocation() {
    if (!navigator.geolocation) {
      weatherAPICall();
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;

        const res = await fetch(
          `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`
        );
        const data = await res.json();

        city =
          data.address.city ||
          data.address.town ||
          data.address.village ||
          city;

        headerCity.innerHTML = `${city}`;
        weatherAPICall();
      },
      () => {
        weatherAPICall();
      }
    );
  }

  detectLocation();

  const daysOfWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  function timeDate() {
    const date = new Date();
    const day = daysOfWeek[date.getDay()];
    let hours = date.getHours();
    const mins = date.getMinutes();
    const seconds = date.getSeconds();

    header1Date.innerHTML = `${date.getDate()} ${
      months[date.getMonth()]
    } ${date.getFullYear()}`;

    const period = hours >= 12 ? "PM" : "AM";
    hours = hours % 12 || 12;

    header1Time.innerHTML = `${day}, ${String(hours).padStart(2, "0")}:${String(
      mins
    ).padStart(2, "0")}:${String(seconds).padStart(2, "0")}${period}`;
  }

  setInterval(timeDate, 1000);
}

weatherFunctionality();

function sideNavigation() {
  const sideNav = document.querySelector(".side-nav");
  const toggle = document.querySelector(".nav-toggle");
  const icon = toggle.querySelector("i");
  const buttons = document.querySelectorAll(".nav-panel button");
  const fullPages = document.querySelectorAll(".fullElem");

  toggle.addEventListener("mouseenter", () => {
    sideNav.classList.add("active");
    icon.className = "ri-arrow-left-s-line";
  });

  sideNav.addEventListener("mouseleave", () => {
    sideNav.classList.remove("active");
    icon.className = "ri-arrow-right-s-line";
  });

  buttons.forEach((btn) => {
    btn.addEventListener("click", () => {
      fullPages.forEach((p) => (p.style.display = "none"));
      fullPages[btn.dataset.target].style.display = "block";
    });
  });
}
sideNavigation();

function themeToggle() {
  const themeBtn = document.querySelector(".nav-panel .theme");
  const root = document.documentElement;

  themeBtn.addEventListener("click", () => {
    const styles = getComputedStyle(root);

    const pri = styles.getPropertyValue("--pri").trim();
    const sec = styles.getPropertyValue("--sec").trim();

    root.style.setProperty("--pri", sec);
    root.style.setProperty("--sec", pri);
    root.style.setProperty("--black", sec);
  });
}

themeToggle();

function dailyGoals() {
  const titleInput = document.querySelector("#goal-title");
  const descInput = document.querySelector("#goal-desc");
  const form = document.querySelector(".addGoal form");
  const allGoals = document.querySelector(".allGoals");

  const colors = ["#FFD966", "#FF9AA2", "#B5EAD7", "#C7CEEA", "#FFDAC1"];

  let goals = JSON.parse(localStorage.getItem("dailyGoals")) || [];

  function renderGoals() {
    allGoals.innerHTML = "";

    goals.forEach((goal, index) => {
      const card = document.createElement("div");
      card.className = "goal-card pinned";
      card.style.backgroundColor = goal.color;
      card.style.setProperty("--pin-color", goal.pinColor);
      card.style.position = "absolute";
      card.style.left = goal.x + "px";
      card.style.top = goal.y + "px";

      card.innerHTML = `
        <h3>${goal.title}</h3>
        <p>${goal.desc}</p>
        <button>Achieved</button>
      `;

      card.querySelector("button").addEventListener("click", () => {
        goals.splice(index, 1);
        localStorage.setItem("dailyGoals", JSON.stringify(goals));
        renderGoals();
      });

      enableDrag(card, index);
      allGoals.appendChild(card);
    });
  }

  function enableDrag(card, index) {
    let offsetX = 0;
    let offsetY = 0;

    card.addEventListener("mousedown", (e) => {
      if (e.target.tagName === "BUTTON") return;

      card.classList.add("dragging");
      offsetX = e.clientX - card.offsetLeft;
      offsetY = e.clientY - card.offsetTop;

      function move(e) {
        const x = e.clientX - offsetX;
        const y = e.clientY - offsetY;

        card.style.left = x + "px";
        card.style.top = y + "px";
      }

      function stop() {
        card.classList.remove("dragging");
        card.classList.add("drop-animate", "pinned");

        goals[index].x = card.offsetLeft;
        goals[index].y = card.offsetTop;
        localStorage.setItem("dailyGoals", JSON.stringify(goals));

        setTimeout(() => {
          card.classList.remove("drop-animate");
        }, 250);

        document.removeEventListener("mousemove", move);
        document.removeEventListener("mouseup", stop);
      }

      document.addEventListener("mousemove", move);
      document.addEventListener("mouseup", stop);
    });
  }

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    goals.push({
      title: titleInput.value,
      desc: descInput.value,
      color: colors[Math.floor(Math.random() * colors.length)],
      x: Math.random() * 300,
      y: Math.random() * 200,
    });

    localStorage.setItem("dailyGoals", JSON.stringify(goals));
    renderGoals();

    titleInput.value = "";
    descInput.value = "";
  });

  renderGoals();
}

dailyGoals();
