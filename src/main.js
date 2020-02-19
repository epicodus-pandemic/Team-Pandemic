import $ from 'jquery';
import 'bootstrap' ; 
import 'bootstrap/dist/css/bootstrap.min.css' ; 
import './styles.css' ;
import { Game, Player } from './game';

var mapboxgl = require('mapbox-gl/dist/mapbox-gl.js');
 
mapboxgl.accessToken = 'pk.eyJ1Ijoia3Jpc3RhcnV0eiIsImEiOiJjazZqdWtlbjMwMDFtM2xxcG5zMjlscDJlIn0.XETFmQnM9jiwbDtcAEZfEQ';
var map = new mapboxgl.Map({
  container: 'mapDiv',
  style: 'mapbox://styles/kristarutz/ck6r0bnj10oui1irvwnqjyp9u',
  zoom: 0.5,
  minZoom: 0.5,
  maxZoom: 5,
  center: [-100,35]
});

let game;

function updateGameVars(){
  $("#actionCount").text(game.player.actionPoints);
  $("#currentLocation").text(game.cities[game.player.currentLocation].name);
  $("#researchPoints").text(game.player.researchPoints*10 + "%");
  $("#currentMonth").text("March"); // use the turn count to generate
  $("#currentYear").text("2021");
  $("#total-disease").text(game.getTotalDiseaseCount());

  for (let i = 0; i < game.cities.length; i++){
    $(`#city-${i}-disease`).text(game.cities[i].diseaseCount);
  }
}

function updateControlPanel(){
  setTravelButtons();
  if (game.player.actionPoints > 0){
    $("#treatBtn").show();
    $("#travelBtn").show();
    $("#researchBtn").show();
  } else {
    $("#treatBtn").hide();
    $("#travelBtn").hide();
    $("#researchBtn").hide();
  }
}

function checkWin(){
  game.checkWin();
  game.checkLoss();
  if (game.isGameWon === true){
    $("#gameOverDiv").show();
    $("#winScreen").show();
    $("#loseScreen").hide();
    $("#gameBoardDiv").hide();
    $("#controlPanel").hide();
  } else if (game.isGameLost === true){
    $("#gameOverDiv").show();
    $("#winScreen").hide();
    $("#loseScreen").show();
    $("#gameBoardDiv").hide();
    $("#controlPanel").hide();
  }
}

function checkSameCity(city) {
  return city === this;
}

function setTravelButtons(){
  for (let i = 0; i < game.cities.length; i++){
    $(`#city-${i}-btn`).hide();
  }

  let currentCity = game.cities[game.player.currentLocation];

  for (let i = 0; i < currentCity.connections.length; i++){
    let currentConnection = currentCity.connections[i];
    let currentConnectionIndex = game.cities.findIndex(checkSameCity, currentConnection);
    $(`#city-${currentConnectionIndex}-btn`).show();
  }
}

$(document).ready(function() {
  let gamesCount = 0;
    $("#newGameButton").click(function(){ 
      gamesCount++;
      $("#gameBoardDiv").show();
      $("#gameOverDiv").hide();
      $("#controlPanel").show();
      

      let player1 = new Player(gamesCount);
      game = new Game(player1);
      game.player.currentLocation = Math.floor(Math.random() * 10);
      game.infectRandom(8);

      updateControlPanel();
      updateGameVars();
    })

    $("#treatBtn").click(function(){  
      game.player.treat(game.cities[game.player.currentLocation]);
      updateGameVars();
      updateControlPanel();
      checkWin();
    })

    $("#travelBtn").click(function(){ 
    })

    $("#researchBtn").click(function(){ 
      game.player.research();
      updateControlPanel();
      checkWin();
      updateGameVars();        
    })

    $("#endTurnBtn").click(function(){ 
      game.endTurn();
      game.infectRandom(2);
      updateGameVars();
      updateControlPanel();
      checkWin();
    })

    // $("#la-btn").click(function(){
    //   console.log("hi steven");
    // })
    $("#city-0-btn").click(function(){
      game.setPlayerLocation(game.cities.findIndex(checkSameCity, game.tokyo));
      updateGameVars();
      updateControlPanel();
      console.log("hi tokyo");
    })
    $("#city-1-btn").click(function(){
      game.setPlayerLocation(game.cities.findIndex(checkSameCity, game.paris));
      updateGameVars();
      updateControlPanel();
      console.log("hi Paris");
    })
    $("#city-2-btn").click(function(){
      game.setPlayerLocation(game.cities.findIndex(checkSameCity, game.seattle));
      updateGameVars();
      updateControlPanel();
      console.log("hi Seattle");
    })
    $("#city-3-btn").click(function(){
      game.setPlayerLocation(game.cities.findIndex(checkSameCity, game.toronto));
      updateGameVars();
      updateControlPanel();
      console.log("hi Toronto");
    })
    $("#city-4-btn").click(function(){
      game.setPlayerLocation(game.cities.findIndex(checkSameCity, game.baghdad));
      updateGameVars();
      updateControlPanel();
      console.log("hi Baghdad");
    })
    $("#city-5-btn").click(function(){
      game.setPlayerLocation(game.cities.findIndex(checkSameCity, game.bangkok));
      updateGameVars();
      updateControlPanel();
      console.log("hi Bangkok");
    })
    $("#city-6-btn").click(function(){
      game.setPlayerLocation(game.cities.findIndex(checkSameCity, game.nairobi));
      updateGameVars();
      updateControlPanel();
      console.log("hi Nairobi");
    })
    $("#city-7-btn").click(function(){
      game.setPlayerLocation(game.cities.findIndex(checkSameCity, game.rio));
      updateGameVars();
      updateControlPanel();
      console.log("hi Rio");
    })
    $("#city-8-btn").click(function(){
      game.setPlayerLocation(game.cities.findIndex(checkSameCity, game.la));
      updateGameVars();
      updateControlPanel();
      console.log("hi Los Angeles");
    })
    $("#city-9-btn").click(function(){
      game.setPlayerLocation(game.cities.findIndex(checkSameCity, game.moscow));
      updateGameVars();
      updateControlPanel();
      console.log("hi Moscow");
    })

})

