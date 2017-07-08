//Arrow click animation to scroll down
$(".arrowLink").click(function() {
    $('html, body').animate({
        scrollTop: $("#searchWrapper").offset().top
    }, 500);
});

var ready=true;
var query_type="";

 // Initialize Firebase
  var config = {
    apiKey: "AIzaSyCSy-YzBDIZYaZuljHEhzrfMNZuVm_4MYM",
    authDomain: "newscafe-41768.firebaseapp.com",
    databaseURL: "https://newscafe-41768.firebaseio.com",
    projectId: "newscafe-41768",
    storageBucket: "newscafe-41768.appspot.com",
    messagingSenderId: "581139574984"
  };


  firebase.initializeApp(config);



 window.onload = function() {


    API_Call.NEWS_API_SOURCE_Call();
  
 
};


var database = firebase.database();

var allSources = ["wired-de", "usa-today", "time", "the-washington-post", "the-wall-street-journal", "the-verge", "the-telegraph", "the-new-york-times", "the-hindu", "the-guardian-uk", "the-guardian-au", "the-economist", "techradar", "reuters", "newsweek", "new-scientist", "national-geographic", "mtv-news-uk", "mtv-news", "mirror", "metro", "mashable", "independent", "ign", "hacker-news", "google-news", "fortune", "focus", "financial-times", "daily-mail", "cnn", "cnbc", "buzzfeed", "business-insider-uk", "business-insider", "breitbart-news", "bloomberg", "bild", "bbc-news", "associated-press", "ars-technica", "al-jazeera-english", "abc-news-au"];

$("#submit_verify").click(function(event){
 
 event.preventDefault();

 // database.ref().on("child_added", function(childSnapshot){

    entered_email = $("#email_id").val().trim();
   
    //lookup and verify username
       if(validateForm(entered_email)){
       
        database.ref().push({
        email: entered_email,

         });
        Send_Email(entered_email);
    
    }
    else {
            // alert("Name is required for comment.")
    }

    function validateForm(email) {


        var filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;

        if (!filter.test(email)) {
        alert('Please provide a valid email address');
        return false;
        }
        else{

            return true;
        }
    }

  
});


var API_Call = {


ProcessSourceAPI_CALL: function(response){   // Variable to store number of results

    var numberResults = 6;

    var randomNum=0;
    // Variable to hold data returned from API
    // Empty display div whenever new high level object is selected
   
    for (var i = 0; i < numberResults; i++) {

      var checkedSource="";
           
            randomNum = API_Call.generateRandomNumber();
            console.log("RANDOM NUMBER " + randomNum);
            // Grab source from API
            var articleSource = response.sources[randomNum].id;

            //Check if SourceLESS compliant

                console.log("SOURCE " + articleSource);

                checkedSource = API_Call.searchArray(articleSource, allSources);

                if( checkedSource != "" || "undefined"){

                    console.log("CHECKED SOURCE " + checkedSource);

                    API_Call.NEWS_API_Call(articleSource);

                }
          
    }

},

searchArray: function(articleSource, allSources){

    for (var i = 0; i < allSources.length; i++) {
        if (allSources[i] === articleSource) {
          return allSources[i];
        }
      }

},
generateRandomNumber: function(){

  
  var randomSource = Math.floor(Math.random() * 60);
 
  return randomSource;

},
DisplayArticle: function(response){   // Variable to store number of results

    event.preventDefault();

    // Variable to hold data returned from API
    var results = response.articles;

    console.log("DisplayArticle" + response.articles);

    var status = response.status;

    var articleTitle = results[0].title;

           
    // Grab description from API
    var descriptionTitle = results[0].description;
    // console.log(descriptionTitle);
            
    var image = results[0].urlToImage;
   
    var articleURL = results[0].url;
          
    $('#wrapper').append('<section id="categories text-center"><div class="container"><div class="row"><div class="col-md-12"><p id="title"><a class="articleLink" href="' + articleURL + '">' + articleTitle +  '</a></p><div id="articleImage"><img class="imageSize col-md-8 pull-left img-responsive" src="' + image + '" /><p class="description col-sm-4 pull-right">"' + descriptionTitle +'</p></div></div></div></div>');


},
NEWS_API_SOURCE_Call: function(){

query_type = "source";

// Create queryURL string

  // var article = $(this).attr("data-name");
  var queryURL = "https://newsapi.org/v1/sources?language=en&sortBy=top&apiKey=01aed6729dc84b87b67d8eca2e2a711b";


    API_Call.AJAX_CALL(queryURL, query_type);


},

NEWS_API_Call: function(selectedSource){

    query_type = "article";
   
// Create queryURL string

  var queryURL = "https://newsapi.org/v1/articles?source=" + selectedSource + "&apiKey=01aed6729dc84b87b67d8eca2e2a711b";

    API_Call.AJAX_CALL(queryURL, query_type);


},


AJAX_CALL: function(queryURL, query_type){

    ready=false; 

   $.ajax({
    url:queryURL,
    method: 'GET',
    }).done(function(response) {
    console.log(response); 
    
    ready=true; 

    // console.log(ready);
    // console.log(query_type);

    if(query_type === "source" && ready) {

        API_Call.ProcessSourceAPI_CALL(response);   
        
    }
    else if (query_type === "article" && ready){

        API_Call.DisplayArticle(response);
    }

    }); 

}


};

// Wikipedia Search ////////////////////////////////////////////////////////////////////////////////////////////////////////////////

var placeholderText = "What's your topic?";
   //Add placeholder text to search input.
   $('#searchInput').val(placeholderText);
   
   //When search input field is clicked and field contains placeholder text, 
   //clear search input field. N.B: .focus() doesn't work reliably here
   $('#searchInput').click(function() { 
      $('.pInvalidSearch').css("display", "none");
      $('.resultsWrapper').css("display", "none");
      $('ul').css("display", "none");
      if ($(this).val() == placeholderText) {
         $(this).val(" ");
      }
   });
   
   //When focus on search input field is off and input field is empty, add placeholder text and class of placeholder.
   $('#searchInput').blur(function() {
      if ($(this).val() == " ") {
         $(this).val(placeholderText);
      }
   });
   
   //On button click search topic
   $('#searchButton').click(function(e) { 
      $('ul').empty();
      $('.resultsWrapper').css("display", "none");
      
      var searchQuery = $('#searchInput').val();
      if(searchQuery === placeholderText) {
         $('.errMessage').html('<p class="pInvalidSearch">Please enter a topic to search.</p>');           
      } else { 
         getRequestedTopic(searchQuery);   
      }          
   });
   
   //On 'enter' key press trigger button click event to search topic
   $('#searchInput').keypress(function (e) {
      var key = e.which;
      if(key == 13) {        
         $('#searchButton').click();  
      };
   });
   
   //On click of "random article" link, get random article
   $('#randomArticle').click(function() {
      $('ul').empty();
      $('.pInvalidSearch').css("display", "none");
      $('.resultsWrapper').css("display", "none");
      getRandomTopic();
   });

   function Send_Email (emailAddr){

      Email.send("sourceless7@gmail.com",
      "tctangney@gmail.com",
      "Articles",
      "Welcome to Sourceless! \n\n      Sourceless is a news-aggregation app that allows users to see trending topics and articles from around the world (top 10 stories/events), without users being able to bias towards a particular source BEFORE reading an article.\n\nCheers from your unbiased developers,\n\nDouglas Balkin\nTamara Tangney\nAlex Carver\nKatie McCarthy (PULL MASTER)\n\n\n\nSourceLESS.com",
      "smtp.gmail.com",
      "sourceless7@gmail.com",
      "7Sourceless");

}
   
   function getRequestedTopic(queryTopic) {
      var wikiSearchUrl = "https://en.wikipedia.org/w/api.php?action=query&gsrsearch="+queryTopic+    "&generator=search&gsrnamespace=0&prop=extracts&exintro&explaintext&exsentences=2&exlimit=max&gsrlimit=10&format=json&callback=?";
      $.getJSON(wikiSearchUrl, function(jsonObj) { 
         var json = jsonObj.query.pages;
         //jsonObj.hasOwnProperty("query")-- doesn't work          
         if(jsonObj.hasOwnProperty("continue")) { 
            displayResults(json);
         } else {    
             //alert(queryTopic);
            $('.errMessage').html('<p class="pInvalidSearch">Sorry, your search was invalid. No results found.</p>');
            $('#searchInput').val(placeholderText);
         }    
      }); 
   } 
   
   function getRandomTopic() {
      var wikiRandomUrl = "http://en.wikipedia.org/w/api.php?action=query&generator=random&prop=extracts&explaintext&exsentences=3&grnnamespace=0&format=json&callback=?";  
      
      $.getJSON(wikiRandomUrl, function(jsonObj) {         
         var json = jsonObj.query.pages;
         displayResults(json);
     });
   }
   
   function displayResults(json) {
      //Clear previous search input
      $('#searchInput').val(placeholderText);   
   
      var items = [];   
      $.each(json, function(key, val) {
         //Check for missing and invalid titles, which have unique, negative ids. 
         //Missing and invalid titles still appear in results.
         if (val.pageid < 0) {           
            return 'continue';  
         } 
         items.push('<li><h1 class="wikiTitle"><a href="http://en.wikipedia.org/?curid=' + val.pageid + '" class="resultUrl" target="_blank">' + val.title + '</a></h1><p class="extract">' + val.extract + '</p></li>');
      }); 
      
      //Create ul containing joined array of li items. Append to results div.
      $('<ul/>', {  
         'class': 'resultsList',
          html: items.join("")     
      }).appendTo($('#results'));
      
      $('.resultsWrapper').css("display", "block");
   }
    
   $('.closeIcon').click(function() {
      $('.resultsWrapper').css("display", "none");
   });



