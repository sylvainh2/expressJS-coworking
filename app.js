const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const serveFavicon = require('serve-favicon');

const app = express();
const port = 3001;

app.use(morgan("dev"));
app.use(serveFavicon(__dirname+"/favicon.ico"));
app.use(bodyParser.json())

const coworkingsRouter = require('./routes/coworkings');

app.use('/api/coworkings', coworkingsRouter);



app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})