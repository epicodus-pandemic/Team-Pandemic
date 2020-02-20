const coordTokyo = [139.77, 35.68];
const coordParis = [2.35183, 48.85658];
const coordSeattle = [ -122.3301, 47.6038];
const coordToronto = [-79.3849, 43.6529];
const coordBaghdad = [44.41667, 33.35];
const coordBangkok = [100.51667,13.75];
const coordNairobi = [36.816670, -1.283330];
const coordRio = [-43.2094, -22.911];
const coordLA = [-118.2439, 34.0544];
const coordMoscow = [37.61778, 55.75583];

export class Player {
  constructor(id){
    this.actionPoints = 4;
    this.currentLocation;
    this.researchPoints = 0;
    this.id = id;
  }

  setActionPoints(num){
    this.actionPoints = num;
  }

  treat(city){
    if (city.diseaseCount > 0) {
      this.actionPoints --;
      city.diseaseCount --;                     
    }
  }

  research(){
    if(this.researchPoints < 20){
      this.researchPoints ++;
      this.actionPoints --;
    }
  }
}

class City {
  constructor(name, coord){
    this.name = name;
    this.diseaseCount = 0;
    this.connections = [];
    this.coord = coord;
  }
  addConnections(connectedCities){
    this.connections = connectedCities;
  }
}

export class Game {
  constructor(player){
    this.tokyo = new City("Tokyo", coordTokyo);
    this.paris = new City("Paris", coordParis);
    this.seattle = new City("Seattle", coordSeattle); 
    this.toronto = new City("Toronto", coordToronto);
    this.baghdad = new City("Baghdad", coordBaghdad);
    this.bangkok = new City("Bangkok", coordBangkok);
    this.nairobi = new City("Nairobi", coordNairobi);
    this.rio = new City("Rio de Janeiro", coordRio);
    this.la = new City("Los Angeles", coordLA);
    this.moscow = new City("Moscow", coordMoscow);
    this.isGameWon = false;
    this.isGameLost = false;
    this.cities = [this.tokyo, this.paris, this.seattle, this.toronto, this.baghdad, this.bangkok, this.nairobi, this.rio, this.la, this.moscow];
    this.player = player;
    this.turnCount= 0;
    this.totalDisease;

    this.bangkok.addConnections([this.moscow, this.baghdad, this.tokyo, this.la]);
    this.tokyo.addConnections([this.seattle, this.bangkok,this.moscow]);
    this.paris.addConnections([this.moscow, this.toronto, this.baghdad]);
    this.seattle.addConnections([this.toronto, this.tokyo, this.la]);
    this.toronto.addConnections([this.seattle, this.paris]);
    this.baghdad.addConnections([this.bangkok, this.nairobi, this.paris]);
    this.nairobi.addConnections([this.rio, this.baghdad]);
    this.rio.addConnections([this.la, this.nairobi]);
    this.la.addConnections([this.bangkok, this.seattle, this.rio]);
    this.moscow.addConnections([this.paris, this.bangkok, this.tokyo]);
  }

  checkWin(){
    if((this.player.researchPoints === 20 && this.getTotalDiseaseCount() < 15) || this.getTotalDiseaseCount() === 0)
    {
      this.isGameWon = true;
    }
  }

  checkLoss(){
    let lossThreshold = this.cities.length * 3;
    if(this.getTotalDiseaseCount() > (lossThreshold * 2)/3)
    {
      return this.isGameLost = true;
    }
  }

  endTurn(){
    this.turnCount ++;
    this.player.setActionPoints(4);
    this.checkWin();
  }

  getTotalDiseaseCount(){
    let totalDisease = 0;
    for (let i = 0; i < this.cities.length; i++){
      totalDisease += this.cities[i].diseaseCount;
    }
    return totalDisease;
  }

  setPlayerLocation(cityIndex){
    this.player.currentLocation = cityIndex;
    this.player.actionPoints --;
  }

  //later gameplay infections
  
  // inital infection round 
  infectRandom(num){
    for (let i = 0; i < num; i++){
      let randomCityPositionNumber = Math.floor(Math.random() * 10); 
      let randomCity = this.cities[randomCityPositionNumber];
      this.infect(randomCity);
    }
  }

  infect(cityObj){
    if(cityObj.diseaseCount == 3){ 
      this.infectConnection(cityObj);
    } else {
      this.increaseInfection(cityObj);
    }
  }

  increaseInfection(cityObj){
    if(cityObj.diseaseCount < 3){
      cityObj.diseaseCount ++;
      this.checkLoss();
    }
  }

  infectConnection(cityObj){
    for(let i =0; i <cityObj.connections.length; i++){
      let currentCity = cityObj.connections[i];
      this.increaseInfection(currentCity);
    }
  }
}
