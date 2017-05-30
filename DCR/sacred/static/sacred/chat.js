const socket = new WebSocket('ws://' + window.location.host + '/chat' + window.location.pathname.slice(12))
const chatmessage = document.getElementById('chat-message')

socket.addEventListener('open', function(event){
    socket.send(
        JSON.stringify({
            name:'ROOM',
            message: 'New friends coming' + 'in room' + window.location.pathname.slice(12)
        })
    )
});

socket.addEventListener('message', function(event){
    if(JSON.parse(event.data).hasOwnProperty('message')){
        const sendingMessage = document.createElement('div');
        sendingMessage.className = 'output-message';
        sendingMessage.textContent = JSON.parse(event.data).name + ':' + JSON.parse(event.data).message;
        document.getElementById('messagelist').appendChild(sendingMessage);
        chatmessage.scrollTo(0,chatmessage.scrollHeight);
    };
});

document.getElementById('inputmessage').addEventListener('submit', function(event){
    event.preventDefault();
    socket.send(
        JSON.stringify({
            name: document.getElementById('id_your_name').value,
            message: document.getElementById('id_your_message').value
        })
    );
    document.getElementById('id_your_message').value = ''
    chatmessage.scrollTo(0,chatmessage.scrollHeight);
})
