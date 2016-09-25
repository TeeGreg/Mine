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
 * @TODO
 *  This function is work in progress, so currently,
 *  it change background when the cursor of mouse is hover an cell td of the second table.
 *
 * @since Mine 1.0
 * @version 1.0
 */
$(window).on('load', function() {
    // Regex used for block click when case is already clicked or discovered.
    var regex_left_click = /[0-8]|B|X/i;
    var regex_right_click = /[0-8]|B/i;

    $('#minefield').on({
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
    }, "tr td"); // #minefield on
}); // window on

/**
 * Disabled context menu when right click on mouse.
 *
 * @since Mine 1.0
 * @version 1.0
 */
$(document).ready(function() {
    $(document).on('contextmenu', 'html', function(e) {
        e.preventDefault();
        return false;
    }); // document on
}); // document ready