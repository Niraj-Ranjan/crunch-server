const express = require('express');
const fs = require('fs');
var config = require('./config');


const app = express();



//app.use(express.static('www'))
//app.use('/data', express.static('data'))
app.use(function (req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	next();
});

app.get('/', function (req, res) {
	fs.readFile("www/index.html", function (err, data) {
		/*res.writeHead(200, {
			'Content-Type': 'text/html'
		});*/
		res.write(data);
		res.end();
	});
});


app.get('/login', function (req, res) {
	//console.log("request");
	//console.log(req.query);
	username = req.query.uname;
	//console.log(username);
	password = req.query.pword;
	fs.readFile("data/users/users.json", function (err, data) {
		users = JSON.parse(data);

		//console.log(users);
		//console.log(JSON.parse(data));
		//console.log(username)
		if (username in users) {
			//;
			if (users[username].password == password) {
				res.send("true");
				//console.log(users[username].password);
				console.log(username + " logged in.");
			} else {
				res.send("false");
				console.log(username + " entered incorrect password.");
			}

		} else {
			res.send("invalid");
			console.log(username + " does not exist.");
		}

	});


});




app.get('/userdata', function (req, res) {
	//console.log("request");
	//console.log(req.query);
	username = req.query.username;
	//console.log(username);

	fs.readFile("data/users/users.json", function (err0, userdata) {
		users = JSON.parse(userdata);

		//console.log(users);
		//console.log(JSON.parse(data));
		//console.log(username);
		//console.log(users[username].type);
		if (username in users) {
			//console.log(users[username].type);
			userpath = "data/users/" + users[username].type +"/"+username+"/";
			//console.log(userpath);
			profilepath = userpath +"profile.json";
			//console.log(profilepath);
			fs.readFile(profilepath , function (err1, profiledata) {
			//console.log(profiledata);

				profile = JSON.parse(profiledata);

				//console.log(profile);
				res.send(profile);
				console.log("Profile of "+username+" sent.");




				/*fs.readFile(userpath+"user.png",function(err2,imgdata){
					profile["user-img"] = imgdata;
					//console.log(profile["user-img"]);


				});*/
			});

		}
	});

});







/*app.get('/apk', function (req, res) {
	console.log("requested for app");
	res.sendFile("/files/BA.apk");
	console.log("app sent")
});*/
app.listen(3000, function () {
	console.log('App listening on port 3000!');
});







// must be at last
app.use(function (req, res, next) {
	fs.readFile("www/index.html", function (err, data) {
		res.status(404).write(data);
		res.end();
	});
});