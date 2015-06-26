//Please, reference /src/qq.js in your application in order to make it work


//This could be in an anonymous funtion like here, in the $(document).ready() jQuery event, etc...
(function () {
    //Create routes array. Each route has a relative URL from the root, an array of fields (id,value) and an array of callback functions
    var routes = [
        new Route(
            "/dealership/rating/new",
            [
                [id = "#Contact_name", value = "Name"],
                [id = "#Contact_lastName", value = "Last name"],
                [id = "#Contact_mobilePhone", value = "+34600000000"],
                [id = "#Contact_email", value = "name@domain.es"],
                [id = "#Contact_company", value = "Company"],
                [id = "#Vehicle_brand", value = "Audi"],
                [id = "#Vehicle_model", value = "RS6 Avant"],
                [id = "#Vehicle_version", value = "4.0 TFSI Quattro Tiptronic"],
                [id = "#Rating_minimumRatingAmount", value = "2500"],
                [id = "#Rating_maximumRatingAmount", value = "4300"]
            ],
            [callback1, callback2]
        )
    ];

    //Create the object, passing a boolean value indicating if we are in debug mode and the routes object
    var myWebsite = new Website(true, routes);

    //Set if form fields will or will not be populated
    myWebsite.populateFormFields = true;
    
    //set up the filters
    tc.populateFormFieldsFilter = ["#Contact_", "#Rating_"]; //here, the #Vehicle fields won't be processed

    //init the process
    myWebsite.init();
})();

//Callback functions, if you need them. Define as many as you need.
//If you define a debug boolean variable in your callbacks we will pass the qq debug variable value, so you can control if logging to console or whatever you need to do in debug mode
function callback1(debug) {
    //your code here
}

function callback2(debug) {
    //your code here
}