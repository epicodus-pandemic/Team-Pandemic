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



let game = new Game();
let tokyo = game.tokyo;
let paris = game.paris;
let seattle = game.seattle;
let toronto = game.toronto;
let baghdad = game.baghdad;
let bankgkok = game.bangkok;
let nairobi = game.nairobi;
let rio = game.rio;
let la = game.la;
let moscow = game.moscow;

function updateGameVars(){
  $("#actionCount").text(game.player.actionPoints);
  $("#currentLocation").text(game.cities[game.player.currentLocation].name);
  $("#researchPoints").text(game.player.researchPoints*10 + "%");
  $("#currentMonth").text("March");
  $("#currentYear").text("2021");

  $("#beijing").text(game.cities[2].diseaseCount);
  for (let i = 0; i < game.cities.length; i++){
    $(`#city-${i}-disease`).text(game.cities[i].diseaseCount);
  }
}

$(document).ready(function() {
    $("#newGameButton").click(function(){ 
      game = new Game;
      game.setPlayerLocation(2);
      updateGameVars();

      // set the display of game board to none and then show in this line

      $("#treatBtn").click(function(){ 
        updateGameVars();
      })
      $("#travelBtn").click(function(){ 
        updateGameVars();
      })
      $("#researchBtn").click(function(){ 
        updateGameVars();
      })
      $("#endTurnBtn").click(function(){ 
        updateGameVars();
      })

    })
})

