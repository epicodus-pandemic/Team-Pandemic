# Team Pandemic Program

### By Krista Rutz, Steven Fleming, and Brevin Cronk

## Description

### In Pandemic, the fate of the world is in your hand, do you have what it takes to prevent humanity from being wiped out from a deadly disease?! The game runs as a turn based game in which you have a set amount of action points to spend per move. You can spend these points on researching a cure for the disease, moving to different cities around the world, and you have the ability to treat cities that are infected, use your points wisely to keep the disease under control!

## Setup Instructions

### To access our game you have the option to clone our code onto your own computer. From there here are the steps you will want to follow
* ### Type "npm install" into your console.
* ### Type "npm run build" into your console to get the build setup
* ### Type "npm run start" in the console to open up the webpage for the game and begin playing

## Specifications

| Spec | Example Input | Back-end Process | Expected Output |
| :-------------  | :-------------   | :------------- | :------------- |
| Page loads: <br> Start button <br> (number of players form?) <br> Map |-|-|-|
| Clicking start game/new game initializes a new game: <br> cities are drawn <br> player icon set in start city <br> initial infection round <br> stats: actions start at 4 | click button| new Player object, new Game object, City objects |Player Token: Seattle <br> **Stats**: <br> p1 Actions: 4 <br> Tokyo: 2 <br> Paris: 0 <br> Seattle: 0 |
| When game starts, three cities are randomly infected | click button | | Player Token: Seattle <br> **Stats**: <br> p1 Actions: 4 <br> Tokyo: 2 <br> Paris: 1 <br> Seattle: 0 |
|When P1 has no actions, they can't treat cities, research, or travel - only option to end turn |p1 Actions: 0||p1 Actions: 0 <br> <kbd>end turn</kbd>|
|When P1 chooses to end turn, cities are infected and action points reset | "end turn" | infect current city by 2 | seattle: 2, action reset to 4 |
|When P1 chooses to end turn, cities are infected and action points reset| "end turn" | infect 2 random cities by 1 | seattle: 1, tokyo: 1, action reset to 4|
|When P1 chooses to end turn, cities are infected and action points reset | "end turn" | infect 2 random cities that either a) already have disease > 0 or b) neighbor a city with disease > 0 | seattle: 1, tokyo: 1, action reset to 4|
|When P1 has 1 or more actions, they may choose to treat, travel, research, or end turn | | | <kbd>Treat</kbd>, <kbd>Travel</kbd>, <kbd>Research</kbd>, or end turn|
|When P1 has 1 or more actions, they may only treat their current city | Player is in Seattle | | <kbd>Treat Seattle</kbd> is an option |
|When P1 has 1 or more actions, but a city has no disease, they cannot reduce disease count by "treating" infection in a city | select "treat Paris" | Paris diseaseCount === 0| Paris: 0 |
|When P1 has 1 or more actions, and city has one or more diseaseCount, they can reduce disease count by "treating" infection in a city | Player Token: Paris <br> **Stats**: <br> p1 Actions: 4 <br> Paris: 2 <br> select "treat Paris" ||Player Token: Paris <br> **Stats**: <br> p1 Actions: 3 <br> Paris: 1 <br> Seattle: 0 |
|When P1 has 1 or more actions, they may only travel to neighboring cities | Player is in Seattle | | Options: <kbd>Travel to Tokyo</kbd>, <kbd>Travel to LA</kbd>, <kbd>Travel to Toronto</kbd> (not options - Paris, Moscow, Rio, Beijing, Cairo)|
|When P1 has 1 or more actions, they may spend one action point to travel to a neighboring city | Player is in Seattle, Actions: 4 --> travel to LA | | Player: LA, Actions: 3|
|When P1 has 1 or more actions, they may spend one action point research | Actions: 4 --> research, Cure research counter: 0| | Actions: 3, Cure research counter: 1 |
| When the game is over, Game over screen: <br>Skull/Winning message <br> stats board <br> new game button? <br> all game play features disabled |-|-|-|
| When cure research counter reaches 10, you win! | input: "research" when research count: 9 || Game over - p1 wins!|
| When total disease reaches 0, you win! | input: "treat" when disease count: 1 || Game over - p1 wins!|
| When total disease is maxed out (80% of cities*3), and infection should be increased beyond the maximum, it triggers a game loss | input: infection rate at 22/27 || Game over - p1 loses!|

## Who Did What

* ### Steven Fleming and Brevin Cronk:
### Steven and Brevin were tasked with creating te backend functionality to Pandemic. Steven was proud with creating the backend functions that allow us to connect cities to travel and spread infection. He also wrote the functions that simulate the disease spreading to different cities, and the rate at which the population is infected. Brevin was proud with creating the functionality that allowed the "hard" game mode, aswell as creating the infect function and working alongside Steven to help create variable disease spread.

* ### Krista Rutz
### Krista Rutz was tasked with creating the frontend functionality for Pandemic. She was incredibly pround of using a MapBox API to show the world, She used this API to add features to our map as showing the connected cities, and the current player location. She created the overall design for the UI!

## Known Bugs
### As of now the only bug we have is that the months do not update with the changing of turns. Other than that we havent been able to detect anymore bugs through our testing.

## Technologies Used
* ### HTML
* ### CSS
* ### JavaScript
* ### MapBox API
* ### Jquery
* ### Webpacks
* ### Jest
* ### Babel
* ### Eslint

## License
### MIT
### Copyrigh (c) 2020 Krista Rutz, Steven Fleming, and Brevin Cronk