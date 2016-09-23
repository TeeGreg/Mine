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
 * @TODO
 *  This function is work in progress, so currently,
 *  it change background when the cursor of mouse is hover an cell td of the second table.
 *
 * @since Mine 1.0
 * @version 1.0
 */
$(window).on('load', function() {
    $('#minefield').on({
        mouseenter: function() {
            $(this).css({
                'background': 'blue',
            });
        },
        mouseleave: function() {
            $(this).css({
                'background': 'none',
            });
        }
    }, "tr td");
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
    });
});