

window.onload = function() {

  API_Call.displayTenArticles();
 
};

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

displayTenArticles: function(){

selectedSource = API_Call.generateRandomSource();
  
// API_Call.NYT_API_Call(selectedSource);

API_Call.NEWS_API_Call(selectedSource); 

},

parse_Ajax_JSON: function(response){   // Variable to store number of results

    var numberResults = 10;
    // Variable to hold data returned from API
    var results = response.articles;
    console.log(results);
    // Empty display div whenever new high level object is selected
    $("#display-articles").empty();
    // forLoop to iterate through functions 10 times
    for (var i = 0; i < numberResults; i++) {
            // Create div to store generated news articles
            var displayedArticles = $("<div>");
            // Grab title from API
            var articleTitle = results[i].title;
            console.log(articleTitle);
            // Grab description from API
            var descriptionTitle = results[i].description;
            console.log(descriptionTitle);

            //IMAGE Display
            
            var image = results[i].urlToImage;
            console.log(image);
                
            // Saving the image_original_url property
            // var imageDiv = $("<div>");
            // var displayedArticles = $("<div>");
            // Creating and storing an image tag
            var articleImage = $("<img>");
            articleImage.attr("src", image);
            // articleImage.attr("class", "gif");    
            displayedArticles.append(articleImage);

            // $("#display-articles").prepend(imageDiv);

            //URL Display
            var articleURL = results[i].url;
            var articleLink = $("<a>");
            articleLink.attr('href', articleURL);
            console.log(articleURL);
            var pThree = articleLink.html(articleURL);
                    
            
            // Paragraph to store article title
            var pOne = $("<p>").text("Article Title: " + articleTitle);
            // Paragraph to store description of article
            var pTwo = $("<p>").text("Article Descriptoin" + descriptionTitle);
            // Append to displayedArticles div
            // descriptionTitle.append(pTwo);
            displayedArticles.append(pOne);
            displayedArticles.append(pTwo);
            displayedArticles.append(pThree);
            // Append to display-articles div
            $("#display-articles").append(displayedArticles);
                // $("#display-articles").append(descriptionTitle);
    }

},

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

Blog_API_Call: function(selectedSource){

    // var article = $(this).attr("data-name");
/*
  var queryURL = "https://www.googleapis.com/blogger/v3/blogs/blogId/posts/search?q=query" +  selectedSource;
  // ajax call to news API
  $.ajax({
    url:queryURL,
    method: 'GET',
  }).done(function handleResponse(selectedSource) {
    console.log(response);

    document.getElementById("content").innerHTML += "<h1>" + response.title + "</h1>" + response.content;


  }
  
  });
        
   */     
         

},

};


