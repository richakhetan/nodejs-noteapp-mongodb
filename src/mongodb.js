const mongodb = require('mongodb')
const MongoClient = mongodb.MongoClient

const connectionUrl = "mongodb://127.0.0.1:27017"
const databaseName = "task-manager"
const collectionName = "noteApp"

// const createNote = (title,notebody)=>{
// MongoClient.connect(connectionUrl,{ useNewUrlParser:true, useUnifiedTopology:true }).then((client)=>{
//     db.collection(collectionName).findOne({
//         title
//     }).then((note)=>{
//         if(!note){
//             db.collection(collectionName).insertOne({
//                 title,
//                 notebody
//             }).then((result)=>{
//                 return { message : "Note Added !!!" }
//             }).catch((error)=>{
//                 return error
//             })
//         } else {
//             return {message : "Note Already Taken !!!"}
//         }
//     }).catch((error)=>{
//         return error
//     })
// }).catch((error)=>{
//     return error
// })
// }

const deleteNote = (title)=>{
    MongoClient.connect(connectionUrl,{ useNewUrlParser:true, useUnifiedTopology:true },(error,client)=>{
        if(error){
            return console.log('Database not connected')
        }
        const db = client.db(databaseName)
        db.collection('noteApp').deleteOne({
            title
        })
    })
}

function readNote(title){
    let message ;
    MongoClient.connect(connectionUrl,{ useNewUrlParser:true, useUnifiedTopology:true },(error,client)=>{
       if(error){
            return error
        }
        const db = client.db(databaseName)
       db.collection('noteApp').findOne({
            title
        }).then((note)=>{
            message : note
            console.log(note)
        }).catch((error)=>{
            message : error
            console.log(error)
        })
    })
    return message; 
}

const createNote = (title,notebody) => {
    MongoClient.connect(connectionUrl,{useNewUrlParser:true, useUnifiedTopology:true})
    .then((client)=>{
        const db = client.db(databaseName)
        return db.collection(collectionName).insertOne({
            title,
            notebody
        })
    }).catch((error)=>{
        console.log(error)
    })       
}

module.exports = {
    createNote, deleteNote, readNote
}