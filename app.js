const express = require('express');
const app = express();
const userRouter = require('./controllers/usercontroller');
const gameRouter = require('./controllers/gamecontroller')

const PORT = process.env.PORT || 8080;

app.use(require('body-parser').json());
app.use('/api/auth', userRouter);
app.use(require('./middleware/validate-session'))
app.use('/api/game', gameRouter);

app.listen(PORT, function() {
    console.log("App is listening on ", PORT);
})
