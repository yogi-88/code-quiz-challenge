function printHighscores() {
    //either get scores from localstorage or set to empty array
    var highScores = JSON.parse(window.localStorage.getItem("highScores")) || [];

    // sort highScores by score property in descending order
    highScores.sort(function(a,b) {
        return b.score - a.score;
    });

    highScores.forEach(function(score) {
        // create li tag for each high score
        var liTag = document.createElement("li");
        liTag.textContent = score.initials + " - " + score.score;

        //display on page
        var olEL = document.getElementById("highScores");
        olEL.appendChild(liTag);

    });
}

function clearHighScore () {
    window.localStorage.removeItem("highScores");
    window.location.reload();
}

document.getElementById("clear").onclick = clearHighScore;

//run function when page loads
printHighscores();