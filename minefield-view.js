/**
 * MinefieldView class represent the view of the Minefield class.
 *
 * @author Kero76
 * @since Mine 2.0
 * @version 0.1
 */

/**
 * Constructor of the class MinefieldView which represent the minefield view on Game.
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
function MinefieldView(minefield) {
    this.minefield = minefield;

    // Research table.
    var minefield = document.getElementById('mine-minefield-table');

    // Initialized variables.
    var tr = '';
    var td = '';
    var text = '';

    // Loop for generate all tr on table.
    for (var tr_index = 0; tr_index < this.minefield.getRowCount(); tr_index++) {
        tr = document.createElement('tr');
        minefield.appendChild(tr);
        // Loop for generate all buttons on td and td on tr.
        for (var td_index = 0; td_index < this.minefield.getColoumnCount(); td_index++) {
            td = document.createElement('td');
            td.setAttribute('id', 'r' + tr_index + '-c' + td_index); // Use for retrieve coordinate on JQuery
            text = document.createTextNode('$');
            td.appendChild(text);
            tr.appendChild(td);
        }
    }
};

/**
 * Function use for update View when player click on specific case.
 *
 * @param integer row
 *  Row where player click.
 * @param integer col
 *  Column where player click.
 * @since Mine 2.0
 * @version 0.1
 */
MinefieldView.prototype.updateView = function(row, col) {
    // Game lost.
    if (this.minefield.fail(row, col)) {
        $('#r' + row + '-c' + col).text('B');
        $('#mine-result-game').text('You loose !');
    } else {
        // Loop ? Because when the 0 is reveal, all 0 around not reveal too.
        if (this.minefield.getHelp(row, col) === 0) {
            this.minefield.setGuess(row, col);
            $('#r' + row + '-c' + col).text(this.minefield.getHelp(row, col));
        }
        // Reveal case with other content, except bomb.
        else {
            $('#r' + row + '-c' + col).text(this.minefield.getHelp(row, col));
            this.minefield.setGuess(row, col);
        }
    }
};

/**
 *  Return the Minefield Model.
 *
 * @return Minefield
 *  Return the model of the View.
 * @since Mine 2.0
 * @version 0.1
 */
MinefieldView.prototype.getMinefield = function() {
    return this.minefield;
};