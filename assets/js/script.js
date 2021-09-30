const teamSelect = $('#team-select'); 
const teamSelectBtn = $('#team-select-btn');

let selectedTeam;

function getTeams() {
    fetch("http://api.football-data.org/v2/competitions/2021/teams", {
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

            for (let i = 0; i < data.teams.length; i++) {
                const teamName = $('<option>').attr('value', data.teams[i].name).text(data.teams[i].name)

                teamSelect.append(teamName);
                
            }
        });
}

$(document).ready(function(){
    getTeams();

    teamSelect.change(function(){
        selectedTeam = $(this).children("option:selected").val();
        console.log(selectedTeam);
    });
});

teamSelectBtn.on('click', function(event) {
    event.preventDefault();
    if (selectedTeam === "") {
        alert("please select a team")//insert foundation modal
    } else { 
        localStorage.setItem('team', selectedTeam);
        document.location = "file:///Users/patricksara/Desktop/BootCamp/football-highlights-dashboard/assets/html/main-display.html"
    }
});






//$(window).on('load', getTeams);




//add listener to change 

//take the value of the option and save it to local storage when button is pressed. 