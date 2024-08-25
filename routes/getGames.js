// routes/users.js
const express = require('express');
const router = express.Router();

// Define a route
router.post('/', (req, res) => {
    var cfb = require('cfb.js');
    var defaultClient = cfb.ApiClient.instance;
    const { week, conference } = req.body;
    // Configure API key authorization: ApiKeyAuth
    var ApiKeyAuth = defaultClient.authentications['ApiKeyAuth'];
    ApiKeyAuth.apiKey = "Bearer uUROuvdrdvQZVcrWw7i4V9/p3QfWJFiZYPLDDG5VpJ3+PWikQi+Y9uBOWNMYyQcS";
    
    var apiInstance = new cfb.GamesApi();
    
    var year = 2024; // Number | Year/season filter for games
    
    var opts = { 
        'week': week,
        'conference' : conference
      };
    apiInstance.getGames(year, opts).then(function(data) {
        const homeTeams = [];
        const awayTeams = [];
        const teamMatchups = [];
        for(var i = 0; i < data.length; i++){
            homeTeams[i] = data[i].homeTeam;
            awayTeams[i] = data[i].awayTeam;
            teamMatchups[i] = data[i].homeTeam + ' vs. ' + data[i].awayTeam;
        }
        const teamMatchupsString = teamMatchups.toString();
        res.send(data);
        return data;
    }, function(error) {
      console.error(error);
    });
});

// export the router module so that server.js file can use it
module.exports = router;