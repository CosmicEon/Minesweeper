let express = require('express');
let app = express();
let router = express.Router();


// Highscore routes
var highscoreController = require('./controllers/users-controller')(db);
app.get('/api/users', usersController.get);
app.post('/api/users', usersController.post);

app.get('/highscore', function (req, res) {
	res.send('hello world');
});

let port = 4545;
app.listen(port, function () {
	console.log('Server is running at http://localhost:' + port);
});
