import { Game, Player } from '../src/game.js';

describe("City", () => {
  let game;
  beforeEach(function() {
     game = new Game();
  })

  test("new game should be created with new cities with diseaseCount equal to zero", ()=>{
    expect(game.paris.diseaseCount).toEqual(0);
    expect(game.seattle.diseaseCount).toEqual(0);
    expect(game.paris.diseaseCount).toEqual(0);
    expect(game.toronto.diseaseCount).toEqual(0);
    expect(game.baghdad.diseaseCount).toEqual(0);
    expect(game.nairobi.diseaseCount).toEqual(0);
    expect(game.bangkok.diseaseCount).toEqual(0);
    expect(game.rio.diseaseCount).toEqual(0);
    expect(game.la.diseaseCount).toEqual(0);
    expect(game.moscow.diseaseCount).toEqual(0);
    })
  test(" When game is initated tokyo has name property", () =>{
    expect (game.tokyo.name).toEqual("tokyo");
  })
  test("method addconnections adds other cities to an array within the city class", () =>{
    expect (game.tokyo.connections).toEqual([game.seattle, game.bangkok,game.moscow]);
    expect (game.paris.connections).toEqual([game.moscow, game.toronto, game.baghdad]);
    expect (game.seattle.connections).toEqual([game.toronto, game.tokyo, game.la]);
    expect (game.toronto.connections).toEqual([game.seattle, game.paris]);
    expect (game.baghdad.connections).toEqual([game.bangkok, game.nairobi, game.paris]);
    expect (game.nairobi.connections).toEqual([game.rio, game.baghdad]);
    expect (game.rio.connections).toEqual([game.la, game.nairobi]);
    expect (game.bangkok.connections).toEqual([game.moscow, game.baghdad, game.tokyo, game.la])
    expect (game.la.connections).toEqual([game.bangkok, game.seattle, game.rio]);
    expect (game.moscow.connections).toEqual([game.paris, game.bangkok, game.tokyo]);
  })
  test(" new player is created with 4 action points", () =>{
    expect (game.player.actionPoints).toEqual(4);
  })
  test("move count should increase when action points equal zero, and infection increases", ()=>{
    // game.player.actionPoints = 0
    game.countTurn();
    expect(game.turnCount).toEqual(1)
    expect(game.player.actionPoints).toEqual(4)
  })
  test(" Using reasearchpoints() should increase researchpoints by 1 and decrease actions points by one", () =>{
    game.player.research();
    expect (game.player.reasearchpoints).toEqual(1);
    expect (game.player.actionPoints).toEqual(3);

  })
  test(" reaching ten researchpoints should fufill win condition", () => {
    game.player.actionPoints = 0;
    game.player.research();
    game.player.research();
    game.player.research();
    game.player.research();
    game.player.research();
    game.player.research();
    game.player.research();
    game.player.research();
    game.player.research();
    game.player.research();
    expect (game.player.reasearchpoints).toEqual(10);
    game.countTurn();
    expect (game.isGameWon).toEqual(true);
  })
  test ("eradicating disease points on the board should fufill win condition", () => {
    game.totalDisease = 0;
    game.increaseInfection(game.bangkok);
    game.countTurn();
    expect (game.isGameWon).toEqual(false);
  })

  test ("eradicating disease points on the board should fufill win condition", () => {
    game.totalDisease = 25;
    game.countTurn();
    expect (game.isGameLost).toEqual(true);
  })

  test ("shoud infect one city", () => {
    game.increaseInfection(game.bangkok);
    expect(game.bangkok.diseaseCount).toEqual(1);

  })
  test ("should infect surrounding cities", () => {
    game.infectConnection(game.bangkok);
    expect(game.la.diseaseCount).toEqual(1);

  })
})






//   test("should properly construct city with 0 disease points", () => {
//     expect(seattle.diseaseCount).toEqual(0);
//   })
//   test("should increase Seattle diseaseCount by 1 when Seattle is infected", () => {
//     game.infect(2);
//     expect(seattle.diseaseCount).toEqual(1);
//   })
//   test("should increase Seattle diseaseCount by 1 after two minutes", () => {
//     game.setInfectTimer(2);
//     jest.advanceTimersByTime(120001)
//     expect(seattle.diseaseCount).toEqual(1);
//   })
//   test("should increase Seattle diseaseCount by 1 after every two minutes", () => {
//     game.setInfectTimer(2);
//     jest.advanceTimersByTime(240001)
//     expect(seattle.diseaseCount).toEqual(2);
//   })
//   test("should increase Seattle diseaseCount to 3 after 6 minutes", () => {
//     game.setInfectTimer(2);
//     jest.advanceTimersByTime(360001)
//     expect(seattle.diseaseCount).toEqual(3);
//   })
//   test("should increase Seattle diseaseCount to 3 after 8 minutes", () => {
//     game.setInfectTimer(2);
//     jest.advanceTimersByTime(480001)
//     expect(seattle.diseaseCount).toEqual(3);
//   })

//   test( "should increase Paris and Tokyo's diseaseCount by 1 when Seattle's diseaseCount is capped at three and has a new addtion to its diseaseCount", () => {
//     game.setInfectTimer(2);
//     jest.advanceTimersByTime(480001)
//     expect(seattle.diseaseCount).toEqual(3);
//     expect(paris.diseaseCount).toEqual(1);
//     expect(tokyo.diseaseCount).toEqual(1);
//     expect(game.isGameOver).toEqual(false);
//   })
//   test( "should increase Paris and Tokyo's diseaseCount by 1 when Seattle's diseaseCount is capped at three and has a new addtion to its diseaseCount", () => {
//     game.setInfectTimer(2);
//     jest.advanceTimersByTime(840001)
//     expect(seattle.diseaseCount).toEqual(3);
//     expect(paris.diseaseCount).toEqual(3);
//     expect(tokyo.diseaseCount).toEqual(3);
//     expect(game.getTotalDiseaseCount()).toEqual(9);
//     expect(game.isGameOver).toEqual(true);
//   })

//   test("should create a player when a new game is created", () => {
//   expect(game.player.actionPoints).toEqual(0);
//   })
//   test ("should increase player actionPoints by 1", () => {
//     game.player.setActionPoints();
//   expect(game.player.actionPoints).toEqual(1)
//   })
//   test("after two minutes should increase Players action points by 2", () => {
//     game.setMoveTimer();
//     jest.advanceTimersByTime(120001)
//     expect(game.player.actionPoints).toEqual(2);
//   })
//   test("when player treats a city, players action points and cities disease points should decrease by one", () => {
//     game.setMoveTimer();
//     game.setInfectTimer(2);
//     jest.advanceTimersByTime(120001);
//     game.player.treat(seattle);
//     expect(game.player.actionPoints).toEqual(1)
//     expect(seattle.diseaseCount).toEqual(0)
//   })
//   test("if player has 0 action points or the disease points of a city are zero and the user calls a treat function, action points and cities disease points are not changed", () =>{
//     game.setInfectTimer(2);
//     jest.advanceTimersByTime(240001);
//     game.player.treat(seattle);
//     expect(game.player.actionPoints).toEqual(0)
//     expect(seattle.diseaseCount).toEqual(2)
//   })
// })
