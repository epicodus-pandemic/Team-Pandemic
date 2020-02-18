
export class Player {
  constructor(){
    this.actionPoints = 4;
    this.currentLocation;
    this.reasearchpoints = 0;
  }
  setActionPoints(){
    this.actionPoints = 4
  }

  treat(city){
    if(this.actionPoints=== 0 || city.diseaseCount === 0){
      return false;
    }else{
      this.actionPoints --;
      city.diseaseCount --;                     
    }
  }

  research(){
    this.reasearchpoints ++;
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
    this.cities = [this.tokyo, this.paris, this.seattle, this.toronto, this.baghdad, this.bangkok, this.nairobi, this.rio,this.la, this.moscow];
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
    if(this.player.reasearchpoints ==10 || this.player.totalDisease == 0)
    {
     return this.isGameWon=true
    }
  }

  checkLoss(){
    let lossThreshold = this.cities.length * 3;
    if(this.totalDisease > (lossThreshold * 4)/5)
    {
      return this.isGameLost = true
    }
  }

  countTurn(){
    this.turnCount ++;
    this.player.setActionPoints();
    this.checkWin();
    this.checkLoss();
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
  }
// needs work 
  infect(cityIndex){
      console.log("before infect/ disease in seattle: ", this.cities[2].diseaseCount);
    let totalDisease = this.getTotalDiseaseCount();

    if (totalDisease >= (3 * this.cities.length)){
      console.log("game over");
      this.isGameOver = true;
    } else if(this.cities[cityIndex].diseaseCount == 3){ 

      for (let i =0; i < this.cities.length; i++){
        if (i != cityIndex && this.cities[i].diseaseCount < 3) {
          this.cities[i].diseaseCount ++;
        }
      }
    } else{
      this.cities[cityIndex].diseaseCount ++;
    }
    console.log("after infect/ disease in seattle: ", this.cities[2].diseaseCount);
  }
  // PlaceHolder increaseInfection 
  increaseInfection(){
    this.toronto.diseaseCount+= 1;
  }
}
