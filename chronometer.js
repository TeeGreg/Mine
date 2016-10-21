/**
 * Chronometer class represent the chronometer using in game.
 *
 * @author Kero76
 * @since Mine 2.1
 * @version 1.0
 */

/**
 * Constructor of the class Chronometer which represent the time during one party.
 *
 * @constructor
 * @since Mine 2.1
 * @version 1.0
 */
function Chronometer() {
    this.seconds = 0;
    this.on = false;
}

/**
 * Start the Chronometer.
 *
 * @since Mine 2.1
 * @version 1.0
 */
Chronometer.prototype.start = function() {
    this.on = true;
};

/**
 * Stop the Chronometer.
 *
 * @since Mine 2.1
 * @version 1.0
 */
Chronometer.prototype.stop = function() {
    if (this.isOn() === true) {
        this.on = false;
    }
};

/**
 * Reset Chronometer.
 *
 * @since Mine 2.1
 * @version 1.0
 */
Chronometer.prototype.reset = function() {
    this.stop();
    this.seconds = 0;
    this.start();
};

/**
 * Display seconds.
 *
 * @since Mine 2.1
 * @version 1.0
 */
Chronometer.prototype.display = function() {
    return this.seconds;
};

/**
 * Increments seconds for function setInterval.
 *
 * @since Mine 2.1
 * @version 1.0
 */
Chronometer.prototype.increments_seconds = function() {
    this.seconds++;
};

/**
 * Return if the Chronometer is already start.
 *
 * @return boolean
 *  True if the chronometer is on or false if it not start.
 * @since Mine 2.1
 * @version 1.0
 */
Chronometer.prototype.isOn = function() {
    return this.on;
}