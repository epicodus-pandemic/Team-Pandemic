import { Game, Player } from '../src/game.js';

describe("City", () => {
  beforeEach(function() {
    game = new Game();
  })

  afterEach(function() {
  })
  test("new game should be created with new cities with diseaseCount equal to zero", ()=>{
    expect(game.paris.diseaseCount).toEqual(0);
    expect(game.seattle.diseaseCount).toEqual(0);
    expect(game.paris.diseaseCount).toEqual(0);
    expect(game.toronto.diseaseCount).toEqual(0);
    expect(game.cairo.diseaseCount).toEqual(0);
    expect(game.beijing.diseaseCount).toEqual(0);
    expect(game.rio.diseaseCount).toEqual(0);
    expect(game.la.diseaseCount).toEqual(0);
    expect(game.moscow.diseaseCount).toEqual(0);
  })
  test(" new player is created with 0 action points", () =>{
    expect (game.player.actionPoints).toEqual(0);
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
