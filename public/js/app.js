console.log("Client Side Javascript loaded")

const addNoteForm = document.querySelector('#addNoteForm');

const titleadd = document.querySelector('#titleadd');
const notebody = document.querySelector('#notebody');

addNoteForm.addEventListener('submit',(e)=>{
    e.preventDefault();
    fetch('http://localhost:3000/addNote?title='+titleadd.value +'&notebody='+notebody.value).then((response)=>{
       response.json().then((data)=>{
        document.getElementById('messageadd').innerHTML = JSON.stringify(data);
    })
})
})

const removeNoteForm = document.querySelector('#removeNoteForm');
const titleremove = document.querySelector('#titleremove');
removeNoteForm.addEventListener('submit',(e)=>{
    e.preventDefault();
    fetch('http://localhost:3000/removeNote?title='+titleremove.value).then((response)=>{
       response.json().then((data)=>{
        document.getElementById('messageremove').innerHTML = JSON.stringify(data);
    })
})
})

const readNoteForm = document.querySelector('#readNoteForm');
const titleread = document.querySelector('#titleread');
readNoteForm.addEventListener('submit',(e)=>{
    e.preventDefault();
    fetch('http://localhost:3000/readNote?title='+titleread.value).then((response)=>{
       response.json().then((data)=>{
        document.getElementById('messageread').innerHTML = JSON.stringify(data);
    })
})
})

const listNoteForm = document.querySelector('#listNoteForm');
listNoteForm.addEventListener('submit',(e)=>{
    e.preventDefault();
    fetch('http://localhost:3000/listNote').then((response)=>{
       response.json().then((data)=>{
        document.getElementById('messagelist').innerHTML = JSON.stringify(data);
    })
})
})