const teamNameEl = $('#team-name');
const gameContainerDiv = $('#game-container');
const fixturesContainerDiv = $('.fixtures-table');
const leagueTableContainer = $('.league-table');
const dateToday = moment().format('YYYY-MM-DD');

let teamID = '';

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
    getStandings();
});

function getStandings() {
    fetch("http://api.football-data.org/v2/competitions/2021/standings", {
        headers: {
            'X-Auth-Token': "d9a5e68af1764fc0acc74a34bc2ebb48"
        },
    })
        .then(function (response) {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(function (data) {

            console.log(data);

            //run a for loop on array length
            for (let i = 0; i < data.standings[0].table.length; i++) {

                //set teamID to teams id in array. 
                if (data.standings[0].table[i].team.name === userTeamName) {
                    teamID = data.standings[0].table[i].team.id;
                    getFixtures(teamID); 
                }

                //create a table row
                const tableRow = $('<tr>');
                //td with position
                const teamPos = $('<td>').text(data.standings[0].table[i].position);
                //td for team crest image
                const teamCrestContainer = $('<td>');
                //img with src of crest url
                const teamCrestImg = $('<img>').attr({src:data.standings[0].table[i].team.crestUrl, class:"team-crest-img"});
                //td with team name
                const teamName = $('<td>').text(data.standings[0].table[i].team.name).attr({class:"team-name"});
                //td with games won
                const teamWins = $('<td>').text(data.standings[0].table[i].won + " W").attr({class:"wins"});
                //td with games drawn
                const teamDraws = $('<td>').text(data.standings[0].table[i].draw + " D").attr({class:"draws"});
                //td with games lost
                const teamLosses = $('<td>').text(data.standings[0].table[i].lost + " L").attr({class:"losses"});
                //td with games played
                const teamPlayedGames = $('<td>').text(data.standings[0].table[i].playedGames);
                //td with goals for
                const teamGoalsFor = $('<td>').text(data.standings[0].table[i].goalsFor);
                //td goals against
                const teamGoalsAgainst = $('<td>').text(data.standings[0].table[i].goalsAgainst);
                //td goals diff
                const teamGoalsDiff = $('<td>').text(data.standings[0].table[i].goalDifference);
                //td team points
                const teamPoints = $('<td>').text(data.standings[0].table[i].points).attr({class:"points"});

                leagueTableContainer.append(
                        tableRow.append(
                            teamPos, 
                            teamCrestContainer.append(teamCrestImg),
                            teamName,
                            teamWins,
                            teamDraws,
                            teamLosses,
                            teamPlayedGames,
                            teamGoalsFor,
                            teamGoalsAgainst,
                            teamGoalsDiff,
                            teamPoints
                    )
                );
            }
        });
}

function getFixtures() {
    fetch(`http://api.football-data.org/v2/teams/${teamID}/matches?status=SCHEDULED&dateFROM=${dateToday}`, {
        headers: {
            'X-Auth-Token': "d9a5e68af1764fc0acc74a34bc2ebb48"
        },
    })
        .then(function (response) {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(function (data) {
            console.log(data);
            for (let i = 0; i < 3; i++) {
                const tableRow = $('<tr>');
                const competition = $('<td>').text(data.matches[i].competition.name);
                const homeTeam = $('<td>').text(data.matches[i].homeTeam.name);
                const vsEl = $('<td>').text(' vs ');
                const awayTeam = $('<td>').text(data.matches[i].awayTeam.name)

                fixturesContainerDiv.append(
                    tableRow.append(
                        competition,
                        homeTeam,
                        vsEl,
                        awayTeam
                    )
                );               
            }          
        });
};