const teamSelect = $('#team-select'); 



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
        // DO THINGS WITH TEH DATA
        console.log(data);
        console.log(data.teams[0].name);

    });

    //create for loop, to print team names to select menu. 