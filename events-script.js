/**
 * This file contains all eveents present in game.
 *
 * @author Kero76
 * @since Mine 1.0
 * @version 1.0
 */

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
 * @since Mine 2.0
 * @version 1.0
 */
var minefield;
$(window).on('load', function() {
    // Regex used for block click when case is already clicked or discovered.
    var regex_left_click = /[0-8]|B|X/i;
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
        click : function() {
            if (!$(this).text().match(regex_left_click)) {
                $(this).text('B');
            }
        },
        // Right click action.
        contextmenu : function() {
            if (!$(this).text().match(regex_right_click)) {
                // if symbol not equals 'X', so flag case, else remove flag,
                if($(this).text() != "X") {
                    $(this).text('X');
                } else {
                    $(this).text('$');
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
        $(this).prop('disabled', true); // Disable button after clicking on it.
    }); // #mine-start-game click

    /**
     * Launch party in Easy mode.
     *
     * @since Mine 2.0
     * @version 1.0
     */
    var minefield;
    $('#mine-easy-difficulty').click(function() {
        minefield = new Minefield(10, 10, 10);
        console.log('Easy Minefield generated');
        undisplay_difficulty_nav();
    }); // #mine-easy-difficulty click

    /**
     * Launch party in Medium mode.
     *
     * @since Mine 2.0
     * @version 1.0
     */
    $('#mine-medium-difficulty').click(function() {
        minefield = new Minefield(15, 15, 30);
        console.log('Medium Minefield generated');
        undisplay_difficulty_nav();
    }); // #mine-meduim-difficulty click

    /**
     * Launch party in Hard mode.
     *
     * @since Mine 2.0
     * @version 1.0
     */
    $('#mine-hard-difficulty').click(function() {
        minefield = new Minefield(25, 25, 70);
        console.log('Hard Minefield generated');
        undisplay_difficulty_nav();
    }); // #mine-hard-difficulty click

    /**
     * Launch party in Suicide mode.
     *
     * @since Mine 2.0
     * @version 1.0
     */
    $('#mine-suicide-difficulty').click(function() {
        minefield = new Minefield(20, 20, 399);
        console.log('Suicide Minefield generated');
        undisplay_difficulty_nav();
    }); // #mine-suicide-difficulty click
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
     * Event generate by Reset button click.
     *
     * When the player click on the reset button, the game was reset at 0.
     * In fact, it undisplay difficulty choice is visible and available the button start game.
     * So, it reset the variable minefield at null, for destroy last instance of the object Minefield.
     *
     * @since Mine 2.0
     * @version 1.0
     */
    $('#mine-reset-game').click(function() {
        undisplay_difficulty_nav();
        $('#mine-start-game').prop('disabled', false);
        minefield = null;
    }); // #mine-reset-game click
}); // document ready

/**
 * Utilitary function use for undisplay difficulty menu.
 *
 * @since Mine 2.0
 * @version 1.0
 */
function undisplay_difficulty_nav() {
    $('#mine-nav-difficulty').css({
        'display' : 'none',
    }); // #mine-nav-difficulty css
}

