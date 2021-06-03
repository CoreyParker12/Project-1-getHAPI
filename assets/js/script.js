// Empty array to push generated APIs into...
let surpriseArray = [];

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
        $selectedAPI.text(data.text);
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


// Click event listener for "Smart" button choice under "I'm Feeling"
$('#factBtn').click(function() {
  $("#homepage").hide();
  $("#renderedAPI").show();
  getRandomFact();
});

// Click event listener for "Punny" button choice under "I'm Feeling"
$('#dadBtn').click(function() {
  $("#homepage").hide();
  $("#renderedAPI").show();
  getDadJoke();
});

// Click event listener for "Inspired" button choice under "I'm Feeling"
$('#quoteBtn').click(function() {
  $("#homepage").hide();
  $("#renderedAPI").show();
  getQuote();
});

// to copy over to JS...
// empty array variable
// 2 lines of code in each API function to 1. push surprise, 2. store surprise
// storeSurprise function
// render Surprise function

// Creating a function to store an array of generated 'surprises' to local storage
function storeSurprise() {
  localStorage.setItem("surprise", JSON.stringify(surpriseArray));




}

$('#form-styling').submit(function(event) {
  event.preventDefault();


  let userRating = event.currentTarget[0].value;

  if (userRating == 1 || userRating == 2 || userRating == 3 || userRating == 4 || userRating == 5) {
    let latestAPI = $('#selected-API').text();

    let userObject = {
      API: latestAPI,
      rating: userRating
    }
  
    // let test = Object.values(userObject);
    // console.log(test)

   surpriseArray.unshift(userObject);
   
   storeSurprise();
  } else {
    alert('No!');
  }



});


// Creating a function to render the saved 'surprises' to the page from local storage
function renderSurprises() {
  let storedSurprises = JSON.parse(localStorage.getItem("surprise"));

  // If there are surprises saved to local storage, set the array of surprises to those
  if(storedSurprises) {
      surpriseArray = storedSurprises;
      
      // For each stored surprise in local storage, render it to the page
      for (let i=0; i < 5; i++) {
          // change the jQuery selector based on Corey's div name
          let previousSurprise = $('<button>').html(surpriseArray[i].API + '<br></br>' + surpriseArray[i].rating);
          $('#recent-results').append(previousSurprise);

          if (!surpriseArray[i+1]) {
            break;
          }
      }
  }

  

}
// Show any saved surprises upon page load
renderSurprises();

// Click event listener for return to homepage button
$('#returnBtn').click(function() {
  // $("#renderedAPI").hide();
  // $("#homepage").show();
  // $('#selected-API').empty();
  // $("#myDropdown").hide();
  location.reload();
})