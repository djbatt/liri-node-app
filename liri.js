var fs = require("fs");
var request = require("request");
var dotenv = require("dotenv").config();
var keys = require("./keys");
var twitter = require("twitter");
var spotify = require("node-spotify-api");
var argumentOne = process.argv[2];
var argumentTwo = process.argv[3];

switch(argumentOne) {
    case "movie-this":
    retrieveMovie();
    break;
}

function retrieveMovie() {
    if (!argumentTwo) {
        argumentTwo = "Annihilation"
    }

    var omdbURL = "http://www.omdbapi.com/?t=" + argumentTwo + "&y=&plot=short&r=json&tomatoes=true&apikey=trilogy";

    console.log(omdbURL);

    
    request(omdbURL, function (error, response, body) {

        if (error) {
            console.log(error);
        } else {
            var movie = JSON.parse(body);
            console.log(movie);
    
            var loggedMovie = "\n" +
            "Movie:\xa0" + movie.Title + "\n" +
            "Year Released:\xa0" + movie.Year + "\n" +
            "IMDB Rating:\xa0" + movie.Rating + "\n" +
            "Country:\xa0" + movie.Country + "\n" +
            "Language:\xa0" + movie.Language + "\n" +
            "Plot:\xa0" + movie.Plot + "\n" +
            "Actors:\xa0" + movie.Actors + "\n" +
            "Tomato Rating:\xa0" + movie.tomatoRating + "\n" +
            "Tomato URL:\xa0" + movie.tomatoURL + "\n";

            console.log(loggedMovie);
            logResults(loggedMovie);
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