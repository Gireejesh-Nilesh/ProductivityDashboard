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

let form = document.querySelector(".addTask  form");
let taskInput = document.querySelector(".addTask form #task-input");
let taskDetailsInput = document.querySelector(".addTask form textarea");
let taskCheckbox = document.querySelector(".addTask form #check");

let currentTasks = [
  {
    task: "Mandir Jao",
    details: "Hanuman ji vaale",
    imp: true,
  },
  {
    task: "Study",
    details: "SCS",
    imp: true,
  },
  {
    task: "Lunch at 2PM",
    details: "Mom told",
    imp: false,
  },
];

// form.addEventListener("submit", (e) => {
//   e.preventDefault();
//   // console.log(taskInput.value);
//   // console.log(taskDetailsInput.value);
//   // console.log(taskCheckbox.checked);
// });

let allTask = document.querySelector(".allTask");

let sum = "";
currentTasks.forEach((e) => {
  sum += `<div class="task">
              <h5>${e.task}<span class="${e.imp}">imp</span></h5>
              <button>Mark as complete</button>
            </div>`;
});

allTask.innerHTML = sum;
