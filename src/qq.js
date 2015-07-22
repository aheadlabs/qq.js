/*!
 * qq.js
 * http://aheadlabs.com/projects/qq.es/
 * Version: 0.3
 *
 * Copyright 2015 Iván Sainz, Ahead Labs (http://aheadlabs.com)
 * Released under th GNU General Public License version 3
 * http://www.gnu.org/licenses/gpl-3.0.en.html
 * Contribute at https://github.com/aheadlabs/qq.js
 */

//#region classes

//Website class
function Website(debug, routes) {
    this.populateFormFields = false;
    this.populateFormFieldsFilter = undefined; //if undefined no filter is applied

    var _debug = debug; //if true, debug mode is on so it logs to console
    var _routes = routes;
    var _pathName = window.location.pathname;

    this.filterFormFields = function (value, index, array) {
        var result = true; //by default the field is not removed, so not filtered

        try {
            //iterate through filters to determine if the current value (field) complies to the filter
            for (var x = 0; x < this.length; x++) {
                if (value[0].indexOf(this[x]) == -1) {
                    result = false;
                }
                else {
                    result = true;
                    break;
                }
            }
            return result;
        } catch (e) {
            console.log("An error has ocurred filtering form fields, so no filters applied")
            return true; //by default the field is not removed, so not filtered
        }
    }

    //initializer
    this.init = function () {
        //log debug mode
        if (_debug) console.log("***Debug mode***");

        //vars
        var filteredFields = [];

        //process routes
        for (var i = 0; i < _routes.length; i++) {
            //console.log(compareRoutesToPath(routes[i].url));
            if (compareRoutesToPath(routes[i].url)) {
                if (_debug) console.log("[R] Processing route: " + routes[i].url);

                //filter form fields
                if (this.populateFormFieldsFilter != undefined && this.populateFormFieldsFilter.length > 0) {
                    var filtersConcat = this.populateFormFieldsFilter.join(" | ");
                    if (_debug) console.log("There is a filter defined for populating form fields.\nShowing only fields whose id contains => " + filtersConcat);
                    //recorrer filtros
                    filteredFields = routes[i].fieldset.filter(this.filterFormFields, this.populateFormFieldsFilter);
                }

                //set form fields
                if (this.populateFormFields) {
                    for (var j = 0; j < filteredFields.length; j++) {
                        if (_debug) console.log("Setting form field: " + filteredFields[j][0] + " <- " + filteredFields[j][1]);
                        $(filteredFields[j][0]).val(filteredFields[j][1]);
                    }
                }

                //call callbacks
                if (_debug) console.log("Making callbacks");
                for (var j = 0; j < routes[i].callbacks.length; j++) {
                    if (_debug) console.log(routes[i].callbacks[j]);
                    routes[i].callbacks[j].call(_debug);
                }

                break;
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

//Compares the passed route to the browser route
function compareRoutesToPath(route) {
    var splittedRoute = route.split("/");
    var splittedPath = window.location.pathname.split("/");
    var result = false;

    try {
        for (var i = 0; i < splittedRoute.length; i++) {
            if (splittedRoute[i] != splittedPath[i]) {
                if (splittedRoute[i] == "{id}" && !isNaN(splittedPath[i]))
                    result = true;
                else {
                    result = false;
                    break;
                }
            }
            else {
                result = true;
            }
        }
    } catch (e) {}
    finally {
        return result;
    }
}

//#endregion

//#region jQuery extensions
$.fn.digits = function (separator) {
    //use in code as $("span.numbers").digits(".");
    return this.each(function () {
        $(this).val($(this).val().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1" + separator));
    });
}
//#endregion
