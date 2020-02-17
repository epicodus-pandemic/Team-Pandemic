<!-- | Spec | Example Input | Expected Output |
| :-------------     | :------------- | :------------- |
|Creates three cities with 2 disease points on the board | 0 minutes| Seattle: diseaseCount: 0, Paris: diseaseCount: 0, Tokyo: diseaseCount: 2. | 
| "Infect" a city | Seattle: diseaseCount: 0, Paris: diseaseCount: 0, Tokyo: diseaseCount: 2 - => Infect Paris  | Seattle: diseaseCount: 0, Paris: diseaseCount: 1, Tokyo: diseaseCount: 2 |
| "Infect" a city after two minutes of time | Seattle: diseaseCount: 0, Paris: diseaseCount: 0, Tokyo: diseaseCount: 2 - => Infect Paris at 2 minute timer | Seattle: diseaseCount: 0, Paris: diseaseCount: 1, Tokyo: diseaseCount: 2 |
| "Infect" a same city after another two minutes of time |Seattle: diseaseCount: 0, Paris: diseaseCount: 1, Tokyo: diseaseCount: 2 - => Infect Paris at 4 minute timer | Seattle: diseaseCount: 0, Paris: diseaseCount: 2, Tokyo: diseaseCount: 2 |
| "Infect" nearby cities when the diseaseCount limit is maxed out at 3 | Seattle: diseaseCount: 0, Paris: diseaseCount: 3, Tokyo: diseaseCount: 2 - => Infect Paris | Seattle: diseaseCount: 1, Paris: diseaseCount: 3, Tokyo: diseaseCount: 3 |
| Randomize the city infections - every 2 minutes, the total of the existing diseaseCounts increases by 1 |Seattle: diseaseCount: 1, Paris: diseaseCount: 1, Tokyo: diseaseCount: 1 - => Infect X at 2 minute timer | Seattle: diseaseCount: 2, Paris: diseaseCount: 1, Tokyo: diseaseCount: 1 |
|construct a player class starting off with no moves| New game - 0 minutes |Player created|
| Player earns 1 move after 1 minute | Player: moveCount: 0, => 1 minute |Player: moveCount: 1|
| Player earns 1 move after 2 minutes | Player: moveCount: 1, => 2 minutes |Player: moveCount: 2|
| Player can "treat" disease in a city as 1 move | Player: moveCount: 1, Seattle: diseaseCount: 1, Paris: diseaseCount: 1, Tokyo: diseaseCount: 1 -- "treat" Seattle | Player: moveCount: 0, Seattle: diseaseCount: 0, Paris: diseaseCount: 1, Tokyo: diseaseCount: 1 |
| construct an active location feature for the "player"| 0 minutes| Player is "in" Seattle |
| Player can travel to a nearby city as 1 move | Player: moveCount: 1, location: Seattle; Seattle: diseaseCount: 1, Paris: diseaseCount: 1, Tokyo: diseaseCount: 1 -- move to Paris | Player: moveCount: 0, location: Paris; Seattle: diseaseCount: 1, Paris: diseaseCount: 1, Tokyo: diseaseCount: 1 | -->


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