const express = require('express');
const app = express();
const db = require('./db');
const user = require('./controllers/usercontroller');
const game = require('./controllers/gamecontroller')

const PORT = process.env.PORT || 8080;

db.sync();
app.use(require('body-parser').json());
app.use('/api/auth', user);
app.use(require('./middleware/validate-session'))
app.use('/api/game', game);
app.listen(PORT, function() {
    console.log("App is listening on ", PORT);
})


// {
//     "title": "Game1",
//     "owner_id": 8,
//     "studio": "Game1",
//     "esrb_rating": 12345,
//     "user_rating": 5,
//     "have_played": false
// }

// {
//     "full_name": "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
//     "username": "ыыыыыыыыыыыыыыыыыыыыыыыыыыыыыыыыыы",
//     "password": "123qwe",
//     "email": "Sapran@yand.ru"
// }
