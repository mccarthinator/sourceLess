function generateRandomSource() {
    // Array to store all external news sources from news API
    var allSources = ["abc-news-au", "al-jazeera-english", "bbc-news", "bloomberg", "cnbc", "cnn", "google-news", "breitbart-news", "daily-mail", "reuters", "the-guardian-uk", "the-new-york-times", "the-wall-street-journal", "time", "the-washington-post"];
    console.log(allSources);
    // Var to store randomly generated number based off of length of allSources API
    var randomSource = Math.floor(Math.random() * allSources.length);
    console.log(randomSource);
    // Selected newsource generated on onload
    var selectedSource = allSources[randomSource];
    console.log(selectedSource);

    return selectedSource;
}

// Function to select random news source
function displayTenArticles() {

    selectedSource = generateRandomSource();

    var article = $(this).attr("data-name");
    var queryURL = "https://newsapi.org/v1/articles?source=" + selectedSource + "&sortBy=top&apiKey=01aed6729dc84b87b67d8eca2e2a711b"
        // ajax call to news API
    $.ajax({
        url: queryURL,
        method: 'GET',
    }).done(function(response) {
        console.log(response);

        // Variable to store number of results
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

            /////////////////IMAGE DISPLAY///////////
            var image = results[i].urlToImage;
            console.log(image);

            // Saving the image_original_url property
            var articleDiv = $("<div>");
            // Creating and storing an image tag
            var articleImage = $("<img>");
            articleImage.attr("src", image);
            // articleImage.attr("class", "gif");    
            articleDiv.append(articleImage);
            
            /////////////////////////END OF IMAGE DISPLAY//////////////

            /////////////////URL DISPLAY///////////

            var articleURL = results[i].url;
            var articleLink = $("<a>");
            articleLink.attr('href', articleURL);
            console.log(articleURL);
            var pThree = articleLink.html(articleURL);

            /////////////////////////END OF URL DISPLAY//////////////


            // Paragraph to store article title
            var pOne = $("<p>").text("Article Title: " + articleTitle);
            // Paragraph to store description of article
            var pTwo = $("<p>").text("Article Description: " + descriptionTitle);
            // Append to displayedArticles div
            // descriptionTitle.append(pTwo);
            displayedArticles.append(pOne);
            displayedArticles.append(pTwo);
            displayedArticles.append(pThree);
            displayedArticles.prepend(articleDiv);
            // Append to display-articles div
            $("#display-articles").append(displayedArticles);
            
        }
    });
}

    // TESTING AREA////////////////////////////////////////////

$( window ).on('load', function() {

   displayTenArticles();

});



