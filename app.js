const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const serveFavicon = require('serve-favicon');
const coworkings = require('./cowormod');
const app = express();
const port = 3000;

app.use(morgan("dev"));
app.use(serveFavicon(__dirname+"/favicon.ico"));
app.use(bodyParser.json())

function createid(){
    let idmax=coworkings[coworkings.length-1].id;
    return (idmax+=1);
}

app.get('/api/coworkings', (req, res) => {
// let coworks=[];
// coworkings.map((data)=>{
//     if(data.superficy>500){
//         coworks.push(data);
//     }
// })
const capa = req.query.capacity || 0;
const coworks=coworkings.filter((data)=>data.capacity>capa);
  res.json(coworks);
})
app.get('/api/coworking/:id', (req, res) => {

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
app.post('/api/coworkings',(req,res)=>{
    let newbody = req.body;
    newbody.id = createid();
    coworkings.push(newbody);
    res.json({message:"un coworking a bien été ajouté",data:coworkings});
})
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})