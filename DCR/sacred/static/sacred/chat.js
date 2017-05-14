const socket = new WebSocket('ws://' + window.location.host + '/chat' + window.location.pathname.slice(12))

socket.addEventListener('open', function(event){
    socket.send('New friends coming' + 'in room' + window.location.pathname.slice(12));
});

socket.addEventListener('message', function(event){
    const sendingMessage = document.createElement('div')
    sendingMessage.textContent = event.data
    document.getElementById('messagelist').appendChild(sendingMessage)
});

document.getElementById('inputmessage').addEventListener('submit', function(event){
    event.preventDefault();
    socket.send(document.getElementById('id_your_name').value + ' : ' +document.getElementById('id_your_message').value);
    document.getElementById('id_your_message').value = ''
})
