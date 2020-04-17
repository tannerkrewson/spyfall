import { Meteor } from 'meteor/meteor';

function cleanUpGamesAndPlayers() {
  var cutOff = moment().subtract(2, 'hours').toDate().getTime();

  var numGamesRemoved = Games.remove({
    createdAt: {$lt: cutOff}
  });

  var numPlayersRemoved = Players.remove({
    createdAt: {$lt: cutOff}
  });
}

function getRandomLocation(locationOption){
  if(locationOption === "location1") {
	  var locationIndex = Math.floor(Math.random() * locations.length);
	  return locations[locationIndex];
  }

  if(locationOption === "location2") {
	  var locationIndex2 = Math.floor(Math.random() * locations2.length);
	  return locations2[locationIndex2];
  }

  // use both locations
  var allLocations = locations.concat(locations2);
  var allIndex = Math.floor(Math.random() * allLocations.length);
  return allLocations[allIndex];
}

function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    return array;
}

function assignRoles(players, location){
  var default_role = location.roles[location.roles.length - 1];
  var roles = location.roles.slice();
  var shuffled_roles = shuffleArray(roles);
  var role = null;

  // console.log(default_role);
  // console.log(roles);

  players.forEach(function(player){
    if (!player.isSpy){
      role = shuffled_roles.pop();

      if (role === undefined){
        role = default_role;
      }

      Players.update(player._id, {$set: {role: role}});
    }
  });
}

Meteor.startup(function () {
  // Delete all games and players at startup
  Games.remove({});
  Players.remove({});
});

var MyCron = new Cron(60000);

MyCron.addJob(5, cleanUpGamesAndPlayers);

Meteor.publish('games', function(accessCode) {
  return Games.find({"accessCode": accessCode});
});

Meteor.publish('players', function(gameID) {
  return Players.find({"gameID": gameID});
});

Games.find({"state": 'settingUp'}).observeChanges({
  added: function (id, game) {
    var location = getRandomLocation(game.locationOption);

    var players = Players.find({gameID: id});
    var gameEndTime = moment().add(game.lengthInMinutes, 'minutes').valueOf();

    var spyIndex = Math.floor(Math.random() * players.count());
    var firstPlayerIndex = Math.floor(Math.random() * players.count());

    players.forEach(function(player, index){
      Players.update(player._id, {$set: {
        isSpy: index === spyIndex,
        isFirstPlayer: index === firstPlayerIndex
      }});
    });

    assignRoles(players, location);

    Games.update(id, {$set: {state: 'inProgress', location: location, endTime: gameEndTime, paused: false, pausedTime: null}});
  }
});