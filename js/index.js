/*Switching pages with display*/
function changePage(button, mainPages) {
  if(button.value === "-1") {
    return;
  }

  const numOfPage = parseInt(button.value);
  const currentPage = document.querySelector(".currentPage");
  const nextPage = document.querySelector(mainPages[numOfPage][0]);

  currentPage.classList.add("none");
  currentPage.classList.remove("currentPage");
  nextPage.classList.remove("none");
  nextPage.classList.add("currentPage");

  const changerPage = document.querySelector(".inputChangePages");
  changerPage.value = numOfPage - 1;
  changerPage.innerHTML = (numOfPage === 0) ? `To` : `To ${mainPages[numOfPage - 1][1]}`;
  document.querySelector(".nameOfSection").innerHTML = mainPages[numOfPage][1];
}

const mainPages = [
  [".authorization", "Registration"],
  [".calendar", "Calendar"],
  [".eventsFullList", "Events"],
  [".eventsCreator", "Create event"]
];

let buttonsChangePage = document.querySelectorAll(".buttonChangePage");
for (let button of buttonsChangePage) {
  button.addEventListener("click", function() {
    changePage(button, mainPages);
  });
}

/*Showing time*/
const showDate = document.querySelector(".showCurrentTime");
let secTimeLet = (num) => ((num.toString()).length === 2) ? num : "0" + num;
function changeCurrentDate(show, secTimeLet) {
    let date = new Date();
    show.innerHTML = `${secTimeLet(date.getHours())}:${secTimeLet(date.getMinutes())}:`;
    show.innerHTML += `${secTimeLet(date.getSeconds())}     ${secTimeLet(date.getDate())}`
    show.innerHTML += `.${secTimeLet(date.getMonth() + 1)}.${date.getFullYear()}`
    setTimeout(changeCurrentDate, 1000, show, secTimeLet)
}
changeCurrentDate(showDate, secTimeLet);

/*Creating correct minimal date*/
const inputDate = document.querySelectorAll(".inputDate");
const eventCrElem = document.querySelectorAll(".eventCrBlockTime");

for (let input of inputDate) {
  let date = new Date();
  let strDate = "";
  strDate = `${date.getFullYear()}-${secTimeLet(date.getMonth() + 1)}`;
  strDate += `-${secTimeLet(date.getDate())}`;
  input.value = strDate;
  console.log(strDate);
}

for (let elems of eventCrElem) {
  let el = elems.querySelectorAll(".inputEventCrTime");
  let date = new Date();
  el[0].value = `${date.getHours()}`;
  el[1].value = `${date.getMinutes()}`;
}

/*Showing calendar table*/
function Calendar(id, year, month) {
    let Dlast = new Date(year, month + 1, 0).getDate();
    let D = new Date(year, month, Dlast);
    let DNlast = new Date(D.getFullYear(), D.getMonth(), Dlast).getDay();
    let DNfirst = new Date(D.getFullYear(), D.getMonth(), 1).getDay();
    let calendar = '<tr>';
    let months=["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let numOfRepeat = (DNfirst !== 0) ? DNfirst - 1 : 6;
    calendar += '<td>'.repeat(numOfRepeat);
    /*if (DNfirst != 0) {
      for(let i = 1; i < DNfirst; i++) {
        calendar += '<td>';
      }
    } else{
      for(let i = 0; i < 6; i++) {
        calendar += '<td>';
      }
    }*/
    const nowDay = new Date().getDate();
    const nowMonth = new Date().getMonth();
    const nowYear = new Date().getFullYear();
    for(let i = 1; i < Dlast + 1; i++) {
      if (i === nowDay && D.getMonth() === nowMonth && D.getFullYear() === nowYear) {
        calendar += '<td class="today">' + i;
      } else {
        calendar += '<td>' + i;
      }
      if (new Date(D.getFullYear(), D.getMonth(), i).getDay() == 0) {
        calendar += '<tr>';
      }
    }
    for(let i = DNlast; i < 7; i++) { 
      calendar += '<td>&nbsp;';
    }
    document.querySelector('#' + id + ' tbody').innerHTML = calendar;
    document.querySelector('#' + id + ' thead td:nth-child(2)').innerHTML = months[D.getMonth()] +' '+ D.getFullYear();
    document.querySelector('#' + id + ' thead td:nth-child(2)').dataset.month = D.getMonth();
    document.querySelector('#' + id + ' thead td:nth-child(2)').dataset.year = D.getFullYear();
    if (document.querySelectorAll('#' + id + ' tbody tr').length < 6) {  
        document.querySelector('#' + id + ' tbody').innerHTML += '<tr><td>&nbsp;<td>&nbsp;<td>&nbsp;<td>&nbsp;<td>&nbsp;<td>&nbsp;<td>&nbsp;';
    }
}
Calendar("calendarTable", new Date().getFullYear(), new Date().getMonth());
document.querySelector('#calendarTable thead tr:nth-child(1) td:nth-child(1)').onclick = function() {
    Calendar("calendarTable", document.querySelector('#calendarTable thead td:nth-child(2)').dataset.year, parseFloat(document.querySelector('#calendarTable thead td:nth-child(2)').dataset.month)-1);
}
document.querySelector('#calendarTable thead tr:nth-child(1) td:nth-child(3)').onclick = function() {
    Calendar("calendarTable", document.querySelector('#calendarTable thead td:nth-child(2)').dataset.year, parseFloat(document.querySelector('#calendarTable thead td:nth-child(2)').dataset.month)+1);
}

const timeBorders = [[0, 24], [0, 60]];
let timerCreators = document.querySelectorAll(".eventCrBlockTime");
for (let i = 0; i < timerCreators.length; ++i) {
  let elements = timerCreators[i].querySelectorAll(".inputEventCrTime");
  for (let j = 0; j < timeBorders.length; ++j) {
    elements[j].addEventListener("change", function() {
      let value = parseInt(elements[j].value);
      if (isNaN(value) || value < timeBorders[j][0] || value >= timeBorders[j][1]) {
        elements[j].value = String(timeBorders[j][0]);
      }
    })
  }
}

/*function Event(title, desc, place, dateStart, dateEnd, reminder) {
  this.title = title;
  this.desc = desc;
  this.place = place;
  this.dateStart = dateStart;
  this.dateEnd = dateEnd;
  this.reminder = reminder;
}*/