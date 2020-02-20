// this is the branch made on steven's computer at 2:29 PM

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
    if(this.researchPoints === 20){
      this.researchPoints = 20
    } else{
    this.researchPoints ++;
    this.actionPoints --;
    }
  }
}

class City {
  constructor(name){
    this.name = name;
    this.diseaseCount = 0;
    this.connections = [];
  }
  addConnections(connectedCities){
    this.connections = connectedCities;
  }
}

export class Game {
  constructor(player){
    this.tokyo = new City("Tokyo");
    this.paris = new City("Paris");
    this.seattle = new City("Seattle"); 
    this.toronto = new City("Toronto");
    this.baghdad = new City("Baghdad");
    this.bangkok = new City("Bangkok");
    this.nairobi = new City("Nairobi");
    this.rio = new City("Rio de Janeiro");
    this.la = new City("Los Angeles");
    this.moscow = new City("Moscow");
    this.isGameWon = false;
    this.isGameLost = false;
    this.hardMode = false;
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

  setHard(){
    this.hardMode = true;
   }

  checkWin(){
    if (this.hardMode === true){
      if(this.player.researchPoints === 20 && this.getTotalDiseaseCount() <=15 || this.getTotalDiseaseCount() === 0){
        this.isGameWon = true;
      }
    } else {
      if(this.player.researchPoints === 20 || this.getTotalDiseaseCount() === 0){
        this.isGameWon = true;
      }
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
