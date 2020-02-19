// this is the branch made on steven's computer at 2:29 PM

export class Player {
  constructor(){
    this.actionPoints = 4;
    this.currentLocation;
    this.researchPoints = 0;
  }

  setActionPoints(num){
    this.actionPoints = num;
  }

  setLimit(game){
    if(this.actionPoints <= 0){
      this.actionPoints = 0;
    } if( this.researchPoints >= 10){
      this.researchPoints = 10;
      game.isGameWon = true;
    }
  }

  treat(city){
    if (city.diseaseCount > 0) {
      this.actionPoints --;
      city.diseaseCount --;                     
    }
  }

  research(){
    this.researchPoints ++;
    this.actionPoints --;
    }
}

class City {
  constructor(name){
    this.name = name
    this.diseaseCount = 0;
    this.connections = [];
  }
  addConnections(connectedCities){
    this.connections = connectedCities;
  }
}

export class Game {
  constructor(){
    this.tokyo = new City("tokyo");
    this.paris = new City("paris");
    this.seattle = new City("seattle"); 
    this.toronto = new City("toronto");
    this.baghdad = new City("baghdad");
    this.bangkok = new City("bangkok");
    this.nairobi = new City("nairobi");
    this.rio = new City("rio");
    this.la = new City("la");
    this.moscow = new City("moscow");
    this.isGameWon = false;
    this.isGameLost = false;
    this.cities = [this.tokyo, this.paris, this.seattle, this.toronto, this.baghdad, this.bangkok, this.nairobi, this.rio, this.la, this.moscow];
    this.player = new Player();
    this.turnCount= 0;
    this.totalDisease = 1;

    this.bangkok.addConnections([this.moscow, this.baghdad, this.tokyo, this.la]);
    this.tokyo.addConnections([this.seattle, this.bangkok,this.moscow]);
    this.paris.addConnections([this.moscow, this.toronto, this.baghdad]);
    this.seattle.addConnections([this.toronto, this.tokyo, this.la]);
    this.toronto.addConnections([this.seattle, this.paris]);
    this.baghdad.addConnections([this.bangkok, this.nairobi, this.paris]);
    this.nairobi.addConnections([this.rio, this.baghdad]);
    this.rio.addConnections([this.la, this.nairobi]);
    this.la.addConnections([this.bangkok, this.seattle, this.rio])                                                                       
    this.moscow.addConnections([this.paris, this.bangkok, this.tokyo]);
  }

  checkWin(){
    if(this.player.researchPoints === 10 || this.totalDisease === 0)
    {
      this.isGameWon = true
    }
  }

  checkLoss(){
    let lossThreshold = this.cities.length * 3;
    if(this.totalDisease > (lossThreshold * 4)/5)
    {
      return this.isGameLost = true
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

  infectRandom(){
    let randomCityPositionNumber = Math.floor(Math.random() * 10); 
    let randomCity = this.cities[randomCityPositionNumber];
    this.infect(randomCity);
  }

  infect(cityObj){
    if(cityObj.diseaseCount == 3){ 
     this.infectConnection(cityObj);
    } else {
      this.increaseInfection(cityObj);
    }
  }

  increaseInfection(cityObj){
    cityObj.diseaseCount ++;
    this.checkLoss();
  }

  infectConnection(cityObj){
    for(let i =0; i <cityObj.connections.length; i++){
      let currentCity = cityObj.connections[i];
      this.increaseInfection(currentCity);
    }
  }
}
