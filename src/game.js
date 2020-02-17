

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
  //how to target the city 

  }

  // travel(){
  //   this.actionPoints --
  //   // how to target city
  //   // give city a boolean true false if player is present
  // }
}

// possible functions add in population and disease counts as a percentage of population. 
class City {
  constructor(){
    this.diseaseCount = 0;
  }
}

//add in other cities
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
  }
  //  To check the city number for subtraction needed for decreasing action pts.
  // let cityDictionary = {}
  // cityDictionary.put(cityName, cities.Length-1);
  // cityDictionary.hasKey("Seattle");

  getTotalDiseaseCount(){
    let totalDisease = 0;
    for (let i = 0; i < this.cities.length; i++){
      totalDisease += this.cities[i].diseaseCount;
    }
    return totalDisease;
  }
// move away from using index locations in array into using close cities 
  setPlayerLocation(cityIndex){
    this.player.currentLocation = cityIndex;
  }


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


  // Backend Timers 
  // setInfectTimer(cityIndex){
  //   setInterval(() => {
  //     this.infect(cityIndex);
  //   }, 12000);
  // }

  // setMoveTimer(){
  //   setInterval(() => {
  //     this.player.setActionPoints();
  //   }, 6000);
  // }
}
