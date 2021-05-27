// Random Facts fetch and rendering to page

//Somewhere, after click

$("#myDropdown").hide();
$("#renderedAPI").hide();

function getRandom() {

    let test = Math.floor(Math.random() * 3);
    console.log(test);
    if (test === 0) {
      getRandomFact();
    } else if (test === 1) {
      getDadJoke();
    } else {
      getQuote();
    }

}

function getRandomFact() {

  let $selectedAPI = $('#selected-API')

  fetch("https://uselessfacts.jsph.pl/random.json?language=en")
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
        $selectedAPI.text(data.text)
    });

}

function getDadJoke() {

  // Dad jokes fetch and rendering to page

  let $selectedAPI = $('#selected-API');

  fetch("https://icanhazdadjoke.com/", {
  headers: {
    Accept: "application/json"
  }
})
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    $selectedAPI.text(data.joke);
  });

}

function getQuote() {

// Inspiring quote fetch and rendering to page
let $selectedAPI = $('#selected-API');

fetch('https://type.fit/api/quotes')
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
        let randomIndex = Math.floor(Math.random()*data.length)
        $selectedAPI.text('"' + data[randomIndex].text + '"' + "  -" + data[randomIndex].author);
  });

}

// Click event listener for Surprise Me Button
$('#surpriseBtn').click(function() {
    $("#homepage").hide();
    $("#renderedAPI").show();
    getRandom()

}); 

// Click event listener for show/hide drop-down choices
$('#feelingBtn').click(function() {
  $("#myDropdown").show();
  });





