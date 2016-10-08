/**
 * Minefield class represent the 2D array use on game.
 *
 * @author TeeGreg, Kero76
 * @since Mine 2.0
 * @version 1.0
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
 * @version 1.0
 */
function Minefield(row, col, mine_number) {
    // Initialized constructor attributes.
    this.mine  = new Array();
    this.help  = new Array();
    this.guess = new Array();
    this.max_mine = mine_number;
    this.current_mark_mine = mine_number;
    this.current_case_reveal = 0;
    this.can_play = true;

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
            placed_mine++;
            if (this.testCoordinate(rdm_row + 1, rdm_col    )) { this.help[rdm_row + 1][rdm_col    ] += 1; }
            if (this.testCoordinate(rdm_row + 1, rdm_col + 1)) { this.help[rdm_row + 1][rdm_col + 1] += 1; }
            if (this.testCoordinate(rdm_row + 1, rdm_col - 1)) { this.help[rdm_row + 1][rdm_col - 1] += 1; }
            if (this.testCoordinate(rdm_row    , rdm_col + 1)) { this.help[rdm_row    ][rdm_col + 1] += 1; }
            if (this.testCoordinate(rdm_row    , rdm_col - 1)) { this.help[rdm_row    ][rdm_col - 1] += 1; }
            if (this.testCoordinate(rdm_row - 1, rdm_col    )) { this.help[rdm_row - 1][rdm_col    ] += 1; }
            if (this.testCoordinate(rdm_row - 1, rdm_col + 1)) { this.help[rdm_row - 1][rdm_col + 1] += 1; }
            if (this.testCoordinate(rdm_row - 1, rdm_col - 1)) { this.help[rdm_row - 1][rdm_col - 1] += 1; }
        }
    }
};

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
 * @version 1.0
 */
Minefield.prototype.updateGuess = function(row, col) {
    // If click case not click before, mark it like clicked.
    if (this.guess[row][col] == false) {
        this.guess[row][col] = true;
        this.current_case_reveal++;

        // If help array contains 0, then it reveal other case all around the 0 case.
        if (this.help[row][col] == 0) {
            if (this.testCoordinate(row + 1, col    )) { this.updateGuess(row + 1, col    ); }
            if (this.testCoordinate(row + 1, col + 1)) { this.updateGuess(row + 1, col + 1); }
            if (this.testCoordinate(row + 1, col - 1)) { this.updateGuess(row + 1, col - 1); }
            if (this.testCoordinate(row,     col + 1)) { this.updateGuess(row,     col + 1); }
            if (this.testCoordinate(row,     col - 1)) { this.updateGuess(row,     col - 1); }
            if (this.testCoordinate(row - 1, col    )) { this.updateGuess(row - 1, col    ); }
            if (this.testCoordinate(row - 1, col + 1)) { this.updateGuess(row - 1, col + 1); }
            if (this.testCoordinate(row - 1, col - 1)) { this.updateGuess(row - 1, col - 1); }
        }
    }
};

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
 * @version 1.0
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
};

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
 * @version 1.0
 */
Minefield.prototype.displayCase = function(row, col) {
    this.updateGuess(row, col);
};

/**
 * This function return the number of lines who composed Minefield.
 *
 * @return integer
 *  Return the number of line in the minefield.
 * @since Mine 2.0
 * @version 1.0
 */
Minefield.prototype.getRowCount = function() {
    return this.guess.length;
};

/**
 * This function return the number of column who composed Minefield.
 *
 * @return integer
 *  Return the number of column in the minefield.
 * @since Mine 2.0
 * @version 1.0
 */
Minefield.prototype.getColoumnCount = function() {
    return this.guess[0].length;
};

/**
 * This function return the specific case on Help array.
 *
 * @param integer row
 *  The current row used.
 * @param integer col
 *  The current col used.
 * @return number
 *  Return the specific case on Help array.
 * @since Mine 2.0
 * @version 1.0
 */
Minefield.prototype.getHelp = function(row, col)  {
    return this.help[row][col];
};

/**
 * This function return the specific case on Guess array.
 *
 * @param integer row
 *  The current row used.
 * @param integer col
 *  The current col used.
 * @return boolean
 *  Return the specific case on Guess array.
 * @since Mine 2.0
 * @version 1.0
 */
Minefield.prototype.getGuess = function(row, col)  {
    return this.guess[row][col];
};

/**
 * Set the specific case on Guess array.
 *
 * @param integer row
 *  The current row used.
 * @param integer col
 *  The current col used.
 * @since Mine 2.0
 * @version 1.0
 */
Minefield.prototype.setGuess = function(row, col)  {
    this.guess[row][col] = true;
};

/**
 * Return the number of Mine mark.
 *
 * @since Mine 2.0
 * @version 1.0
 */
Minefield.prototype.getCurrentMarkMine = function() {
    return this.current_mark_mine;
};

/**
 * Set the number of mine mark.
 *
 * @param integer mark_mine_nb
 *  The new value of current mark mine.
 * @since Mine 2.0
 * @version 1.0
 */
Minefield.prototype.setCurrentMarkMine = function(mark_mine_nb) {
    this.current_mark_mine = mark_mine_nb;
};


/**
 * Return the number of Mine on minefield.
 *
 * @since Mine 2.0
 * @version 1.0
 */
Minefield.prototype.getMaxMine = function() {
    return this.max_mine;
}

/**
 * Set the boolean can_play.
 *
 * @param boolean can_play
 *  The boolean can_play
 * @since Mine 2.0
 * @version 1.0
 */
Minefield.prototype.setCanPlay = function(can_play) {
    this.can_play = can_play;
};


/**
 * Return the number of Mine on minefield.
 *
 * @return boolean
 *  Return if player can play.
 * @since Mine 2.0
 * @version 1.0
 */
Minefield.prototype.getCanPlay = function() {
    return this.can_play;
}


/**
 * Return the number of case reveal during a party.
 *
 * @return integer
 *  Return the number of case reveal in game.
 * @since Mine 2.0
 * @version 1.0
 */
Minefield.prototype.getCurrentCaseReveal = function() {
    return this.current_case_reveal;
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
 * @since Mine 2.0
 * @version 1.0
 */
Minefield.prototype.testCoordinate = function(row, col)  {
    return 0 <= row && row < this.getRowCount() && 0 <= col && col < this.getColoumnCount();
};

/**
 * Function generated random number.
 *
 * @param integer min
 *  The minimum value of random.
 * @param integer max
 *  The maximum value of random.
 * @return number
 *  A random generated number between min and max value.
 * @since Mine 2.0
 * @version 1.0
 */
Minefield.prototype.rand = function(min, max) {
    return Math.floor((Math.random() * (max - min + 1)) + min);
};

/**
 * Function use for test if the player have click on mine or not.
 *
 * @param integer row
 *  The row of the case at see if the mine is under the case.
 * @param integer col
 *  The column of the case at see if the mine is under the case.
 * @return boolean
 *  Return the statement of the mine case.
 * @since Mine 2.0
 * @version 1.0
 */
Minefield.prototype.fail = function(row, col) {
    return this.mine[row][col];
};

/**
 * Function use for test if the player win the party or not.
 * 
 * For compute the result, it check the number of case (row * column) which it substract the number of mine present in Minefield.
 * At the result, it substract the number of current case reveal on party.
 * If the result is 0, it return true. Otherwise, it return false and can continue to play.
 *
 * @return boolean
 *  Return if the player win or not the game.
 * @since Mine 2.0
 * @version 1.0
 */
Minefield.prototype.win = function() {
    if (((this.getRowCount() * this.getColoumnCount() -  this.getMaxMine()) - this.getCurrentCaseReveal()) === 0) {
        return true;
    }
    return false;
};
