
  $("#category-switch").click(function(){
  $('.flip').find(".card").toggleClass("flipped");
  return false;
});

var name = "";
var email = "";
var username="";
var password="";
var comment="";

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

    database.ref().on("child_added", function(childSnapshot){

        $("#table_id").append("<thead><tr><th>" + childSnapshot.val().username + "</th><th>" + childSnapshot.val().comment + "</th><th></thead>");

         });

    API_Call.NEWS_API_SOURCE_Call();

    // API_Call.Blog_API_Call();
 
};


var database = firebase.database();

/*
$("#sign_up_submit").click(function(){
 
 event.preventDefault();

  
  username = $("#InputUsername").val().trim();
  email = $("#InputEmail").val().trim();

    if(username != ""){
      //code for handling the push
      database.ref().push({
        username: username,
        email: email,
    });
  }

});
*/
$("#submit_verify").click(function(){
 
 event.preventDefault();

 // database.ref().on("child_added", function(childSnapshot){

    entered_username = $("#username_id").val().trim();
    entered_comment = $("#comment_id").val().trim();
   
    //lookup and verify username
    if(entered_username !== ""){
      
        database.ref().push({
        username: entered_username,
        comment: entered_comment

         });

        $("#userForm").trigger("reset");
        // document.getElementById("userForm").reset();
    
    }
    else {
            alert("Name is required for comment.")
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

NEWS_API_Call: function(selectedSource){

    query_type = "article";
   
// Create queryURL string

  // var article = $(this).attr("data-name");
  var queryURL = "https://newsapi.org/v1/articles?source=" + selectedSource + "&apiKey=01aed6729dc84b87b67d8eca2e2a711b";

    // console.log("IN NEWS_API_Call " + queryURL);
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