// Empty array to push generated APIs into...
let pickmeupArray = [];

// Hides the rendered API page and the invalid message when the page loads
$("#renderedAPI").hide();
$("#invalid-msg").hide();

// Function to pull the result from one of the 3 possible APIs
    // It was written in a way so that the API is not needlessly called.
    // The random API is only called if selected
function getRandom() {

    let test = Math.floor(Math.random() * 3);
    
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

        if (data[randomIndex].author) {
          $selectedAPI.text('"' + data[randomIndex].text + '"' + "  -" + data[randomIndex].author);
        } else {
          $selectedAPI.text('"' + data[randomIndex].text + '"' + "  -unknown");  
        }
  });

}

// Click event listener for Surprise Me Button
$('#surpriseBtn').click(function() {
    
  $("#homepage").hide();
  $("#renderedAPI").show();
  getRandom()

}); 

// Click event listener for "some knowledge" choice under "I need..."
$('#factBtn').click(function() {
  
  $("#homepage").hide();
  $("#renderedAPI").show();
  getRandomFact();

});

// Click event listener for "some laughter" choice under "I need..."
$('#dadBtn').click(function() {
  
  $("#homepage").hide();
  $("#renderedAPI").show();
  getDadJoke();

});

// Click event listener for "some inspiration" choice under "I need..."
$('#quoteBtn').click(function() {
  
  $("#homepage").hide();
  $("#renderedAPI").show();
  getQuote();

});

// Creating a function to store an array of generated 'pick-me-ups' to local storage
function storePickMeUp() {

  localStorage.setItem("pick-me-up", JSON.stringify(pickmeupArray));

}

// Submit event listener for user rating input form
$('#form-styling').submit(function(event) {
  
  event.preventDefault();

  let userRating = parseInt(event.currentTarget[0].value);

  if (userRating === 1 || userRating === 2 || userRating === 3 || userRating === 4 || userRating === 5) {
    
    let latestAPI = $('#selected-API').text();
    let userObject = {
      API: latestAPI,
      rating: userRating
    }

    pickmeupArray.unshift(userObject);
   
    storePickMeUp();
    location.reload();
  } else {
    $("#invalid-msg").show();
  }

  $('#user-rating').val("");

});

// Creating a function to render the saved 'pick-me-ups' to the page from local storage
function renderPickMeUps() {
  
  let storedPickMeUps = JSON.parse(localStorage.getItem("pick-me-up"));

  // If there are pick-me-ups saved to local storage, set the array of pick-me-ups to those
  if(storedPickMeUps) {
      
    pickmeupArray = storedPickMeUps;

    // Function to sort the array in descending order by user rating
    // Researched and consulted code from: https://www.sitepoint.com/sort-an-array-of-objects-in-javascript/
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
    
    pickmeupArray.sort(compare);
        
    // For each stored pick-me-up in local storage, render it to the page
    let numOfStars = "";

    for (let i=0; i < 5; i++) {
      if (pickmeupArray[i].rating === 1) {
        numOfStars = "☆";
      } else if (pickmeupArray[i].rating === 2) {
        numOfStars = "☆☆";
      } else if (pickmeupArray[i].rating === 3) {
        numOfStars = "☆☆☆";
      }  else if (pickmeupArray[i].rating === 4) {
        numOfStars = "☆☆☆☆";
      }  else {numOfStars = "☆☆☆☆☆";
      
      }

      let previousPickMeUp = $('<button>').html(pickmeupArray[i].API + '<br></br>' + numOfStars);
      $('#recent-results').append(previousPickMeUp);
      
      if (!pickmeupArray[i+1]) {
        break;
      }
    }
  }
}

// Show any saved pick-me-ups upon page load
renderPickMeUps();