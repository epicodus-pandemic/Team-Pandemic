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

function checkTime(i) {
  if (i < 10) {
      i = "0" + i
    }  // add zero in front of numbers < 10
  return i;
}

 let game = new Game();

function updateGameVars(){
  setInterval(() => {
    console.log("UPDATE GAME VARS CALLED");
    $("#currentActionPoints").text(game.player.actionPoints);
    $("#currentLocation").text(game.player.currentLocation);
    $("#currentDiseaseCount-tokyo").text(game.cities[0].diseaseCount);
    $("#currentDiseaseCount-paris").text(game.cities[1].diseaseCount);
    $("#currentDiseaseCount-seattle").text(game.cities[2].diseaseCount);
  }, 2000);
}

$(document).ready(function() {

    $("#startButton").click(function(){ 
      console.log("start") 
      game = new Game;
      game.setPlayerLocation(2);

      console.log("player actions: ", game.player.actionPoints);
      console.log("disease in seattle: ", game.cities[2].diseaseCount);
      game.setMoveTimer();
      game.setInfectTimer(2);
      game.player.setActionPoints();
      game.infect(1);
      updateGameVars();
    })

    $("#devButton").click(function(){ 
      console.log("dev") 
      // game.player.setActionPoints();
      // game.infect(1);
      updateGameVars();
    })

    $("#endButton").click(function() {
        //clearInterval(timer);
    })
})

