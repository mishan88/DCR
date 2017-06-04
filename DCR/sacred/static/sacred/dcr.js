const modal = document.getElementById('imagemodal')
document.getElementById('komabutton').addEventListener('click',function(event){
    modal.style.display = 'block';
    fetch('http://' + window.location.host + '/api/images/').then(function(response){
        if(response.ok){
            response.json().then(function(myjson){
                for(let i = 0; i < myjson.length; i++){
                    const imageinput = document.createElement('input');
                    imageinput.type = 'radio';
                    const imagelabel = document.createElement('label');
                    imagelabel.className = 'selectimage-ch';
                    imagelabel.style.backgroundImage = "url(" + myjson[i].image + ")"
                    document.getElementById('imagelist').appendChild(imageinput);
                    document.getElementById('imagelist').appendChild(imagelabel);
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
})

window.onclick = function(event){
    if(event.target == modal){
        modal.style.display = 'none';
        imagelist.textContent = null;
    }
}
