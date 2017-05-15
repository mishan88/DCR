const socket = new WebSocket('ws://' + window.location.host + '/chat' + window.location.pathname.slice(12))

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
        const sendingMessage = document.createElement('div')
        sendingMessage.textContent = JSON.parse(event.data).name + ':' + JSON.parse(event.data).message
        document.getElementById('messagelist').appendChild(sendingMessage)
    }
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
})
