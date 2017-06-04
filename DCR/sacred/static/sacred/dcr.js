const modal = document.getElementById('imagemodal')
document.getElementById('komabutton').addEventListener('click',function(event){
    modal.style.display = 'block';
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

document.getElementById('closemodal').addEventListener('click',function(event){
    modal.style.display = 'none';
    imagelist.textContent = null;
});

window.onclick = function(event){
    if(event.target == modal){
        modal.style.display = 'none';
        imagelist.textContent = null;
    }
};


document.getElementById('putkoma').addEventListener('click',function(event){
    const imageObj = new Image();
    imageObj.src = document.querySelector('input[name="imageselect"]:checked').value;
    const koma = new Konva.Image({
        x:100,
        y:100,
        image: imageObj,
        width:20,
        height:20,
        draggable:true
    });
    komalist.push(koma)
    layer.add(koma);
    stage.add(layer)
});

const stage = new Konva.Stage({
    container: 'map',
    width: 400,
    height: 400
});
const layer = new Konva.Layer();
stage.add(layer);

const komalist = []
