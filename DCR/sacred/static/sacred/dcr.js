const modal = document.getElementById('imagemodal')
const imagelist = document.getElementById('imagelist')
document.getElementById('komabutton').addEventListener('click',function(event){
    modal.style.display = 'block';
    fetch('http://' + window.location.host + '/api/images/').then(function(response){
        if(response.ok){
            response.json().then(function(myjson){
                const imagec = document.createElement('img')
                for(let i = 0; i < myjson.length; i++){
                    imagec.src = myjson[i].image;
                    imagelist.appendChild(imagec);
                }
            })
        } else {
            console.log('Network trouble?')
        }
    })
})

document.getElementById('closemodal').addEventListener('click',function(event){
    modal.style.display = 'none';
})

window.onclick = function(event){
    if(event.target == modal){
        modal.style.display = 'none';
    }
}
