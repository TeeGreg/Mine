/**
 *
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
 * @param integer bomb_number
 *  Number of bomb placed on minefield.
 * @since Mine 2.0
 * @version 0.1
 */
function Minefield(row, col, bomb_number) {
    // Initialized constructor attributes.
    this.mine  = new Array();
    this.help  = new Array();
    this.guess = new Array();
    this.max_mine = bomb_number;

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
        var rdm_row = rand(0, row - 1);
        var rdm_col = rand(0, col - 1);
        // If the case not contains mine, so added it on case and added counting help case..
        if (this.mine[rdm_row][rdm_col] == false) {
            this.mine[rdm_row][rdm_col] = true;
            placed_mine++;
            if (testCoordinate(rdm_row, rdm_col)) { this.help[rdm_row + 1][rdm_col    ]++; }
            if (testCoordinate(rdm_row, rdm_col)) { this.help[rdm_row + 1][rdm_col + 1]++; }
            if (testCoordinate(rdm_row, rdm_col)) { this.help[rdm_row + 1][rdm_col - 1]++; }
            if (testCoordinate(rdm_row, rdm_col)) { this.help[rdm_row    ][rdm_col + 1]++; }
            if (testCoordinate(rdm_row, rdm_col)) { this.help[rdm_row    ][rdm_col - 1]++; }
            if (testCoordinate(rdm_row, rdm_col)) { this.help[rdm_row - 1][rdm_col    ]++; }
            if (testCoordinate(rdm_row, rdm_col)) { this.help[rdm_row - 1][rdm_col + 1]++; }
            if (testCoordinate(rdm_row, rdm_col)) { this.help[rdm_row - 1][rdm_col - 1]++; }
        }
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
    function getGuess(row, col) {
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
    function testCoordinate(row, col)  {
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
    function rand(min, max) {
        return Math.floor((Math.random() * (max - min + 1)) + max);
    }
}
