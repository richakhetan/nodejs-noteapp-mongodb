const mongodb = require('mongodb')
const MongoClient = mongodb.MongoClient

const connectionUrl = "mongodb://127.0.0.1:27017"
const databaseName = "task-manager"
const collectionName = "noteApp"

const deleteNote = (title)=>{
    return MongoClient.connect(connectionUrl,{ useNewUrlParser:true, useUnifiedTopology:true }).then((client)=>{
    const db = client.db(databaseName)
       return db.collection('noteApp').deleteOne({
            title
        })
    })
}

const createNote = (title,notebody) => {
    return MongoClient.connect(connectionUrl,{useNewUrlParser:true, useUnifiedTopology:true})
    .then((client)=>{
        const db = client.db(databaseName)
        return db.collection(collectionName).insertOne({
            title,
            notebody
        })
    })       
}

const readNote = (title) => {
    return MongoClient.connect(connectionUrl,{ useNewUrlParser:true, useUnifiedTopology:true }).then((client)=>{
        const db = client.db(databaseName)
        return db.collection(collectionName).findOne({
            title
        })
    })
}

const readAllNotes = () =>{
    return MongoClient.connect(connectionUrl,{ useNewUrlParser:true, useUnifiedTopology:true }).then((client)=>{
        const db = client.db(databaseName)
        return db.collection(collectionName).find({}).toArray()
    })
}


module.exports = {
    createNote, deleteNote, readNote, readAllNotes
}