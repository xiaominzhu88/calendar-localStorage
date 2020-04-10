const selectMon = document.querySelector("select");

selectMon.onchange = function() {
  const choice = selectMon.value;
  let days = 31;
  if (choice === "February") {
    days = 28;
  } else if (
    choice === "April" ||
    choice === "June" ||
    choice === "September" ||
    choice === "November"
  ) {
    days = 30;
  }

  createCalendar(days, choice);
};

//-------------- show/clear Date dynamically with button-----------------------

const weekDays = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
];

let d = new Date();
const dateButton = document.querySelector("#date-button");
const dateContent = document.querySelector("p");
dateButton.addEventListener("click", showDate);

function showDate() {
  let year = d.getFullYear();
  let month = d.getMonth() + 1;
  let date = d.getDate();
  let day = d.getDay();
  let now_time =
    "Today is ：" + weekDays[day] + " " + date + ". " + month + ". " + year;

  dateContent.innerHTML = now_time;
}

//--------------------------------create Calendar-------------------------------

let contents;

if (localStorage.contents) {
  contents = JSON.parse(localStorage.getItem("contents"));
} else {
  contents = {};
}

function createCalendar(days, choice) {
  const list = document.querySelector("ul");
  const h1 = document.querySelector("h1");

  list.innerHTML = "";
  h1.textContent = choice;

  for (let i = 1; i <= days; i++) {
    const listItem = document.createElement("li");
    listItem.textContent = i;

    const listItemInput = document.createElement("input");
    listItemInput.id = "item-content-" + selectMon.value + "-" + i;
    listItemInput.type = "text";

    listItemInput.value = contents[listItemInput.id]
      ? contents[listItemInput.id]
      : "";

    listItemInput.addEventListener("blur", save);

    listItem.append(listItemInput);
    list.appendChild(listItem);
  }
}

// localStorage---------->> learn how to use------------------------------------

function save(event) {
  //1. get the input value; =>event.target.value

  contents[event.target.id] = event.target.value;

  // 3. save the new value to the local Storage.
  localStorage.setItem("contents", JSON.stringify(contents));
}

const clearValue = document.querySelector("#clear-button");
clearValue.addEventListener("click", clear);

function clear() {
  dateContent.innerHTML = "";
  //localStorage.clear();
}
