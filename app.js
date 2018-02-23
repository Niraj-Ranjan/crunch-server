//==============================================================================

/* 
 * Author: Krushn Dayshmookh
 *
 *  THIS FILE HAS BEEN MADE SPECIFICIALLY TO WORK WITH HEROKU.
 *
 *
 */









/****************************
 *                          *
 *   GLOBAL DECLARATIONS    ****************************************************
 *                          *
 ****************************
 */


var express = require('express');
var fs = require('fs');
var bodyParser = require('body-parser');

//var config = require('./config');



var appport = process.env.PORT || 3000;
var mongolaburi = process.env.MONGOLAB_URI || "mongodb://clavi:clavidbpassword@ds117592.mlab.com:17592/clavi";




/****************************
 *                          *
 *         APP DATA         ****************************************************
 *                          *
 ****************************


 * This part is used for serving the app data which will be accessible througn the app.
 * Ex:
 *     User information, academics
 *     Requests for canteen order
 *
 */


var app = express();


app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

/*   --- this is user prototype that is saved in database
var user = function (uid, uname, type, email, passwd) {
    this.uid = uid;
    this.name = uname;
    this.type = type;
    this.email = email;
    this.password = passwd;
};
*/

var MongoClient = require('mongodb').MongoClient;



// Connection URL
var url = mongolaburi;



// Use connect method to connect to the server


// https://scotch.io/tutorials/use-expressjs-to-get-url-and-post-parameters
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({
    extended: true
})); // support encoded bodies





app.post('/login', function (req, res) {
    //console.log(req.body);

    var username = req.body.uname;

    var password = req.body.pword;

    MongoClient.connect(url, function (err, db) {

        if (err) {
            throw err;
        }

        //console.log("Connected successfully to server");

        var users = db.collection('users');

        users.findOne({
            id: username
        }, function (err1, data) {
            if (err1) {
                throw err1;
            }

            if (data !== null) {

                if (data.password == password) {
                    res.send(data);

                    //console.log(username + " logged in.");
                } else {
                    res.send("false");
                    //console.log(username + " entered incorrect password.");
                }

            } else {
                res.send("invalid");
                //console.log(username + " does not exist.");
            }
            db.close();
        });
    });


});

app.post('/passwordreset', function (req, res) {



    MongoClient.connect(url, function (err, db) {

        if (err) {
            throw err;
        }

        //console.log("Connected successfully to server");

        var users = db.collection('users');

        users.findOne({
            email: req.body.email
        }, function (err1, data) {
            if (err1) {
                throw err1;
            }

            if (data !== null) {

                fs.readFile(__dirname + "/data/users/forgotpassword.json", function (err, absentmindeduserslist) {

                    var absentmindedusers = JSON.parse(absentmindeduserslist);

                    absentmindedusers.push(data);

                    fs.writeFile(__dirname + "/data/users/forgotpassword.json", JSON.stringify(absentmindedusers), "utf8", function (err) {
                        if (err) {
                            throw 'error writing file: ' + err;
                        }
                        res.send("success");
                    });

                });
            } else {
                res.send("failure");
                //console.log(username + " does not exist.");
            }
            db.close();
        });
    });


});





/****************************
 *                          *
 *       DATA-SERVER        ****************************************************
 *                          *
 ****************************
 */



app.use(express.static(__dirname + '/www'));


app.get('/rates', function (req, res) {

    fs.readFile(__dirname + "/data/canteen/rates.json", function (err, ratedata) {
        var rates = JSON.parse(ratedata);
        res.send(rates);

    });

});

app.post('/canteen/order', function (req, res) {


    var orders = req.body.orders;
    // Get canteen orders file and append the request to the file using writefile.


    var username = orders[0]["username"];
    // that will be done here.



    //console.log(orders);

    //console.log(orders[0]["username"]);

    //res.send("success");
    // handle for student side.

    MongoClient.connect(url, function (err, db) {

        if (err) {
            throw err;
        }

        //console.log("Connected successfully to server");

        var users = db.collection('users');

        users.findOne({
            id: username
        }, function (err1, userdata) {
            if (err1) {
                throw err1;
            }

            if (userdata !== null) {

                var usercanteenpath = "/data/users/" + userdata.type + "/" + username + "/data/canteen/orders.json";

                fs.readFile(__dirname + usercanteenpath, function (err, orderdata) {

                    var oldorders = JSON.parse(orderdata);

                    //console.log(oldorders);

                    for (var order in orders) {

                        oldorders.push(orders[order]);
                    }



                    fs.writeFile(__dirname + usercanteenpath, JSON.stringify(oldorders), "utf8", function (err) {
                        if (err) {
                            throw err;
                        }

                        fs.readFile(__dirname + "/data/canteen/orders.json", function (err, orderlist) {

                            var openorders = JSON.parse(orderlist);

                            for (var order in orders) {

                                openorders["open"].push(orders[order]);
                            }


                            fs.writeFile(__dirname + "/data/canteen/orders.json", JSON.stringify(openorders), "utf8", function (err) {
                                if (err) {
                                    throw err;

                                }
                                res.send("success");
                            });

                        });
                    });




                });


            } else {
                res.send("failure");
                // console.log(username + " does not exist.");
            }




            db.close();
        });
    });




});


app.get('/canteen/myorders', function (req, res) {



    MongoClient.connect(url, function (err, db) {

        if (err) {
            throw err;
        }

        //console.log("Connected successfully to server");

        var users = db.collection('users');

        users.findOne({
            id: req.query.username
        }, function (err1, userdata) {
            if (err1) {
                throw err1;
            }

            if (userdata !== null) {

                var usercanteenpath = "/data/users/" + userdata.type + "/" + req.query.username + "/data/canteen/orders.json";

                fs.readFile(__dirname + usercanteenpath, function (err, orderdata) {
                    var orders = JSON.parse(orderdata);
                    res.send(orders);
                });

            } else {
                res.send("failure");
                // console.log(username + " does not exist.");
            }
            db.close();
        });
    });

});

app.get('/canteen/myorders/clear', function (req, res) {



    MongoClient.connect(url, function (err, db) {

        if (err) {
            throw err;
        }

        //console.log("Connected successfully to server");

        var users = db.collection('users');

        users.findOne({
            id: req.query.username
        }, function (err1, userdata) {
            if (err1) {
                throw err1;
            }

            if (userdata !== null) {

                var usercanteenpath = "/data/users/" + userdata.type + "/" + req.query.username + "/data/canteen/orders.json";

                fs.writeFile(__dirname + usercanteenpath, "[]", "utf8", function (err) {
                    if (err) {
                        throw err;
                    }
                    res.send("success");
                });

            } else {
                res.send("failure");
                // console.log(username + " does not exist.");
            }
            db.close();
        });
    });

});



app.listen(appport, function () {
    console.log('Server listening at port %d', appport);
});

// must be at last
app.use(function (req, res) {
    fs.readFile(__dirname + "/www/error.html", function (err, data) {
        res.status(404).write(data);
        res.end();
    });
});
