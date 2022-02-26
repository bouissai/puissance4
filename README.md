## Development server

Run `npm install` then to manage dark mode run `npm i angular-dark-mode --force` 
run the serve with `ng serve`. 
Navigate to `http://localhost:4200/` to see my connect 4.

# Running unit tests
Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).
I made few test for my service function in app/connect4.service.spec.ts

## Rules

To play, the players must decide who starts first.
Player 1 can place his token now.
Player 2 must select his piece manually and then place it on the board. 
If it's not your turn to play, a window will warn you to change your token. 
If there is a tie you can restart the game with the retry button

# recruitment-frontend-exercise

Create a Connect 4 on Angular latest version and Angular Material framework.

## Required : 
- HTML5 (BEM syntax) + SCSS integration.
- Responsive and animation management: users must be able to play on their mobile.
- Implementation of components, services, directives related to the logic of the game.
- The use of store(s) via ngxs is also required.
- Code documentation.
  
## Bonus:
- User preferences: management of themes (dark / light mode) according to material design logic.
- Use CSS Variables
- Implementation of unit and / or end to end (cypress) tests.
- SVG animation(s).
- i18n / a11y friendly.
  
## Rules of the game:
The goal of the game is to line up a series of 4 pawns of the same color on a grid with 6 rows and 7 columns.

Each player has 21 pawns of one color (by convention, usually yellow or red). Alternately, the two players place a pawn in the column of their choice, the pawn then slides to the lowest possible position in the said column.

The winner is the player who first achieves a consecutive alignment (horizontal, vertical or diagonal) of at least four pawns of his color. If, while all the squares of the game grid are filled, neither of the two players has made such an alignment, the game end in a tie.

## Extra information:

The use of third-party libraries is authorised but not encouraged.
Use Angular framework on latest versions.

No AI is needed, each player plays one after the other.
