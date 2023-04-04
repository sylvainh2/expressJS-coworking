const express = require('express');
const coworkings = require('./cowormod');
const app = express();
const port = 3000;

app.get('/api/coworkings', (req, res) => {
// let coworks=[];
// coworkings.map((data)=>{
//     if(data.superficy>500){
//         coworks.push(data);
//     }
// })
const capa = req.query.capacity || 50;
const coworks=coworkings.filter((data)=>data.capacity>capa);
  res.json(coworks);
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
coworks? res.send({message:`le coworking n°${req.params.id} est bien retouné`,data:coworks}):res.send({message:'pas de données',data:{}});

})
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})