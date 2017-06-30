  
//Button on click function taken out for now
  //$(".btn").click(function(){
  //$('.flip').find(".card").toggleClass("flipped");
  //return false;
//});


//Api on load displays ten articles
window.onload = function() {

  API_Call.displayTenArticles();
 
};

  //Call to Api
  var API_Call = {

generateRandomSource: function(){

  // Array to store all external news sources from news API
  var allSources = ["abc-news-au", "al-jazeera-english","bbc-news", "bloomberg", "cnbc", "cnn", "google-news", "breitbart-news", "daily-mail", "reuters", "the-guardian-uk", "the-new-york-times", "the-wall-street-journal", "time", "the-washington-post"];
  // Var to store randomly generated number based off of length of allSources API
  var randomSource = Math.floor(Math.random() * allSources.length);
  // Selected newsource generated on onload
  var selectedSource = allSources[randomSource];
  // Function to select random news source
// Function to generate 10 images to DOM

return selectedSource;

},

//Function that displays 10 articles
displayTenArticles: function(){

selectedSource = API_Call.generateRandomSource();
  
// API_Call.NYT_API_Call(selectedSource);

API_Call.NEWS_API_Call(selectedSource); 

},

parse_Ajax_JSON: function(response){   

// Variable to store number of results
  var numberResults = 10;
  // Variable to hold data returned from API
  var results = response.articles;
  var results_length = results.length;
  // For loop to iterate through the json dara and Append them to #Wrapper
for (var i = 0; i < results.length; i++) {
  var currentObj = results[i];
    $('#wrapper').append('<section id="categories text-center"><div "class="container"><div class="row"><p id="title"><a href="article.html">' + currentObj.title + '</a></p><div id="articleImage"><img class="imageSize col-md-8 pull-left" src="' + currentObj.urlToImage + '" /><p class="description col-md-4 ">"' + currentObj.description +'</p></div></div></div>');
  }
},

//Api call to get data 
NEWS_API_Call: function(){

  var article = $(this).attr("data-name");
  var queryURL = "https://newsapi.org/v1/articles?source=" + selectedSource + "&sortBy=top&apiKey=01aed6729dc84b87b67d8eca2e2a711b"
  // ajax call to news API
  $.ajax({
    url:queryURL,
    method: 'GET',
  }).done(function(response) {
    console.log(response);

    API_Call.parse_Ajax_JSON(response);
  
  });

},

};



