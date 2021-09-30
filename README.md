an app that allows the user to search for a football team and watch highlights of recent games. 



USER STORY: 

AS A football fan

I WANT to see highlights from games played recently for different teams

SO THAT I can keep up to date with games played in other countries. 




ACCEPTANCE CRITERIA:

GIVEN a dashboard with clickable 'league' buttons

WHEN I click on a button

THEN I am presented with a table from that league

WHEN I click on a team in the table

THEN I am given recent games played by that team, as well as an option to see future fixtures

WHEN I click on a recent game

THEN I am taken to a highlights video for that game, and the other games are displayed on the side of the screen

WHEN I click, on another game

THEN I am taken to the corresponding highlights video for that game



WHEN PAGE LOADS, PROMTED FOR USER NAME AND FAVORITE TEAM. 

THEN users favourite team and league will be pushed to the top. 

OPTION to skip this and have a default view load. 

PSUEDO CODE: 

HTML FILES - landing page with form, display dash with games and results, video page, stats page

CSS - FRAMEWORK - font awesome, google fonts

JS - jquery, 

API - football (soccer) videos, football standings, football-data

LOCAL STORAGE - will store users favourite teams, leagues and players. 


MVP - 

user chooses team - stored in local storage

understanding the limits of the API 

make somrething small that work and then continue




fetch("https://api.football-data.org/v2/competitions/6672/teams", {
    headers: {
        'X-Auth-Token': "d9a5e68af1764fc0acc74a34bc2ebb48"
    },
})
.then(function(response) {
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  return response.json();
})
.then(function(data) {
  // DO THINGS WITH TEH DATA
});

