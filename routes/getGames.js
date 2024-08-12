// routes/users.js
const express = require('express');
const router = express.Router();

// Define a route
router.get('/:conferenceAbbreviation', (req, res) => {
    var cfb = require('cfb.js');
    var defaultClient = cfb.ApiClient.instance;
    const params = req.params;

    // Configure API key authorization: ApiKeyAuth
    var ApiKeyAuth = defaultClient.authentications['ApiKeyAuth'];
    ApiKeyAuth.apiKey = "Bearer uUROuvdrdvQZVcrWw7i4V9/p3QfWJFiZYPLDDG5VpJ3+PWikQi+Y9uBOWNMYyQcS";
    
    var apiInstance = new cfb.GamesApi();
    
    var year = 2024; // Number | Year/season filter for games
    
    var opts = { 
        'week': 1,
        'conference' : params.conferenceAbbreviation
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

router.get('/101', (req, res) => {
    res.send('this is user 101 route');// this gets executed when user visit http://localhost:3000/user/101
});

router.get('/102', (req, res) => {
    res.send('this is user 102 route');// this gets executed when user visit http://localhost:3000/user/102
});

// export the router module so that server.js file can use it
module.exports = router;