import $ from 'jquery';
import 'bootstrap' ; 
import 'bootstrap/dist/css/bootstrap.min.css' ; 
import './styles.css' ;
import Map from './map.jpg';
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

// Add the image to our existing div.
// const map = new Image();
// map.src = Map;
// $("#mapDiv").append(map);



let game // = new Game();

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
  if (game.player.actionPoints > 0){
    $("#treatBtn").show();
    $("#travelBtn").show();
    $("#researchBtn").show();
  } else {
    $("#treatBtn").hide();
    $("#travelBtn").hide();
    $("#researchBtn").hide();
  }
  //if user has action points, then display the buttons with actions they may take
  //end turn button always stays
  //the cities that they can travel to are updated to reflect the current city
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

$(document).ready(function() {
    $("#newGameButton").click(function(){ 
      $("#gameBoardDiv").show();
      $("#gameOverDiv").hide();
      $("#controlPanel").show();

      game = new Game();
      game.player.currentLocation = 2;
      // let tokyo = game.tokyo;
      // let paris = game.paris;
      // let seattle = game.cities[2];
      // let toronto = game.toronto;
      // let baghdad = game.baghdad;
      // let bankgkok = game.bangkok;
      // let nairobi = game.nairobi;
      // let rio = game.rio;
      // let la = game.la;
      // let moscow = game.moscow;

      //modify "initial infection round"
      // game.increaseInfection(seattle)
      // game.increaseInfection(seattle)
      // game.increaseInfection(seattle)
      game.infectRandom(6);

      updateGameVars();

      // set the display of game board to none and then show in this line

      $("#treatBtn").click(function(){  
        game.player.treat(game.cities[game.player.currentLocation]);
        updateGameVars();
        updateControlPanel();
        checkWin();
      })

      $("#travelBtn").click(function(){ 
        updateGameVars();
        updateControlPanel();
      })

      $("#researchBtn").click(function(){ 
        game.player.research();
        updateControlPanel();

        checkWin();
        updateGameVars();        
      })

      $("#endTurnBtn").click(function(){ 

        game.endTurn();
        // increase the turn count
        // check win
        // reset action points

        // COMPUTER ROUND
        game.infectRandom(2);
        

        updateGameVars();
        updateControlPanel();
        checkWin();
      })

    })
})

