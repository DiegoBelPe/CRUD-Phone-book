const express = require("express");
const { json } = require("express/lib/response");
const morgan =require('morgan');

const app = express();
app.use(express.json())
morgan.token('body', function(req, res) {
  console.log(req.body)
  return JSON.stringify(req.body);
});

app.use(morgan(':method :url :status :body - :response-time ms'))
const port = 3001;

const persons = 
[
  {
    id: 1,
    name: "Arto Hellas",
    number: "040-123456"
  },
  {
    id: 2,
    name: "Ada Lovelace",
    number: "29-44-5323523"
  },
  {
    id: 3,
    name: "Dan Abramov",
    number: "12-43-234345"
  },
  {
    id: 4,
    name: "Mary Poppendick",
    number: "39-23-6424122"
  },
  {
    id: 5,
    name: "Emerson Asto",
    number: "40-232-578456"
  },

]
app.get('/api/persons',(req, res)=>{
  res.json(persons)

})
const getCurrentDate = () => {
  const today= new Date();
  return today
}
app.get('/info',(req, res)=>{
  res.send(`<p> Phonebbok has info for ${persons.length} people </p> \n 
            ${getCurrentDate()}`);

});
app.get('/api/persons/:id',(req, res)=>{
  const id = req.params.id;
  const person = persons.find((person)=>{
    return person.id === Number(id);

  })
  if(!person){
    res.status(404).json({Message: "not found"})
  }
  else{res.json(person)}
  

})
app.delete('/api/persons/:id',(req, res)=>{
  const id = req.params.id;
  const person = persons.find((person)=>{
    return person.id === Number(id);

  })
  if(!person){
    res.status(404).json({Message: "not found"})
  }
  else{res.json(person)}
  

})

//1.5: backend de la agenda telefónica
 app.post('/api/persons',(req, res)=>{
  const id = Math.round(Math.random()*10000)
  const nuevaPersona = {...req.body, id}
  persons.push(nuevaPersona)
  res.status(201).json({Message: "Contacto agregado!"})
}) 

//1.6: backend de la agenda telefónica

app.post('/api/persons',(req, res)=>{
  const id = Math.round(Math.random()*10000)
  const {name , number} = req.body
  const repeatContact = persons.find((person)=>{
    return person.name === name 

  })
  if(repeatContact){
    res.status(400).json({Message: "Nombre repetido"})
  }
  
  console.log(repeatContact)
  if(name === undefined || name.length === 0){
    res.status(400).json({Message: "Nombre no valido"})
  }else if(number === undefined || number.length === 0){
    res.status(400).json({Message: "Numero no valido"})
  }
  else{

    const nuevaPersona = {...req.body, id}
    persons.push(nuevaPersona)
    res.status(201).json({Message: "Contacto agregado!"})
  }
})

app.listen(port,()=>{
  console.log('Se ha iniciado el servidor');
})