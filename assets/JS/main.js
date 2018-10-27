$(document).ready(function() {

    var searchGifs = {
        searchTerms: ["football", "soccer", "hockey", "basketball", "skiing", "baseball", "tennis"],
        createButtons: function() {
            for (var i = 0; i < searchGifs.searchTerms.length; i++) {
                var newBttn = $("<button>");
                newBttn.attr("data-search", searchGifs.searchTerms[i]);
                newBttn.addClass("btn");
                newBttn.addClass("keyword-buttons");
                newBttn.text(searchGifs.searchTerms[i]);
                $("#keyword-btns-container").append(newBttn);
            }
        },

        addSearchTerms: function(e) {
          e.preventDefault();
          var userTerm = $("#submit-field").val();

          if (searchGifs.searchTerms.indexOf(userTerm) < 0 && userTerm.length > 0) {
              searchGifs.searchTerms.push(userTerm);
              var newBttn = $("<button>");
              newBttn.attr("data-search", userTerm);
              newBttn.addClass("btn");
              newBttn.addClass("keyword-buttons");
              newBttn.text(userTerm);
              $("#keyword-btns-container").append(newBttn);
          }
        },

        displayResults: function(e) {
            $("#display-Gifs").empty();
            e.preventDefault();

            var userQuery = $(this).data("search");
            var key = "&api_key=l9I77ZPQ1yLmDfN7H9QYQNbNW6KEBfkH";
            var limit = "&limit=10"
            var reqUrl = "https://api.giphy.com/v1/gifs/search?q=" + userQuery + limit + key;
            $.ajax({
                url: reqUrl,
                method: "GET"
            }).done(function(response) {
                for (var i = 0; i < response.data.length; i++) {
                    var gifContain = $("<div>");
                    gifContain.addClass("gif-container");
                    var animateLink = response.data[i].images["fixed_height"].url;
                    var stillLink = response.data[i].images["fixed_height_still"].url;
                    var rating = response.data[i].rating;
                    console.log(rating);
                    var ratingSpan = $("<p>");
                    ratingSpan.addClass("gif-rating");
                    ratingSpan.text("Rating: " + rating);
                    var newImg = $("<img>");
                    newImg.attr("src", stillLink);
                    newImg.attr("data-animate", animateLink);
                    newImg.attr("data-still", stillLink);
                    newImg.attr("data-state", "still")
                    newImg.addClass("gif");
                    gifContain.prepend(ratingSpan);
                    gifContain.append(newImg);

                    $("#display-Gifs").append(gifContain);
                }

                $(".gif").on("click", function() {
                    var state = $(this).attr("data-state");
                    if (state === "still") {
                        $(this).attr("src", $(this).data("animate"));
                        $(this).attr("data-state", "animate");
                    } else {
                        $(this).attr("src", $(this).data("still"));
                        $(this).attr("data-state", "still");
                    }
                });
            });
        },
    }

    searchGifs.createButtons();

    $("#submit-button").click(searchGifs.addSearchTerms);
    $(document).on("click", ".keyword-buttons", searchGifs.displayResults);
});