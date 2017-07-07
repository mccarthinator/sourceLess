
//Arrow click animation to scroll down
$(".arrowLink").click(function() {
    $('html, body').animate({
        scrollTop: $("#wrapper").offset().top
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

    // API_Call.Blog_API_Call();
 
};


var database = firebase.database();


$("#submit_verify").click(function(){
 
 event.preventDefault();

 // database.ref().on("child_added", function(childSnapshot){

    entered_email = $("#email_id").val().trim();
    entered_username = $("#username_id").val().trim();
   
    //lookup and verify username
       if(validateForm(entered_email)){
       
        database.ref().push({
        email: entered_email,
        username: entered_username

         });

        $("#userForm").trigger("reset");
        // document.getElementById("userForm").reset();
    
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
    // Variable to hold data returned from API
    // Empty display div whenever new high level object is selected
   
    for (var i = 0; i < numberResults; i++) {
           
            // Grab source from API
            var articleSource = response.sources[i].id;
            // console.log("SOURCE " + articleSource);

            API_Call.NEWS_API_Call(articleSource);
          
    }

},
DisplayArticle: function(response){   // Variable to store number of results

    event.preventDefault();

    // Variable to hold data returned from API
    var results = response.articles;

    var status = response.status;

    // console.log(results);
    // Empty display div whenever new high level object is selected
    // $("#display-articles").empty();
    // forLoop to iterate through functions 10 times
    // for (var i = 0; i < numberResults; i++) {
            // Create div to store generated news articles
            var displayedArticles = $("<div>");
            // Grab title from API
            var articleTitle = results[0].title;
           
            // Grab description from API
            var descriptionTitle = results[0].description;
            // console.log(descriptionTitle);

            //IMAGE Display
            
            var image = results[0].urlToImage;
         
                
            // Saving the image_original_url property
            // Creating and storing an image tag
            var articleImage = $("<img>");
            articleImage.attr("src", image);
            // articleImage.attr("class", "gif");    
            displayedArticles.append(articleImage);


            //URL Display
            var articleURL = results[0].url;
            var articleLink = $("<a>");
            articleLink.attr('href', articleURL);
            // console.log(articleURL);
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
    // }

},
NEWS_API_SOURCE_Call: function(){

query_type = "source";

// Create queryURL string

  // var article = $(this).attr("data-name");
  var queryURL = "https://newsapi.org/v1/sources?language=en&sortBy=top&apiKey=01aed6729dc84b87b67d8eca2e2a711b";


    API_Call.AJAX_CALL(queryURL, query_type);


},


Blog_API_Call: function(){

    var numBlogs=3;

    query_type = "blog";

    // Create queryURL string

    for(var i=0; i<numBlogs; i++){

        queryURL = get_query_String_Obj(i);
       
        API_Call.AJAX_CALL(queryURL, query_type);
    }

    function get_query_String_Obj(i){

        var blogID_Object = [
        {
            blogID: "2901137004552085952",
        },
        {
            blogID: "16285355",  
        },
        {
            blogID: "16218104",  
        }

        ];

        var queryBlogID = blogID_Object[i].blogID;

        var queryURL_First_Half="";
        var queryURLInit="";
        var queryURL="";

        var queryURL = build_query_String();

        function build_query_String(){

            console.log("BlogID " + queryBlogID);

            var queryURL_First_Half = "https://www.googleapis.com/blogger/v3/blogs/";

            var API_Key = "/posts/search?q=news&key=AIzaSyDx1Hh01YdAJCDq5pnuCDtm0O4v73CLDMg"

            queryURLInit = queryURL_First_Half + queryBlogID + API_Key;

            var queryURL = queryURLInit.replace("news", "current events");

            console.log("QUERY URL " + queryURL);
            return queryURL;

        }
        return queryURL;
    }
                       
},
DisplayBlog: function(response){

    event.preventDefault();

    var numberResults = 3;
                        
    for (var i = 0; i < numberResults; i++) {

        var displayedArticles = $("<div>");
        // Grab title from API
        var blogTitle = response.items[i].title;
        console.log(blogTitle);
        // Grab description from API
        var blogContent = response.items[i].content;
        // console.log(blogContent);      
                    
        // Paragraph to store article title
        var pOne = $("<p>").text(blogTitle);
        // Paragraph to store description of article
                 
        displayedArticles.append(pOne);
        // displayedArticles.append(pTwo);
                  
        // Append to display-articles div
        $("#display-articles").append(displayedArticles);
        $("#blog-data").append(blogContent);
    }
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

    if(query_type === "blog" && ready){

    API_Call.DisplayBlog(response);

    } 
    if(query_type === "source" && ready) {

        API_Call.ProcessSourceAPI_CALL(response);   
        
    }
    else if (query_type === "article" && ready){


        API_Call.DisplayArticle(response);
    }

    }); 
},

};


//Api on load displays ten articles
window.onload = function() {

  API_Call.displayTenArticles();
 
};

  //Call to Api
  var API_Call = {

generateRandomSource: function(){

  // Array to store all external news sources from news API
  var allSources = ["abc-news-au", "al-jazeera-english","bbc-news", "bloomberg", "cnbc", "cnn", "google-news", "breitbart-news", "daily-mail", "reuters", "the-new-york-times", "the-wall-street-journal", "time", "the-washington-post"];
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

//Function to grab JSON data and return it
parse_Ajax_JSON: function(response){  

 // Variable to store number of results
  var numberResults = 10;
  // Variable to hold data returned from API
  var results = response.articles;
  // For loop to iterate through the json dara and Append them to #Wrapper
for (var i = 0; i < results.length; i++) {
  var currentObj = results[i];
    $('#wrapper').append('<section id="categories text-center"><div class="container"><div class="row"><div class="col-md-12"><p id="title"><a class="articleLink" href="#">' + currentObj.title +  '</a></p><div id="articleImage"><img class="imageSize col-md-8 pull-left img-responsive" src="' + currentObj.urlToImage + '" /><p class="description col-sm-4 pull-right">"' + currentObj.description +'</p></div></div></div></div>');
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
