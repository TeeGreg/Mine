/**
 * Minefield class represent the 2D array use on game.
 *
 * @author Kero76, TeeGreg
 * @since Mine 2.0
 * @version 0.1
 */

/**
 * Constructor of the class Minefield which represent the minefield who played the player.
 *
 * @constructor
 * @param integer row
 *  Number of row for the minefield.
 * @param integer col
 *  Number of column for the minefield.
 * @param integer mine_number
 *  Number of bomb placed on minefield.
 * @since Mine 2.0
 * @version 0.1
 */
function Minefield(row, col, mine_number) {
    // Initialized constructor attributes.
    this.mine  = new Array();
    this.help  = new Array();
    this.guess = new Array();
    this.max_mine = mine_number;

    // Loop on all row of the minefield.
    for (var line = 0; line < row; line++) {
        // Create at each row a new array for generate array at 2 dimensions.
        this.mine[line]  = new Array();
        this.help[line]  = new Array();
        this.guess[line] = new Array();

        // Fill all array with initial value.
        for (var column = 0; column < col; column++) {
            this.mine[line][column]  = false;
            this.help[line][column]  = 0;
            this.guess[line][column] = false;

            console.log('= ROW ' + line + ' = COL = ' + column + ' =');
            console.log('Mine ' + this.mine[line][column]);
            console.log('Help ' + this.help[line][column]);
            console.log('Guess ' + this.guess[line][column]);
        }
    }

    // While bomb counter not equals at the placed counter, loop.
    var placed_mine = 0;
    while (placed_mine != this.max_mine) {
        // Generate random row and col for add possible Mine.
        var rdm_row = this.rand(0, row - 1);
        var rdm_col = this.rand(0, col - 1);
        // If the case not contains mine, so added it on case and added counting help case.
        if (this.mine[rdm_row][rdm_col] == false) {
            this.mine[rdm_row][rdm_col] = true;
            console.log("col : " + rdm_col + " row : " + rdm_row);

            placed_mine++;
            if (this.testCoordinate(rdm_row, rdm_col)) { this.help[rdm_row + 1][rdm_col    ]++; }
            if (this.testCoordinate(rdm_row, rdm_col)) { this.help[rdm_row + 1][rdm_col + 1]++; }
            if (this.testCoordinate(rdm_row, rdm_col)) { this.help[rdm_row + 1][rdm_col - 1]++; }
            if (this.testCoordinate(rdm_row, rdm_col)) { this.help[rdm_row    ][rdm_col + 1]++; }
            if (this.testCoordinate(rdm_row, rdm_col)) { this.help[rdm_row    ][rdm_col - 1]++; }
            if (this.testCoordinate(rdm_row, rdm_col)) { this.help[rdm_row - 1][rdm_col    ]++; }
            if (this.testCoordinate(rdm_row, rdm_col)) { this.help[rdm_row - 1][rdm_col + 1]++; }
            if (this.testCoordinate(rdm_row, rdm_col)) { this.help[rdm_row - 1][rdm_col - 1]++; }
        }
    }
}

/**
 * Function use for update Guess array after player action in minefield.
 *
 * This function is call only if the current case not clicked before player'action.
 * In fact, we can click on case only if this case not played before.
 * Otherwise, we can't click on this case, and don't calling this function.
 *
 * @param integer row
 *  Row explore.
 * @param integer col
 *  Column explore.
 * @since Mine 2.0
 * @version 0.1
 */
Minefield.prototype.updateGuess = function(row, col) {
    // If click case not click before, mark it like clicked.
    if (!this.guess[row][col]) {
        this.guess[row][col] = true;

        // If help array contains 0, then develop increment value around initial case.
        if ( this.help[row][col] == 0) {
            if (testforcoord(row + 1, col    )) { this.updateGuess(row + 1, col    ); }
            if (testforcoord(row - 1, col    )) { this.updateGuess(row - 1, col    ); }
            if (testforcoord(row + 1, col + 1)) { this.updateGuess(row + 1, col + 1); }
            if (testforcoord(row + 1, col - 1)) { this.updateGuess(row + 1, col - 1); }
            if (testforcoord(row - 1, col + 1)) { this.updateGuess(row - 1, col + 1); }
            if (testforcoord(row - 1, col - 1)) { this.updateGuess(row - 1, col - 1); }
            if (testforcoord(row,     col + 1)) { this.updateGuess(row,     col + 1); }
            if (testforcoord(row,     col - 1)) { this.updateGuess(row,     col - 1); }
        }
    }
}

/**
 * Function use for mark Mine position on array.
 *
 * This function is use when a player use right click for mark position
 * in minefield. We call this function when we catch a contextmenu event.
 *
 * @param integer row
 *  Row explore.
 * @param integer col
 *  Column explore.
 * @since Mine 2.0
 * @version 0.1
 */
Minefield.prototype.markMine = function(row, col) {
    // Mark case because possible mine here
    if (this.guess[row][col] == false) {
        this.guess[row][col] = -1;
    } else {
        // A bomb was here.
        if (this.guess[row][size] == -1) {
            this.guess[row][col] = -1;
        } else {
            // Bomb not here.
            this.guess[row][col] = false;
        }
    }
}

/**
 * Function callback after player's action.
 *
 * This function is a wrapper function because, it can possible to
 * call directly updateGuess, but it's more simply to call displayCase
 * when left click event is catching.
 *
 * @param integer row
 *  Row explore.
 * @param integer col
 *  Column explore.
 * @since Mine 2.0
 * @version 0.1
 */
Minefield.prototype.displayCase = function(row, col) {
    this.updateGuess(row, col);
}

/**
 * This function return the case select by player.
 *
 * @param integer row
 *  The row where the player click.
 * @param integer col
 *  The column where the player click.
 * @return
 *  Return the case selected by player.
 * @since Mine 2.0
 * @version 0.1
 */
Minefield.prototype.getGuess = function(row, col) {
    return this.guess[row][col];
}

/**
 * Test if the coordinates are good or false.
 *
 * @param integer row
 *  The current row used.
 * @param integer col
 *  The current col used.
 * @return boolean
 *  The statement of the boolean expression.
 */
Minefield.prototype.testCoordinate = function(row, col)  {
    return row >= 0 && row < this.guess.length && col >= 0 && col < this.guess[0].length;
}

/**
 * Function generated random number.
 *
 * @param integer min
 *  The minimum value of random.
 * @param integer max
 *  The maximum value of random.
 * @return {number}
 *  A random generated number between min and max value.
 */
Minefield.prototype.rand = function(min, max) {
    return Math.floor((Math.random() * (max - min + 1)) + min);
}
