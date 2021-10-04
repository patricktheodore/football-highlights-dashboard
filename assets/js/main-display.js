const gameContainerDiv = $('#game-container');
const fixturesContainerDiv = $('.fixtures-table-head');
const leagueTableContainer = $('.league-table');
const dateToday = moment().format('YYYY-MM-DD');

let userTeamName = localStorage.getItem('team'); //need to edit team name by dropping FC off the end. 
let teamName = userTeamName.replace(" FC", "");

//get team name from local storage
//display it as the title of the page

function getHighlightVideo(videos) {
    return videos.filter(function (video) {
        return video.title.toLowerCase() === 'highlights';
    })
}



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

            //search data for teamName
            for (let i = 0; i < data.response.length; i++) {
                if (data.response[i].title.includes(teamName)) {

                    //create a div
                    const gameDiv = $('<div>');
                    //create a h3 with text(title)
                    const gameTitle = $('<h3>').text(data.response[i].title);
                    //create a ul
                    const gameTitleList = $('<div>');
                    //create a li
                    const gameTitleItem = $('<div>');
                    //create a button with text(highlights) and href matchviewURL

                    gameContainerDiv.append(
                        gameDiv.append(
                            gameTitle.append(
                                gameTitleList.append(
                                    gameTitleItem)
                            )
                        )
                    );

                    const highlightVideos = getHighlightVideo(data.response[i].videos);
                     
                    const videoContainer = document.createElement('div');
                    videoContainer.setAttribute('style', 'width: 400px');
                    videoContainer.innerHTML = highlightVideos[0].embed;
                    gameTitleList.append(videoContainer);
                    
                }
            }
        }
        );
}

$(document).ready(function () {
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
                    const teamID = data.standings[0].table[i].team.id;
                    getFixtures(teamID);
                }

                //create a table row
                const tableRow = $('<tr>');
                //td with position
                const teamPos = $('<td>').text(data.standings[0].table[i].position).attr({ class: "league-pos" });
                //td for team crest image
                const teamCrestContainer = $('<td>').attr({ class: "league-icon" });
                //img with src of crest url
                const teamCrestImg = $('<img>').attr({ src: data.standings[0].table[i].team.crestUrl, class: "team-crest-img" });
                //td with team name
                const teamName = $('<td>').text(data.standings[0].table[i].team.name).attr({ class: "team-name" });
                //span with team form
                const teamForm = $('<span>').attr({ class: "teamForm" });
                //p with games won
                const teamWins = $('<span>').text(data.standings[0].table[i].won).attr({ class: "wins" });
                //td with games drawn
                const teamDraws = $('<span>').text(data.standings[0].table[i].draw).attr({ class: "draws" });
                //td with games lost
                const teamLosses = $('<span>').text(data.standings[0].table[i].lost).attr({ class: "losses" });
                //td with games played
                const teamPlayedGames = $('<td>').text(data.standings[0].table[i].playedGames);
                //td goals diff
                const teamGoalsDiff = $('<td>').text(data.standings[0].table[i].goalDifference);
                //td team points
                const teamPoints = $('<td>').text(data.standings[0].table[i].points).attr({ class: "points" });

                leagueTableContainer.append(
                    tableRow.append(
                        teamPos,
                        teamCrestContainer.append(teamCrestImg),
                        teamName.append(teamForm.append(
                            teamWins,
                            teamDraws,
                            teamLosses)),
                        teamPlayedGames,
                        teamGoalsDiff,
                        teamPoints
                    )
                );
            }
        });
}

function getTeamLogo(teamID) {
    return fetch(`http://api.football-data.org/v2/teams/${teamID}`, {
        headers: {
            'X-Auth-Token': "d9a5e68af1764fc0acc74a34bc2ebb48"
        },
    })
        .then((response) => response.json())
        .then(function (result) {
            return result.crestUrl
        })
}

function createHomeTeam(name, icon) {
    const iconImg = $("<img>")
    iconImg.attr({ src: icon, class: "team-crest-img" })
    const teamHome = $('<td>').text(name);
    teamHome.append(iconImg)
    return teamHome
}

function createAwayTeam(name, icon) {
    const iconImg = $("<img>")
    iconImg.attr({ src: icon, class: "team-crest-img" })
    const teamAway = $('<td>').text(name);
    teamAway.prepend(iconImg)
    return teamAway
}

function getFixtures(teamID) {
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
        .then(async function (data) {
            console.log(data);
            for (let i = 0; i < 3; i++) {
                const match = data.matches[i]
                const tableRow = $('<tr>');
                const competition = $('<td>').text(match.competition.name).attr({class:"competition-tag"});
                const homeTeamIcon = await getTeamLogo(match.homeTeam.id);
                const awayTeamIcon = await getTeamLogo(match.awayTeam.id);

                const homeTeam = createHomeTeam(match.homeTeam.name, homeTeamIcon).attr({class:"home-team-tag"});
                const awayTeam = createAwayTeam(match.awayTeam.name, awayTeamIcon).attr({class:"away-team-tag"});

                const vsEl = $('<td>').text(' vs ');

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