const teamNameEl = $('#team-name');
const gameContainerDiv = $('#game-container');

let userTeamName = localStorage.getItem('team'); //need to edit team name by dropping FC off the end. 
let teamName = userTeamName.replace(" FC", "");

console.log(teamName);
teamNameEl.text(teamName + "'s Recent Games.");

//get team name from local storage
//display it as the title of the page

function getHighlights() {
    fetch("https://www.scorebat.com/video-api/v3/")
        .then(function (response) {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(function (data) {
            console.log(data);
            console.log(data.response[0].title);
            console.log(data.response[0].matchviewUrl);
            
            //search data for teamName
            for (let i = 0; i < data.response.length; i++) {
                if (data.response[i].title.includes(teamName)) {

                    //create a div
                    const gameDiv = $('<div>');
                    //create a h3 with text(title)
                    const gameTitle = $('<h3>').text(data.response[i].title);
                    //create a ul
                    const gameTitleList = $('<ul>');
                    //create a li
                    const gameTitleItem = $('<li>');
                    //create a button with text(highlights) and href matchviewURL
                    const gameTitleItemBtn = $('<a>').text("highlights").attr('href', data.response[i].matchviewUrl);

                    gameContainerDiv.append(
                        gameDiv.append(
                            gameTitle.append(
                                gameTitleList.append(
                                    gameTitleItem,
                                        gameTitleItemBtn)
                            )
                        )
                    );
                }                 
            }

            }
        );
}

$(document).ready(function(){
    getHighlights();
});