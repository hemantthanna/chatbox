const socket = io('http://172.104.207.250:8000');

const form = document.getElementById('sendcontainer');
const messageinput = document.getElementById('messageinp');
const messagecontainer = document.querySelector(".container");

//including message notification audio
var audio = new Audio('media/ringtone.mp3');


const append = (message, position)=>{
     const messageelement = document.createElement('div');
     messageelement.innerText = message;
     messageelement.classList.add('message');
     messageelement.classList.add(position);
     messagecontainer.append(messageelement);
     if(position =='left'){ audio.play();}
}

form.addEventListener('submit', (e)=>{
    e.preventDefault();
    const message = messageinput.value;
    append(`you : ${message}`, `right`);
    socket.emit('send', message);
    messageinput.value = '';
})



const name = prompt("enter your name to join");
socket.emit('new-user-joined', name);

socket.on('user-joined',name=>{
     append(`${name} joined the chat`,`left`)
})

socket.on('receive',data=>{
    append(`${data.name}: ${data.message}`,`left`)
})
socket.on('userleft',name=>{
    append(`${name} left the chat`,`left`)
})
