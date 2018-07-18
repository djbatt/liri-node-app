var fs = require("fs");
var request = require("request");
var dotenv = require("dotenv").config();
var keys = require("./keys");
var Twitter = require("twitter");
var Spotify = require("node-spotify-api");
var argumentOne = process.argv[2];
var argumentTwo = process.argv.slice(3).join(" ");

// I should have written the functions with parameters set, and written the logic to run based off them
// If I did that I could compartmentalize the code and run any piece anywhere

switch(argumentOne) {
    case "movie-this":
    retrieveMovie();
    break;
    case "my-tweets":
    retrieveTweets();
    break;
    case "spotify-this-song":
    retrieveSong();
    break;
    case "do-what-it-says":
    runRandom();
    break;
    default: console.log("\n" + "These are the commands:\xa0" + "my-tweets, spotify-this-song, movie-this, do-what-it-says" + "\n" +
    "my-tweets can take any screen name, spotify-this-song can take any song, and movie-this can take any movie");
}

function retrieveTweets() {

    var twitter = new Twitter(keys.twitter);

    if (!argumentTwo) {
        argumentTwo = "tweetbot90011";
    }

    var parameters = { screen_name: argumentTwo, count: 20};

    twitter.get("statuses/user_timeline", parameters, function(err, data, res) {

        if (err) {
            console.log(err);
        } else {
            for (var i = 0; i < data.length; i++) {
                var loggedTweets = "\n" +
                "Date and Time Posted:\xa0" + data[i].created_at + "\n" +
                "Username:\xa0" + data[i].user.screen_name + "\n" +
                "Tweet:\xa0" + data[i].text + "\n"
                "Result Number:\xa0" + i + "\n";

                console.log(loggedTweets);
                logResults(loggedTweets);
            }
        }
    })
}

function retrieveSong() {
    var spotify = new Spotify(keys.spotify);

    if(!argumentTwo) {
        argumentTwo = "The Sign";
    }

    spotify.search({ type: "track", query: argumentTwo }, function(err, data) {
        if (err) {
            console.log("error occured:\xa0" + err);
            return;
        } else {
            var trackData = data.tracks.items[0];

            var loggedSong = "\n" +
            "Artist:\xa0" + trackData.artists[0].name + "\n" +
            "Song Name:\xa0" + trackData.name + "\n" +
            "Album Name:\xa0" + trackData.album.name + "\n" +
            "Preview URL:\xa0" + trackData.album.external_urls.spotify +"\n";

            console.log(loggedSong);
            logResults(loggedSong);
        }
    });
}

function retrieveMovie() {
    if (!argumentTwo) {
        argumentTwo = "Annihilation"
    }

    var omdbURL = "http://www.omdbapi.com/?t=" + argumentTwo + "&y=&plot=short&r=json&tomatoes=true&apikey=trilogy";

    
    request(omdbURL, function (error, response, body) {

        if (error) {
            console.log(error);
        } else {
            var movie = JSON.parse(body);
    
            var loggedMovie = "\n" +
            "Movie:\xa0" + movie.Title + "\n" +
            "Year Released:\xa0" + movie.Year + "\n" +
            "IMDB Rating:\xa0" + movie.Rating + "\n" +
            "Country:\xa0" + movie.Country + "\n" +
            "Language:\xa0" + movie.Language + "\n" +
            "Plot:\xa0" + movie.Plot + "\n" +
            "Actors:\xa0" + movie.Actors + "\n" +
            "Tomato Rating:\xa0" + movie.tomatoRating + "\n";

            console.log(loggedMovie);
            logResults(loggedMovie);
        }
    })
}

function runRandom() {
    fs.readFile("random.txt", "UTF-8", function(error, data) {
        if (error) {
            console.log(error);
        } else {
            retrieveSong();
        }
    })
}

function logResults(inputData) {
    fs.appendFile("log.txt", inputData, function(error) {
        if (error) {
            console.log(error);
        }
    });
}