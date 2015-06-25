/*!
 * qq.js
 * http://aheadlabs.com/projects/qq.es/
<<<<<<< HEAD
 * Version: 0.1.1
=======
 * Version: 0.1
>>>>>>> de690cca304ab15db9d50ab37bc71d8253c9fa62
 *
 * Copyright 2015 Iván Sainz, Ahead Labs (http://aheadlabs.com)
 * Released under th GNU General Public License version 3
 * http://www.gnu.org/licenses/gpl-3.0.en.html
 * Contribute at https://github.com/aheadlabs/qq.js
 */

//#region classes

//Website class
function Website(debug, routes) {
    var _debug = debug; //if true, debug mode is on so it logs to console
    var _routes = routes;
    var _pathName = window.location.pathname;

    this.populateFormFields = false;

    //initializer
    this.init = function () {
        //log debug mode
        if (_debug) console.log("***Debug mode***");

        //process routes
        for (var i = 0; i < _routes.length; i++) {
            if (routes[i].url == window.location.pathname) {
                if (_debug) console.log("Processing route: " + routes[i].url);

                //set form fields
                if (this.populateFormFields) {
                    for (var j = 0; j < routes[i].fieldset.length; j++) {
                        if (_debug) console.log("Setting form field: " + routes[i].fieldset[j][0] + " <- " + routes[i].fieldset[j][1]);
                        $(routes[i].fieldset[j][0]).val(routes[i].fieldset[j][1]);
                    }
                }

                //call callbacks
                if (_debug) console.log("Making callbacks");
                for (var j = 0; j < routes[i].callbacks.length; j++) {
                    if (_debug) console.log(routes[i].callbacks[j]);
                    routes[i].callbacks[j].call(_debug);
                }
            }
        }
    };
}

//Route class
function Route(url, fieldset, callbacks) {
    //URL
    this.url = url;

    /*fieldset to initialize {id, value}
        id: jQuery CSS format
        value: text, boolean or id depending on the element type*/
    this.fieldset = fieldset;

    //callbacks
    this.callbacks = callbacks;
};

//#endregion

//#region jQuery extensions
$.fn.digits = function (separator) {
    //use in code as $("span.numbers").digits(".");
    return this.each(function () {
        $(this).val($(this).val().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1" + separator));
    });
}
//#endregion
