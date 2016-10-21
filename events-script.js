/**
 * This file contains all events present in game.
 *
 * v1.1 :
 *  - Added Chronometer on game for see time for win or loose your party.
 * 
 * @author Kero76
 * @since Mine 2.0
 * @version 1.1
 */

/**
 * Representation of an instance of Minefield class.
 *
 * @var Minefield
 * @since Mine 2.0
 * @version 1.0
 */
var minefield;

/**
 * Representation of an instance of MinefieldView class.
 *
 * @var MinefieldView
 * @since Mine 2.0
 * @version 1.0
 */
var minefieldView;

/**
 * Representation of an instance of Chronometer class.
 *
 * @var Chronometer
 * @since Mine 2.1
 * @version 1.0
 */
var chronometer;

/**
 * Generate events when mouse is enter or leave cells of the minefield.
 *
 * For execute function, we must delegate function after the creation of the cells of the table.
 * In fact, we generate minefield dynamically depending on the level of difficulty,
 * so the table element like tr and td not generate before trigger and §JQuery not execute function on it.
 * In conclusion, using function on and delegate event after DOM creation.
 *
 * /!\ Using function on('load', ...) instead of function .load() because with JQuery 3.X,
 * a bug appear when you try to used function load.
 *
 * v1.1 :
 *  - Added chronometer.stop().
 *
 * @since Mine 2.0
 * @version 1.1
 */
$(window).on('load', function() {
    // Regex used for block click when case is already clicked or discovered.
    var regex_left_click = /[0-8]|B|!/i;
    var regex_right_click = /[0-8]|B/i;

    $('#mine-minefield-table').on({
        // Mouse is over a <td> element.
        mouseenter : function() {
            $(this).css({
                'background': 'silver',
            });
        },
        // Mouse leave <td> element.
        mouseleave : function() {
            $(this).css({
                'background': 'none',
            });
        },
        // Left click action.
        click : function(e) {
            // Party lost, player can't click on new minefield case.
            if (minefieldView.getMinefield().getCanPlay() === false) {
                e.preventDefault();
            } else {
                if (!$(this).text().match(regex_left_click)) {
                    var split = $(this).attr('id').split('-');
                    var row = new Number(split[0].substring(1));
                    var col = new Number(split[1].substring(1));

                    // Reveal 0 case around case play.
                    minefieldView.getMinefield().displayCase(row, col);
                    minefieldView.updateView(row, col);
                }
            }
            // Stop chronometer if the game was win or lost.
            if (minefieldView.getMinefield().getCanPlay() === false) {
                chronometer.stop();
            }
        },
        // Right click action.
        contextmenu : function(e) {
            // Party lost, player can't click on new minefield case.
            if (minefieldView.getMinefield().getCanPlay() === false) {
                e.preventDefault();
            } else {
                if (!$(this).text().match(regex_right_click)) {
                    // if symbol not equals '!', so flag case, else remove flag,
                    if($(this).text() != "!") {
                        // Block number of mine mark.
                        minefieldView.getMinefield().setCurrentMarkMine(minefieldView.getMinefield().getCurrentMarkMine() - 1);
                        $(this).text('!').addClass('flag');
                        $('#mine-help-game').text(minefieldView.getMinefield().getCurrentMarkMine() + ' mines remaining');
                    } else {
                        minefieldView.getMinefield().setCurrentMarkMine(minefieldView.getMinefield().getCurrentMarkMine() + 1);
                        $(this).text('$').removeClass('flag');
                        $('#mine-help-game').text(minefieldView.getMinefield().getCurrentMarkMine() + ' mines remaining');
                    }
                }
                // Stop chronometer if the game was win or lost.
                if (minefieldView.getMinefield().getCanPlay() === false) {
                    chronometer.stop();
                }
            }
        },
    }, "tr td"); // #mine-minefield-table on

    /**
     * Display difficulty choice in page after a player click on Start Game button.
     *
     * @since Mine 2.0
     * @version 1.0
     */
    $('#mine-start-game').click(function() {
        $('#mine-nav-difficulty').css({
            'display' : 'block',
        }); // #mine-nav-difficulty css
    }); // #mine-start-game click

    /**
     * Launch party in Easy mode.
     *
     * v1.1 :
     *  - Added chronometer functions.
     *
     * @since Mine 2.0
     * @version 1.1
     */
    $('#mine-easy-difficulty').click(function() {
        $('#mine-minefield-table tr').remove();
        // Create Minefield and MinefieldView.
        minefield     = new Minefield(10, 10, 10);
        minefieldView = new MinefieldView(minefield);
        // Start Chronometer
        chronometer   = new Chronometer();
        $('#mine-chronometer').text(0 + " second");
        chronometer.start();
        undisplay_difficulty_nav();
        $('#mine-help-game').text(minefieldView.getMinefield().getCurrentMarkMine() + ' mines remaining');
    }); // #mine-easy-difficulty click

    /**
     * Launch party in Medium mode.
     *
     * v1.1 :
     *  - Added chronometer functions.
     *
     * @since Mine 2.0
     * @version 1.1
     */
    $('#mine-medium-difficulty').click(function() {
        $('#mine-minefield-table tr').remove();
        // Create Minefield and MinefieldView.
        minefield     = new Minefield(15, 15, 30);
        minefieldView = new MinefieldView(minefield);
        // Start Chronometer
        chronometer   = new Chronometer();
        $('#mine-chronometer').text(0 + " second");
        chronometer.start();
        undisplay_difficulty_nav();
        $('#mine-help-game').text(minefieldView.getMinefield().getCurrentMarkMine() + ' mines remaining');
    }); // #mine-meduim-difficulty click

    /**
     * Launch party in Hard mode.
     *
     * v1.1 :
     *  - Added chronometer functions.
     *
     * @since Mine 2.0
     * @version 1.1
     */
    $('#mine-hard-difficulty').click(function() {
        $('#mine-minefield-table tr').remove();
        // Create Minefield and MinefieldView.
        minefield     = new Minefield(25, 25, 70);
        minefieldView = new MinefieldView(minefield);
        // Start Chronometer
        chronometer   = new Chronometer();
        $('#mine-chronometer').text(0 + " second");
        chronometer.start();
        undisplay_difficulty_nav();
        $('#mine-help-game').text(minefieldView.getMinefield().getCurrentMarkMine() + ' mines remaining');
    }); // #mine-hard-difficulty click

    /**
     * Launch party in Suicide mode.
     *
     * v1.1 :
     *  - Added chronometer functions.
     *
     * @since Mine 2.0
     * @version 1.1
     */
    $('#mine-suicide-difficulty').click(function() {
        $('#mine-minefield-table tr').remove();
        // Create Minefield and MinefieldView.
        minefield     = new Minefield(20, 20, 399);
        minefieldView = new MinefieldView(minefield);
        // Start Chronometer
        chronometer   = new Chronometer();
        $('#mine-chronometer').text(0 + " second");
        chronometer.start();
        undisplay_difficulty_nav();
        $('#mine-help-game').text(minefieldView.getMinefield().getCurrentMarkMine() + ' mines remaining');
    }); // #mine-suicide-difficulty click

    // Display chronometer when is activated.
    display_chronometer();
}); // window on

/**
 * Function call after the document is completely loaded.
 *
 * @since Mine 2.0
 * @version 1.0
 */
$(document).ready(function() {

    /**
     * Disabled context menu when right click on mouse.
     *
     * @since Mine 2.0
     * @version 1.0
     */
    $(document).on('contextmenu', 'html', function(e) {
        e.preventDefault();
        return false;
    }); // document on
    
    /**
     * Disabled mouse selection.
     *
     * @since Mine 2.0
     * @version 1.0
     */
    $(document).mousedown(function(e) {
        e.preventDefault();
    });
    
    /**
     * Event generate by Reset button click.
     *
     * When the player click on the reset button, the game was reset at 0.
     * In fact, it undisplay difficulty choice is visible and available the button start game.
     * So, it removed too <tr> element of Minefield because the player reset party.
     *
     * v1.1 :
     *  - Added chronometer.reset().
     *
     * @since Mine 2.0
     * @version 1.1
     */
    $('#mine-reset-game').click(function() {
        undisplay_difficulty_nav();
        $('#mine-start-game').prop('disabled', false);
        $('#mine-minefield-table tr').remove();
        $('#mine-result-game').text('');
        $('#mine-help-game').text('');

        if (minefieldView !== undefined) {
            $('#mine-help-game').text(minefieldView.getMinefield().getCurrentMarkMine() + ' mines remaining');
            $('#mine-chronometer').text(0 + " second");
            minefieldView = new MinefieldView(new Minefield(minefield.getRowCount(), minefield.getColumnCount(), minefield.getMaxMine()));
            chronometer.reset();
        }
    }); // #mine-reset-game click
}); // document ready

/**
 * Utility function use for undisplay difficulty menu.
 *
 * @since Mine 2.0
 * @version 1.0
 */
function undisplay_difficulty_nav() {
    $('#mine-nav-difficulty').css({
        'display' : 'none',
    }); // #mine-nav-difficulty css
}

/**
 * Display the Chronometer.
 *
 * @since Mine 2.1
 * @version 1.0
 */
function display_chronometer() {
    setInterval(function() {
        if (chronometer !== undefined && chronometer.isOn()) {
            chronometer.increments_seconds();
            if (chronometer.display() === 1) {
                $('#mine-chronometer').text(chronometer.display() + " second");
            } else {
                $('#mine-chronometer').text(chronometer.display() + " seconds");
            }
        }
    }, 1000);
}
