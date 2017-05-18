const modal = document.getElementById('imagemodal')
document.getElementById('komabutton').addEventListener('click',function(event){
    modal.style.display = 'block';
})

document.getElementById('closemodal').addEventListener('click',function(event){
    modal.style.display = 'none';
})

window.onclick = function(event){
    if(event.target == modal){
        modal.style.display = 'none';
    }
}
