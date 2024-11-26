let card=document.getElementById('card');
let form=document.getElementById('form');

let close=document.getElementById('close').addEventListener('click',()=>{
    form.style.display="none"

})

card.addEventListener('click',function(){
    form.style.display="flex"
})
