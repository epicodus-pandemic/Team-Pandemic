
export class Player {
  constructor(){
    this.actionPoints = 0;
    this.currentLocation;
  }
  setActionPoints(){
    this.actionPoints ++
  }

  treat(city){
    if(this.actionPoints=== 0 || city.diseaseCount === 0){
      return false;
    }else{
      this.actionPoints --;
      city.diseaseCount --;
    }
  }
}
// needs to add in Connections for each city.
class City {
  constructor(name, connections){
    this.name = name
    this.diseaseCount = 0;
    this.connections = connections;
  }
  addOneConnection(city){
    this.connections.push(city)
    //this.tokyo.addConnection(paris, seattle, )
  }
  addConnections(cities){
    this.connections = cities;
  }
}

export class Game {
  constructor(){
    this.tokyo = new City();
    this.paris = new City();
    this.seattle = new City(); 
    this.toronto = new City();
    this.cairo = new City();
    this.beijing = new City();
    this.rio = new City();
    this.la = new City();
    this.moscow = new City();
    this.isGameOver = false;
    this.cities = [this.tokyo, this.paris, this.seattle, this.toronto, this.cairo, this.beijing, this.rio,this.la, this.moscow];
    this.player = new Player();
    //this.tokyo.addConnections([this.beijing, this.moscow, this.seattle])
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
}
