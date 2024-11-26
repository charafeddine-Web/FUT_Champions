let card=document.getElementById('card');
let form=document.getElementById('form');

let close=document.getElementById('close').addEventListener('click',()=>{
    form.style.display="none"

})

card.addEventListener('click',function(){
    form.style.display="flex"
})




let players=JSON.parse(localStorage.getItem("players") || "[]");


document.getElementById('add_new').addEventListener('click',function(){

    let nom = document.getElementById('name').value.toLowerCase().trim();
    let image = document.getElementById('image').value.toLowerCase().trim();
    let Position = document.getElementById('Position').value.toLowerCase().trim();
    let nationality = document.getElementById('nationality').value.toLowerCase().trim();
    let flag = document.getElementById('flag').value.toLowerCase().trim();
    let Club = document.getElementById('Club').value.toLowerCase().trim();
    let Logo = document.getElementById('Logo').value.toLowerCase().trim();
    let rating = document.getElementById('rating').value.toLowerCase().trim();
    let pace = document.getElementById('pace').value.toLowerCase().trim();
    let shooting = document.getElementById('shooting').value.toLowerCase().trim();
    let passing = document.getElementById('passing').value.toLowerCase().trim();
    let dribbling = document.getElementById('dribbling').value.toLowerCase().trim();
    let defending = document.getElementById('defending').value.toLowerCase().trim();
    let physical = document.getElementById('physical').value.toLowerCase().trim();
    
    let player={
        name:nom,
        image:image,
        Position:Position,
        nationality:nationality,
        flag:flag,
        Club:Club,
        Logo:Logo,
        rating:rating,
        pace:pace,
        shooting:shooting,
        passing:passing,
        dribbling:dribbling,
        defending:defending,
        physical:physical
    }
    players.unshift(player);
    localStorage.setItem("players", JSON.stringify(players));
    console.log(players)
})