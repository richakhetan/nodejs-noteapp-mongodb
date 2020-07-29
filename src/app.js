const express = require('express')
const path = require('path')
const hbs = require('hbs')
const note = require('./notes.js')
const { title } = require('process')
const mongodb = require('./mongodb.js')

const app = express()
console.log()
app.use(express.static(path.join(__dirname,"../public")))

app.set('view engine','hbs')
app.set('views', __dirname +'/templates/view')
hbs.registerPartials(__dirname+'/templates/partials')

app.get('', (req, res) => {
    res.render('index', {
        title: 'Note App',
        message: ''
    })
})

app.get('/help',(req, res)=>{
    res.render('help',{
        message:"This is a help page which provides no help",
        title: "Help Page"
    })
})

app.get('/addNote',(req, res)=>{
    if(!req.query.title || !req.query.notebody){
        return  res.send({
            message : 'Provide title and notebody to add new note' 
        })
    }

    mongodb.createNote(req.query.title,req.query.notebody)
    res.send({
        message : "Note Added !!!" 
    })
})

app.get('/removeNote',(req, res)=>{
    
    if(!req.query.title){
        return res.send({
            message : 'Provide title to remove Note' 
        })
    }

    mongodb.deleteNote(title)
    res.send({
        message : "Note Removed !!!"
    })
})

app.get('/readNote',(req, res)=>{
   
    if(!req.query.title){
        return  res.send({
            message : 'Provide title to read Note' 
        })
    }

    const message = mongodb.readNote(title)
    res.send({
        message
    })
})

app.get('/listNote',(req, res)=>{

    let notes = note.listAllNotes()  
    res.send({
        message : notes 
    })
})

app.listen(3000,()=>{
    console.log('Server is up and running at port 3000')
})