let card=document.getElementById('card');
let form=document.getElementById('form');

let close=document.getElementById('close').addEventListener('click',()=>{
    form.style.display="none"

})
card.addEventListener('click',function(){
    form.style.display="flex"
})




let players=JSON.parse(localStorage.getItem("players") || "[]");
show_players();

document.getElementById('add_new').addEventListener('click',function(){
    let nom = document.getElementById('name').value.toLowerCase().trim();
    let image = document.getElementById('image').value.toLowerCase().trim();
    let Position = document.getElementById('Position').value.trim();
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
    show_players();
    console.log(players)
})

/****************************************************************************************************** */

function show_players() {
    const parent = document.getElementById('show');
    parent.innerHTML = "";

    players.forEach((player) => {
        parent.innerHTML += `
       <div class="relative w-[7em] h-44 sm:w-[10em] sm:h-55 md:w-[12em] md:h-80 flex-col flex items-center justify-center rounded-lg cursor-pointer text-white transition-transform duration-300 hover:brightness-110 hover:scale-105">

        <div class="absolute inset-0 bg-cover bg-center rounded-lg " style="background-image: url('./assets/new-card.png');" aria-hidden="true">
        <div class="flex flex-col items-center justify-center absolute inset-0 rounded-lg">
        <div class="flex flex-row-reverse items-center  md:justify-between gap-6 md:gap-10">
            <img src="${player.image}" alt="${player.name}"  class="rounded-full mb-2 w-12 h-12 sm:w-20 sm:h-20 md:w-28 md:h-28">
            <div class="flex flex-col items-center justify-center">
                <div class="text-xs sm:text-xl font-bold">${player.rating}</div>
                <div class="text-xs sm:text-xr mb-4 font-bold md:mb-8">${player.Position}</div>
            </div>
        </div>
            <div class="text-xs sm:text-sm font-semibold">${player.name}</div>
            
            <div class="flex  mb-2  gap-2 md:mb-8 md:gap-4 items-center justify-center">
                <img src="${player.Logo}" alt="${player.name}"  class="w-4 h-4 sm:w-20 sm:h-20 md:w-6 md:h-6">
                <img src="${player.flag}" alt="${player.name}"  class="w-4 h-3 sm:w-20 sm:h-20 md:w-8 md:h-5">
            </div>
            
            <div class="text-xs sm:text-sm flex  justify-center  md:pl-6  pl-[12px]  ">
                <span class="text-[10px] md:text-[14px]  mb-4 ">P ${player.pace}</span> 
                <span class="text-[10px] md:text-[14px]  mb-4 ">Sh ${player.shooting}</span>
                <span class="text-[10px] md:text-[14px]  mb-4 ">Pas ${player.passing}</span>
                <span class="text-[10px] md:text-[14px]  mb-4 ">Dri ${player.dribbling}</span>
                <span class="text-[10px] md:text-[14px]  mb-4 ">Def ${player.defending}</span>
                <span class="text-[10px] md:text-[14px]  mb-4 ">Phy ${player.physical}</span>
            </div>
        </div>
    </div>
    
</div>



          
        `;
    });
}

