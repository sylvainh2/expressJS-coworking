const express = require('express');
const coworkings = require('./cowormod');
const app = express();
const port = 3000;

app.get('/api/coworkings', (req, res) => {
let coworks="";
coworkings.map((data)=>{
coworks+=data.name+",";
})
  res.send(`coworkings ${coworks}`)
})
app.get('/api/coworkings/:id', (req, res) => {

// coworkings.map((data)=>{
//     if(data.id===parseInt(req.params.id)){
//         coworks=data.name;
//     }
//     if(!coworks){
//         coworks="Pas de données"
//     }})
let coworks=coworkings.find((data)=>data.id===parseInt(req.params.id));
coworks? res.send(coworks.name):res.send('pas de données');

})
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})