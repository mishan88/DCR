const getimagemodal = document.getElementById('getimagemodal')
document.getElementById('komabutton').addEventListener('click',function(event){
    getimagemodal.style.display = 'block';
    fetch('//' + window.location.host + '/api/images/?room=' + window.location.pathname.slice(12)).then(function(response){
        if(response.ok){
            response.json().then(function(apiimage_json){
                for(let numberOfImages = 0; numberOfImages < apiimage_json.length; numberOfImages++){
                    const imageformfield = document.createElement('div');
                    imageformfield.className = 'mdc-form-field';
                    imageformfield.classList.add('image-form-field');
                    const imageradio = document.createElement('div');
                    imageradio.className = 'mdc-radio';
                    imageradio.classList.add('image-radio');
                    const imageinput = document.createElement('input');
                    imageinput.type = 'radio';
                    imageinput.className = 'mdc-radio__native-control';
                    imageinput.id = apiimage_json[numberOfImages].id;
                    imageinput.value = apiimage_json[numberOfImages].image;
                    imageinput.name = 'imageselect';

                    const imageradio_background = document.createElement('div');
                    imageradio_background.className = 'mdc-radio__background';
                    imageradio_background.classList.add('imageradio_background');
                    const imageradio_background_outercircle = document.createElement('div');
                    imageradio_background_outercircle.className = 'mdc-radio__outer-circle';
                    const imageradio_background_innercircle = document.createElement('div');
                    imageradio_background_innercircle.className = 'mdc-radio__inner-circle';

                    const imagelabel = document.createElement('label');
                    imagelabel.className = 'selectimage-ch';
                    imagelabel.style.backgroundImage = "url(" + apiimage_json[numberOfImages].image + ")"
                    imagelabel.htmlFor = apiimage_json[numberOfImages].id;

                    document.getElementById('imagelist').appendChild(imageformfield);
                    document.getElementsByClassName('image-form-field')[numberOfImages].appendChild(imageradio);
                    document.getElementsByClassName('image-radio')[numberOfImages].appendChild(imageinput);
                    document.getElementsByClassName('image-radio')[numberOfImages].appendChild(imageradio_background);
                    document.getElementsByClassName('imageradio_background')[numberOfImages].appendChild(imageradio_background_outercircle);
                    document.getElementsByClassName('imageradio_background')[numberOfImages].appendChild(imageradio_background_innercircle);
                    document.getElementsByClassName('image-form-field')[numberOfImages].appendChild(imagelabel);
                };
            })
        } else {
            console.log('Network trouble?')
        }
    })
})

document.getElementById('closegetimagemodal').addEventListener('click',function(event){
    getimagemodal.style.display = 'none';
    imagelist.textContent = null;
});

document.getElementById('closepostimagemodal').addEventListener('click',function(event){
    postimagemodal.style.display = 'none';
});

window.onclick = function(event){
    if(event.target == getimagemodal){
        getimagemodal.style.display = 'none';
        imagelist.textContent = null;
    };
    if(event.target == postimagemodal){
        postimagemodal.style.display = 'none';
    };
};

document.getElementById('uploadimagebutton').addEventListener('click',function(event){
    const formData = new FormData(document.getElementById('uploadimages'));
    formData.append('room',window.location.pathname.slice(12))
    fetch('//' + window.location.host + '/api/images/',{
        method: 'POST',
        body: formData
    }).then(function(response){
        console.log('OK');
    });
})

document.getElementById('imageupload').addEventListener('click',function(event){
    postimagemodal.style.display = 'block';
})

// koma

document.getElementById('putkoma').addEventListener('click',function(event){
    socket.send(
        JSON.stringify({
            _id: komalist.length + 3,
            x: 20,
            y: 20,
            image_src : document.querySelector('input[name="imageselect"]:checked').value,
        })
    )
});

const stage = new Konva.Stage({
    container: 'map',
    width: 400,
    height: 400
});
const layer = new Konva.Layer();
stage.add(layer);

const komalist = []

//chat

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
    if(JSON.parse(event.data).hasOwnProperty('x')){
        console.log(JSON.parse(event.data));

        if(Array.from({length:komalist.length}, (v,k) => k + 3).includes(JSON.parse(event.data)._id)){
            komalist[JSON.parse(event.data)._id -3].setAttrs({
                'x':JSON.parse(event.data).x,
                'y':JSON.parse(event.data).y
            })
            //layer.add(koma);
            stage.add(layer);
        } else {
            const imageObj = new Image();
            imageObj.src = JSON.parse(event.data).image_src;
            const koma = new Konva.Image({
                x:JSON.parse(event.data).x,
                y:JSON.parse(event.data).y,
                image: imageObj,
                width:20,
                height:20,
                draggable:true
            });
            komalist.push(koma);
            layer.add(koma);
            stage.add(layer);
            komalist[komalist.length - 1].on('dragend',function(){
                socket.send(
                    JSON.stringify({
                        _id: this._id,
                        x: this.x(),
                        y: this.y(),
                        image_src : this.image().src,
                    })
                )
            });
        }
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
    chatmessage.scrollTo(0,chatmessage.scrollHeight);
})
