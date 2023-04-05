const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const serveFavicon = require('serve-favicon');
const coworkings = require('./cowormod');
const app = express();
const port = 3001;

app.use(morgan("dev"));
app.use(serveFavicon(__dirname+"/favicon.ico"));
app.use(bodyParser.json())

function createid(){
    let idmax=coworkings[coworkings.length-1].id;
    return (idmax+=1);
}
let coworks=[];
app.get('/api/coworkings', (req, res) => {
    // if(req.query.galery && !req.query.date){
    //     coworks={message:`ça se passe ici pour galery ${req.query.galery} page${req.query.page}`};
    // }
    // if(req.query.date && !req.query.galery){
    //     coworks={message:`ça se passe ici pour date ${req.query.date} page${req.query.page}`};
    // }
    // if(req.query.galery && req.query.date){
    //     coworks={message:`ça se passe ici pour galery et date ${req.query.galery} ${req.query.date} page${req.query.page}`};
    // }
    // if(!req.query.galery && !req.query.date){
    //     coworks={message:`ça se passe ici pour All page${req.query.page}`};
    // }
coworks=coworkings;
// coworkings.map((data)=>{
//     if(data.superficy>500){
//         coworks.push(data);
//     }
// })
// const capa = req.query.capacity || 0;
// const coworks=coworkings.filter((data)=>data.capacity>capa);
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
coworks? res.send({message:`le coworking n°${req.params.id} est bien retouné page ${req.query.page}`,data:coworks}):res.send({message:'pas de données',data:{}});

})
app.post('/api/coworkings',(req,res)=>{
    let newbody = req.body;
    newbody.id = createid();
    coworkings.push(newbody);
    res.json({message:"un coworking a bien été ajouté",data:coworkings});
})
app.put('/api/coworkings/:id',(req,res)=>{
    // let array=coworkings.find((data)=>data.id==req.params.id)
    let index=coworkings.findIndex((data)=>data.id==req.params.id)
    index?coworkings[index]={...coworkings[index],...req.body}:null;
    index?res.json({message:`le coworking n°${req.params.id} a été trouvé`,data:coworkings[index]}):res.status(404).json({message:`pas de coworking ${req.params.id} trouvé`,data:{}});
})
app.delete('/api/coworkings/:id',(req,res)=>{
    let index=coworkings.findIndex((data)=>data.id==req.params.id)
    console.log(index);
    index>=0?coworkings.splice(index,1):null;
    index>0?res.json({message:`le coworking n° ${req.params.id} a été supprimé`,data:coworkings}):res.status(404).json({message:`le coworking n° ${req.params.id} n'existe pas`,data:{}});
})
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})