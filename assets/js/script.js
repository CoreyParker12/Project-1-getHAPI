// Empty array to push generated APIs into...
let surpriseArray = [];

// Hides the rendered API page and the invalid message when the pahe loads
$("#renderedAPI").hide();
$("#invalid-msg").hide();

// Function to pull the result from one of the 3 possible APIs
    // It was written in a way so that the API is not needlessly called.
    // The random API is only called if selected
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

// Pulls a random fact from the random fact API
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

// Pulls a random dad joke from the dad joke API
function getDadJoke() {

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

// Pulls a random quote from the random quote API
function getQuote() {

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

// Click event listener for "Smart" button choice under "I'm Feeling"
$('#factBtn').click(function() {
  
  console.log("hello");
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

// Creating a function to store an array of generated 'surprises' to local storage
function storeSurprise() {

  localStorage.setItem("surprise", JSON.stringify(surpriseArray));

}

$('#form-styling').submit(function(event) {
  
  event.preventDefault();

  let userRating = parseInt(event.currentTarget[0].value);

  if (userRating === 1 || userRating === 2 || userRating === 3 || userRating === 4 || userRating === 5) {
    
    let latestAPI = $('#selected-API').text();
    let userObject = {
      API: latestAPI,
      rating: userRating
    }

    surpriseArray.unshift(userObject);
   
    storeSurprise();
    location.reload();
  } else {
    $("#invalid-msg").show();
  }

  $('#user-rating').val("");

});

// Creating a function to render the saved 'surprises' to the page from local storage
function renderSurprises() {
  
  let storedSurprises = JSON.parse(localStorage.getItem("surprise"));

  // If there are surprises saved to local storage, set the array of surprises to those
  if(storedSurprises) {
      
    surpriseArray = storedSurprises;

    // SORTING ARRAY FUNCTION
    // https://www.sitepoint.com/sort-an-array-of-objects-in-javascript/
    function compare(a, b) {
      
      let ratingA = a.rating;
      let ratingB = b.rating;
      let comparison = 0;

      if (ratingA > ratingB) {
        comparison = -1;
      } else if (ratingA < ratingB) {
        comparison = 1;
      }
      return comparison
    }
    
    surpriseArray.sort(compare);
    console.log(surpriseArray);
    
    // For each stored surprise in local storage, render it to the page
    let numOfStars = "";

    for (let i=0; i < 5; i++) {
      if (surpriseArray[i].rating === 1) {
        numOfStars = "☆";
      } else if (surpriseArray[i].rating === 2) {
        numOfStars = "☆☆";
      } else if (surpriseArray[i].rating === 3) {
        numOfStars = "☆☆☆";
      }  else if (surpriseArray[i].rating === 4) {
        numOfStars = "☆☆☆☆";
      }  else {numOfStars = "☆☆☆☆☆";
      
      }

      let previousSurprise = $('<button>').html(surpriseArray[i].API + '<br></br>' + numOfStars);
      $('#recent-results').append(previousSurprise);
      
      if (!surpriseArray[i+1]) {
        break;
      }
    }
  }
}

// Show any saved surprises upon page load
renderSurprises();