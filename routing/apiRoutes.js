
var friendsData = require("../app/data/friends");


module.exports = function(app) {

app.get("/api/friends", function(req, res) {
    return res.json(friendsData);
  });

app.post("/api/friends", function(req, res) {
   
   var bestMatch = {
    name: "",
    photo: "",
    friendDifference: 1000
    };


    var userData = req.body;
    var userScores = userData.scores;

    var userName = userData.name;
    var userPhoto = userData.photo;

    var totalDifference = 0;


    for (var i = 0; i < friendsData.length; i++) {
        
        totalDifference = 0;


        for (var j = 0; j < 10; j++) {
        
            totalDifference += Math.abs(parseInt(userScores[j]) - parseInt(friendsData[i].scores[j]));
    
            if (totalDifference <= bestMatch.friendDifference) {

    
                bestMatch.name = friendsData[i].name;
                bestMatch.photo = friendsData[i].photo;
                bestMatch.friendDifference = totalDifference;
            }
        }
    }


    friendsData.push(userData);

 
    res.json(bestMatch);

    });

}