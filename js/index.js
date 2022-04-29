/*Switching pages with display*/
const mainPages = [
  [".authorization", "Registration"],
  [".calendar", "Calendar"],
  [".eventsFullList", "Events"],
  [".eventsCreator", "Create event"]
];

function changePage(button) {
  if(button.value === "-1") {
    return;
  }
  const numOfPage = parseInt(button.value);
  const currentPage = document.querySelector(".currentPage");
  const nextPage = document.querySelector(mainPages[numOfPage][0]);
  const changerPage = document.querySelector(".inputChangePages");
  const nameOfSection = document.querySelector(".nameOfSection");

  currentPage.classList.add("none");
  currentPage.classList.remove("currentPage");
  nextPage.classList.remove("none");
  nextPage.classList.add("currentPage");
  changerPage.value = numOfPage - 1;
  if (numOfPage === 0){
    changerPage.innerHTML = `To`;
  } else {
    changerPage.innerHTML = `To ${mainPages[numOfPage - 1][1]}`;
  }
  nameOfSection.innerHTML = mainPages[numOfPage][1];
}

let buttonsChangePage = document.querySelectorAll(".buttonChangePage");
for (let button of buttonsChangePage) {
  button.addEventListener("click", function() {
    changePage(button);
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

/*Showing calendar table*/
function Calendar(id, year, month) {
    var Dlast = new Date(year,month+1,0).getDate(),
        D = new Date(year,month,Dlast),
        DNlast = new Date(D.getFullYear(),D.getMonth(),Dlast).getDay(),
        DNfirst = new Date(D.getFullYear(),D.getMonth(),1).getDay(),
        calendar = '<tr>',
        month=["January","February","March","April","May","June","July","August","September","October","November","December"];
    if (DNfirst != 0) {
      for(var  i = 1; i < DNfirst; i++) calendar += '<td>';
    }else{
      for(var  i = 0; i < 6; i++) calendar += '<td>';
    }
    for(var  i = 1; i <= Dlast; i++) {
      if (i == new Date().getDate() && D.getFullYear() == new Date().getFullYear() && D.getMonth() == new Date().getMonth()) {
        calendar += '<td class="today">' + i;
      }else{
        calendar += '<td>' + i;
      }
      if (new Date(D.getFullYear(),D.getMonth(),i).getDay() == 0) {
        calendar += '<tr>';
      }
    }
    for(var  i = DNlast; i < 7; i++) calendar += '<td>&nbsp;';
    document.querySelector('#'+id+' tbody').innerHTML = calendar;
    document.querySelector('#'+id+' thead td:nth-child(2)').innerHTML = month[D.getMonth()] +' '+ D.getFullYear();
    document.querySelector('#'+id+' thead td:nth-child(2)').dataset.month = D.getMonth();
    document.querySelector('#'+id+' thead td:nth-child(2)').dataset.year = D.getFullYear();
    if (document.querySelectorAll('#'+id+' tbody tr').length < 6) {
        document.querySelector('#'+id+' tbody').innerHTML += '<tr><td>&nbsp;<td>&nbsp;<td>&nbsp;<td>&nbsp;<td>&nbsp;<td>&nbsp;<td>&nbsp;';
    }
}
Calendar("calendarTable", new Date().getFullYear(), new Date().getMonth());
// переключатель минус месяц
document.querySelector('#calendarTable thead tr:nth-child(1) td:nth-child(1)').onclick = function() {
    Calendar("calendarTable", document.querySelector('#calendarTable thead td:nth-child(2)').dataset.year, parseFloat(document.querySelector('#calendarTable thead td:nth-child(2)').dataset.month)-1);
}
// переключатель плюс месяц
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

function Event(title, desc, place, dateStart, dateEnd, reminder) {
  this.title = title;
  this.desc = desc;
  this.place = place;
  this.dateStart = dateStart;
  this.dateEnd = dateEnd;
  this.reminder = reminder;
}

/*Switching device*/
if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|BB|PlayBook|IEMobile|Windows Phone|Kindle|Silk|Opera Mini/i.test(navigator.userAgent)) {
  const blocks = document.querySelectorAll(".eventCrBlock");
  blocks.forEach(el => {
    el.classList.remove("eventCrBlock")
    el.classList.add("eventCrBlockMobile")
  });
  const parent = document.querySelector(".eventsCreator");
  parent.classList.add("eventsCreatorMobile");
  document.querySelector(".eventCrBlockRightTransition").classList.remove("eventCrBlockRightTransition");
  document.querySelector(".inputData").style.width = "80%";
  document.querySelector(".button").style.width = "50%";
}