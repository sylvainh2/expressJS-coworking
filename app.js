const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const serveFavicon = require('serve-favicon');
const sequelize = require('./db/sequelize');
const app = express();
const port = 3001;

sequelize.initDb();

app.use(morgan("dev"));
app.use(serveFavicon(__dirname+"/favicon.ico"));
app.use(bodyParser.json());

const coworkingsRouter = require('./routes/coworkings');
const usersRouter = require('./routes/users');

app.use('/api/coworkings', coworkingsRouter);
app.use('/api/users',usersRouter);


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})