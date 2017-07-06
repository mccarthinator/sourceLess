$(document).ready(function() {

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
         items.push('<li><h1><a href="http://en.wikipedia.org/?curid=' + val.pageid + '" class="resultUrl" target="_blank">' + val.title + '</a></h1><p class="extract">' + val.extract + '</p></li>');
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
}); //end document.ready()

/*NOTES:
   N.B. &callback=? (doesn't work w/JSON formatter)
   REF: https://www.mediawiki.org/wiki/API:Search
   gsrsearch = search topic (user input)
   generator = search (get list of articles)
   prop=extracts (article description)      
   exintro&explaintext&exsentences=1 (extract intro, text, sentences)
   exlimit=max (extract limit)    
   &inprop=url (output full url of article)
   Test on browser: https://en.wikipedia.org/w/api.php?action=query&gsrsearch=ancient%20rome &generator=search&gsrnamespace=0&prop=extracts&exintro&explaintext&exsentences=2&exlimit=max&gsrlimit=10&format=json
   //Above parameters don't include article url. Create link to article: 
   <a href="http://en.wikipedia.org/?curid=' 
             + jsonObj.pageid + '" target="__blank" class="output">
 */