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
    mongodb.readNote(req.query.title).then((note)=>{
        if(!note){
            return mongodb.createNote(req.query.title, req.query.notebody)
        }else{
            return res.send({
                message : "Note already taken"
            })
        }
    }).then((note)=>{
        return res.send({
            message : "Note Added"
        })
    }).catch((error)=>{
       return res.send({
            message : "Error occured" 
        })
    })
})

app.get('/removeNote',(req, res)=>{

    if(!req.query.title){
        return res.send({
            message : 'Provide title to remove Note' 
        })
    }
    mongodb.readNote(req.query.title).then((note)=>{
        if(note){
            return mongodb.deleteNote(req.query.title)
        }else{
            return res.send({
                message : "Note doesn't exist"
            })
        }
    }).then((note)=>{
        return res.send({
            message : "Note Removed"
        })
    }).catch((error)=>{
       return res.send({
            message : "Error occured" 
        })
    })

})

app.get('/readNote',(req, res)=>{
   
    if(!req.query.title){
        return  res.send({
            message : 'Provide title to read Note' 
        })
    }
    mongodb.readNote(req.query.title).then((note)=>{
        if(note){
            return res.send({
                message : note
            })
        }else {
            return res.send({
                message : "Note not found"
            })
        }
        
    }).catch((error)=>{
        return res.send({
            message : "Error occured"
        })
    })
   
})

app.get('/listNote',(req, res)=>{
    mongodb.readAllNotes().then((notes)=>{
        if(notes){
            return res.send({
                message : notes
            })
        }else {
            return res.send({
                message : "No Note not found"
            })
        }
    }).catch((error)=>{
        console.log(error);
        return res.send({
            message : "Error occured"
        })
    })

})

app.listen(3000,()=>{
    console.log('Server is up and running at port 3000')
})