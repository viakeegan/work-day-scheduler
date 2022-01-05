var currentDayEl = document.querySelector("#currentDay");
var todayDate = moment().format("MMMM Do YYYY");
currentDayEl.textContent = todayDate;

var items = [];
var setHourIndex = 9;

var checkTime = function() {
  $(".hour").each(function() {
    var currentTime = (moment().format("H").toString());
    var hourText = $(this).text();
    if (setHourIndex > 12) {
      setHourIndex = 1;
    }
    if (hourText.includes(setHourIndex)) {
      var check = $(this).parent().children()[1]
      check.id = ("id", hourText);
      setHourIndex++;
    }
    var spanHour = parseInt($(this).find("span").text());
    if (spanHour < 9) {
      spanHour = spanHour + 12;
    }
    if (currentTime - spanHour === 0) {
      check.classList.add("present");
    }
    if (currentTime - spanHour > 0) {
      check.classList.add("past");
    }
    if (currentTime - spanHour < 0) {
      check.classList.add("future");
    }
    loadItems(hourText, check);
  })
}

var loadItems = function(hourText, inputValue) {
  items = JSON.parse(localStorage.getItem("items"));
  if (!items) {
    items = [];
    localStorage.setItem("items", JSON.stringify(items));
  } 
  else {
    for (var i = 0; i < items.length; i++) {
      if (items[i].id === hourText) {
        inputValue.value = items[i].text
      }
    }
  }
}

var changeItems = function(textInput, textId) {
  itemsNew = {
    id: textId,
    text: textInput
  }
  for (var i = 0; i < items.length; i++) {
    if (items[i].id === itemsNew.id) {
      items[i].text = itemsNew.text
      localStorage.setItem("items", JSON.stringify(items))
      return null;
    }
  }
  items.push(itemsNew)
  localStorage.setItem("items", JSON.stringify(items));
}


$(".row").on("click", ".saveBtn", function(event) {
  var textSelect = $(this).parent().children()[1];
  var textInput = textSelect.value.trim();
  var textId = textSelect.id;
  changeItems(textInput, textId);
})

// setTime();
checkTime();

