// Random Facts fetch and rendering to page
let $randomFact = $('#random-fact')

fetch("https://uselessfacts.jsph.pl/random.json?language=en")
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
        $randomFact.text(data.text)
  });

  // Dad jokes fetch and rendering to page
  let $dadJoke = $('#dad-joke');

  fetch("https://icanhazdadjoke.com/", {
  headers: {
    Accept: "application/json"
  }
})
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    $dadJoke.text(data.joke);
  });

// Inspiring quote fetch and rendering to page
let $quote = $('#quote');

fetch('https://type.fit/api/quotes')
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
        // console.log(data);
        let randomIndex = Math.floor(Math.random()*data.length)
        // console.log(randomIndex);
        $quote.text('"' + data[randomIndex].text + '"' + "  -" + data[randomIndex].author);
  });