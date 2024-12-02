let form=document.getElementById('form');

document.querySelector('#close').addEventListener('click',()=>{
    form.style.display="none"
})

let show_form=document.querySelectorAll('.show_form');

show_form.forEach(form_s=>{
    form_s.addEventListener('click',function(){
    form.style.display="flex"
})
})

//recuperation des données localStorage
let players=JSON.parse(localStorage.getItem("players") || "[]");
show_players_remplacement();


// ajouter une player  dans localstorage
document.getElementById('add_new').addEventListener('click',function(){

    if (players.length >= 23) {
        alert("Erreur : Vous ne pouvez pas ajouter plus de 23 joueurs.");
        return; 
    }

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
    let role = document.getElementById('role').value.trim();

    let diving = document.getElementById('diving').value.trim() || 0;
    let handling = document.getElementById('handling').value.trim() || 0;
    let kicking = document.getElementById('kicking').value.trim() || 0;
    let reflexes = document.getElementById('reflexes').value.trim() || 0;
    let speed = document.getElementById('speed').value.trim() || 0;
    let positioning = document.getElementById('positioning').value.trim() || 0;
    let rating_GK = document.getElementById('rating_GK').value.toLowerCase().trim();


    const nameRegex = /^[A-Za-z\s]+$/;

    if (!nameRegex.test(nom)) {
        alert("Erreur : Le 'nom' doit contenir uniquement des lettres.");
        return;
    }  


    
    if (nom.length < 3 || nom.length > 10) {
        alert("Erreur : Le 'nom' doit avoir entre 3 et 10 caractères.");
        return;
    }


   const imageRegex = /\.(jpg|jpeg|png|gif|bmp)$/;
    if (!( imageRegex.test(image) && imageRegex.test(flag) && imageRegex.test(Logo) )) {
        alert('Please upload a valid image (jpg, jpeg, png, gif, bmp).');
        return;
    } 

   if (!nom || !image || !Position || !nationality || !flag || !Club || !Logo  ) {
    alert("Erreur : Veuillez remplir tous les champs obligatoires.");
    return;
  }


    // Validate General Player Stats 
    const generalStats = [rating,pace, shooting, passing, dribbling, defending, physical];
    for (let stat of generalStats) {
        if (parseInt(stat) < 1 || parseInt(stat) > 100) {
            alert("Erreur : Les statistiques du joueur doivent être comprises entre 1 et 100.");
            return;
        }
    }

    // If Goalkeeper  , validate GK-specific stats
    if (Position === "GK") {
        const gkStats = [rating_GK, diving, handling, kicking, reflexes, speed, positioning];
        for (let stat of gkStats) {
            if (parseInt(stat) < 1 || parseInt(stat) > 100) {
                alert("Erreur : Les statistiques du gardien de but doivent être comprises entre 1 et 100.");
                return;
            }
        }
    }

    const validPositions = ["RW", "ST", "CM","LM", "LCB","RCB", "LW", "CDM", "RB", "LB", "GK", "HC"];
    if (!validPositions.includes(Position)) {
        alert("Erreur : La position saisie est invalide. Veuillez choisir une position valide.");
        return;
    }

    //tester si player exists déja
    let exists = players.some(player => 
        player.name.toLowerCase() === nom || 
        player.Club.toLowerCase() === Club  || 
        player.image.toLowerCase() === image
    );
    if (exists) {
        alert("Erreur : Le joueur existe déjà avec le même nom, club et position, ou image.");
        return;
    }
    

let newPlayer;

if (role === "Goalkeeper") {
    newPlayer = {
        name: nom,
        role: role,
        image: image,
        Position: Position,
        nationality: nationality,
        flag: flag,
        Club: Club,
        Logo: Logo,
        rating_GK: parseInt(rating_GK),
        diving: parseInt(diving),
        handling: parseInt(handling),
        kicking: parseInt(kicking),
        reflexes: parseInt(reflexes),
        speed: parseInt(speed),
        positioning: parseInt(positioning),
    };
    console.log("goalkeep", newPlayer)

} else {
    newPlayer = {
        name: nom,
        role: role,
        image: image,
        Position: Position,
        nationality: nationality,
        flag: flag,
        Club: Club,
        Logo: Logo,
        rating: rating,
        pace: parseInt(pace),
        shooting: parseInt(shooting),
        passing: parseInt(passing),
        dribbling: parseInt(dribbling),
        defending: parseInt(defending),
        physical: parseInt(physical),
    };
    console.log("new player", newPlayer)
}
    players.push(newPlayer);
    localStorage.setItem("players", JSON.stringify(players));
    show_players_remplacement();
    document.getElementById('playerForm').reset();
    document.getElementById('Golkeaper_stat').style.display = 'none';
    toggleStatsForRole('');
    document.getElementById('show_form').style.display = "none";

})

//toggleStatsForRole => hide statis for Goalkeeper
document.addEventListener('DOMContentLoaded', function () {
    const roleSelect = document.getElementById('role');
    /**
     * 
     * @param {role} role Function to hide statis for Goalkeeper
     */
    
    function toggleStatsForRole(role) {
        if (role === 'Goalkeeper') {
            document.getElementById('player_spe').style.display = 'none';
            document.getElementById('Golkeaper_stat').style.display = 'grid';
        } else if (role) {
            document.getElementById('player_spe').style.display = 'grid';
            document.getElementById('Golkeaper_stat').style.display = 'none';
        } else {
            document.getElementById('player_spe').style.display = 'none';
            document.getElementById('Golkeaper_stat').style.display = 'none';
        }
    }
    
    // Listen for role change
    roleSelect.addEventListener('change', function () {
        toggleStatsForRole(roleSelect.value);
    });

    toggleStatsForRole(roleSelect.value);
});

// change Position en fonction de la valeur de role
document.getElementById("role").addEventListener("change", function() {
    const role = this.value;
    const positionSelect = document.getElementById("Position");
    if (role === "Goalkeeper") {
        positionSelect.value = "GK";
        // positionSelect.disabled = true;  

    } else {
        positionSelect.value = "";
        // positionSelect.disabled = false;  
    }
});


/**
 * 
 * @param {*} players show players Replacement 
 */
function show_players_remplacement() {
    const parent = document.querySelector('.show');
    parent.innerHTML = "";
    players.forEach((player, index) => {
        const isGoalkeeper = player.role.toLowerCase() === "goalkeeper";
        parent.innerHTML += `
        <div class="relative w-[7em] h-44 sm:w-[10em] sm:h-55 md:w-[12em] md:h-80 flex-col flex items-center justify-center rounded-lg cursor-pointer text-white transition-transform duration-300 hover:brightness-110 hover:scale-105 group">
            <div class="absolute inset-0 bg-cover bg-center rounded-lg" style="background-image: url('./src/assets/new-card.png');" aria-hidden="true">
                <div class="flex flex-col items-center justify-center absolute inset-0 rounded-lg">
                    <div class="flex flex-row-reverse items-center md:justify-between gap-6 md:gap-10">
                        <img src="${player.image}" alt="Image of ${player.name}" class="rounded-full mb-2 w-12 h-12 sm:w-20 sm:h-20 md:w-28 md:h-28">
                        <div class="flex flex-col items-center justify-center">
                         ${
                          isGoalkeeper
                            ? `
                            <div class="text-xs sm:text-xl font-bold">${player.rating_GK}</div>
                            `:
                             `<div class="text-xs sm:text-xl font-bold">${player.rating}</div>`
                         }

                            <div class="text-xs sm:text-xr mb-4 font-bold md:mb-8">${player.Position}</div>
                        </div>
                    </div>
                    <div class="text-xs sm:text-sm font-semibold">${player.name}</div>
                    <div class="flex mb-2 gap-2 md:mb-8 md:gap-4 items-center justify-center">
                        <img src="${player.Logo}" alt="Club logo of ${player.Club}" class="w-4 h-4 sm:w-20 sm:h-20 md:w-6 md:h-6">
                        <img src="${player.flag}" alt="Nationality flag of ${player.nationality}" class="w-4 h-3 sm:w-20 sm:h-20 md:w-8 md:h-5">
                    </div>

                    <div class="text-xs sm:text-sm flex justify-center md:pl-6 pl-[12px]">
                        ${
                          isGoalkeeper
                            ? `
                            <span class="text-[10px] md:text-[14px] mb-4">D ${player.diving || 'N/A'}</span>
                            <span class="text-[10px] md:text-[14px] mb-4">H ${player.handling || 'N/A'}</span>
                            <span class="text-[10px] md:text-[14px] mb-4">K ${player.kicking || 'N/A'}</span>
                            <span class="text-[10px] md:text-[14px] mb-4">R ${player.reflexes || 'N/A'}</span>
                            <span class="text-[10px] md:text-[14px] mb-4">S ${player.speed || 'N/A'}</span>
                            <span class="text-[10px] md:text-[14px] mb-4">Pos ${player.positioning || 'N/A'}</span>
                        `
                            : `
                            <span class="text-[10px] md:text-[14px] mb-4">P ${player.pace}</span>
                            <span class="text-[10px] md:text-[14px] mb-4">Sh ${player.shooting}</span>
                            <span class="text-[10px] md:text-[14px] mb-4">Pas ${player.passing}</span>
                            <span class="text-[10px] md:text-[14px] mb-4">Dri ${player.dribbling}</span>
                            <span class="text-[10px] md:text-[14px] mb-4">Def ${player.defending}</span>
                            <span class="text-[10px] md:text-[14px] mb-4">Phy ${player.physical}</span>
                        `
                        }
                    </div>
                </div>
            </div>
            <div class="absolute top-0 left-0 h-full w-6 md:w-10 bg-opacity-70 flex flex-col items-center justify-center gap-0 md:gap-2 opacity-0 transition-opacity duration-300 group-hover:opacity-100 rounded-lg">
                <button class="text-green-500 hover:text-green-600" onclick="editPlayer(${index})" aria-label="Edit ${player.name}">
                    <i class="fas fa-edit text-l md:text-xl"></i>
                </button>
                <button class="text-red-500 hover:text-red-600" onclick="deletePlayer(${index})" aria-label="Delete ${player.name}">
                    <i class="fas fa-trash text-l md:text-xl"></i>
                </button>
            </div>
        </div>`;
    });
}

/**
 * 
 * @param {*} players open Popup afficher les joueurs
 */
function openPopup(players) {
    const popup = document.getElementById("player-popup");
    popup.classList.remove("hidden");

    const playerList = document.getElementById("player-list");

    playerList.innerHTML = players
        .map(
            (player) => `
        <div class="card relative w-full p-4 flex items-center justify-between bg-gray-100 rounded-lg cursor-pointer hover:bg-gray-200 " data-player-id="${player.name}" >
            <div class="flex items-center gap-4">
                <img src="${player.image}" alt="${player.name}" class="rounded-full w-12 h-12">
                <div>
                    <div class="font-bold">${player.name}</div>
                    <div class="text-sm text-gray-600">${player.Position}</div>
                </div>
            </div>
            <div class="font-bold text-gray-800">${player.rating}</div>
        </div>
        `
        )
        .join("");


    document.querySelectorAll("#player-list .card").forEach((card) => {
        card.addEventListener("click", (event) => {
            const playerName = card.getAttribute("data-player-id");
            const selectedPlayer = players.find((p) => p.name === playerName);
            replaceDefaultCardWithPlayer(selectedPlayer);
            closePopup();
        });
    });
}

/**
 * close pop up
 */
function closePopup() {
    document.getElementById("player-popup").classList.add("hidden");
}

/**
 * 
 * @param {*} players - Fonction qui remplace la carte par défaut par celle d'un joueur.
 */
function replaceDefaultCardWithPlayer(player) {
    const targetCard = document.querySelector(`.default-card[data-id="${player.Position}"]`);
    const isGoalkeeper = player.role === "Goalkeeper";

    if (targetCard) {
        
        // Save the default card content only once in a data attribute
        if (!targetCard.dataset.defaultContent) {
            targetCard.dataset.defaultContent = targetCard.innerHTML;
        }

        let cardContent = `
        ${isGoalkeeper ? `
        <div class="card-container relative w-[5em] h-40 sm:w-[10em] sm:h-55 md:w-[11%] md:h-30 flex-col flex items-start justify-start rounded-lg cursor-pointer text-white transition-transform duration-300 hover:brightness-110 hover:scale-105">
            <div class="absolute inset-0 bg-cover bg-center rounded-lg" style="background-image: url('./src/assets/new-card.png');" aria-hidden="true">
                <div class="flex flex-col items-center justify-center absolute inset-0 rounded-lg">
                    <div class="flex flex-row-reverse items-center gap-2 md:gap-2 justify-between">
                        <img src="${player.image}" alt="${player.name}" class="rounded-full w-12 h-12 sm:w-20 sm:h-20 md:w-12 md:h-12">
                        <div class="flex flex-col items-center">
                            <div class="text-xs sm:text-lg font-bold">${isGoalkeeper ? player.rating_GK : player.rating}</div>
                            <div class="text-xs sm:text-xr">${player.Position}</div>
                        </div>
                    </div>
                    <div class="text-xs sm:text-[11px] font-semibold">${player.name}</div>
                    <div class="flex gap-2 md:gap-4 items-center justify-center md:mb-0.5 mb-2">
                        <img src="${player.Logo}" alt="${player.name}" class="w-4 h-4 sm:w-20 sm:h-20 md:w-6 md:h-4">
                        <img src="${player.flag}" alt="${player.name}" class="w-4 h-3 sm:w-20 sm:h-20 md:w-6 md:h-4">
                    </div>
                    <div class="text-xs sm:text-sm flex justify-center px-0.5">
                        ${isGoalkeeper 
                            ? `<span class="text-[7px] sm:text-[9px]">D ${player.diving || 'N/A'}</span>
                               <span class="text-[7px] sm:text-[9px]">H ${player.handling || 'N/A'}</span>
                               <span class="text-[7px] sm:text-[9px]">K ${player.kicking || 'N/A'}</span>
                               <span class="text-[7px] sm:text-[9px]">R ${player.reflexes || 'N/A'}</span>
                               <span class="text-[7px] sm:text-[9px]">S ${player.speed || 'N/A'}</span>
                               <span class="text-[7px] sm:text-[9px]">Pos ${player.positioning || 'N/A'}</span>`
                            : `<span class="text-[7px] sm:text-[9px]">PL ${player.pace}</span>
                               <span class="text-[7px] sm:text-[9px]">SH ${player.shooting}</span>
                               <span class="text-[7px] sm:text-[9px]">PS ${player.passing}</span>
                               <span class="text-[7px] sm:text-[9px]">DR ${player.dribbling}</span>
                               <span class="text-[7px] sm:text-[9px]">DE ${player.defending}</span>
                               <span class="text-[7px] sm:text-[9px]">PH ${player.physical}</span>`
                        }
                    </div>
                </div>
            </div>
            <button class="delete-icon absolute top-0 right-0 bg-red-500 text-white px-2 rounded-full hidden hover:bg-red-600">X</button>
        </div>
         `
         :
         `
        <div class="card-container relative w-[5em] h-40 sm:w-[10em] sm:h-55 md:w-[90%] md:h-30 flex-col flex items-start justify-start rounded-lg cursor-pointer text-white transition-transform duration-300 hover:brightness-110 hover:scale-105">
            <div class="absolute inset-0 bg-cover bg-center rounded-lg" style="background-image: url('./src/assets/new-card.png');" aria-hidden="true">
                <div class="flex flex-col items-center justify-center absolute inset-0 rounded-lg">
                    <div class="flex flex-row-reverse items-center gap-2 md:gap-2 justify-between">
                        <img src="${player.image}" alt="${player.name}" class="rounded-full w-12 h-12 sm:w-20 sm:h-20 md:w-12 md:h-12">
                        <div class="flex flex-col items-center">
                            <div class="text-xs sm:text-lg font-bold">${isGoalkeeper ? player.rating_GK : player.rating}</div>
                            <div class="text-xs sm:text-xr">${player.Position}</div>
                        </div>
                    </div>
                    <div class="text-xs sm:text-[11px] font-semibold">${player.name}</div>
                    <div class="flex gap-2 md:gap-4 items-center justify-center md:mb-0.5 mb-2">
                        <img src="${player.Logo}" alt="${player.name}" class="w-4 h-4 sm:w-20 sm:h-20 md:w-6 md:h-4">
                        <img src="${player.flag}" alt="${player.name}" class="w-4 h-3 sm:w-20 sm:h-20 md:w-6 md:h-4">
                    </div>
                    <div class="text-xs sm:text-sm flex justify-center px-0.5">
                        ${isGoalkeeper 
                            ? `<span class="text-[7px] sm:text-[9px]">D ${player.diving || 'N/A'}</span>
                               <span class="text-[7px] sm:text-[9px]">H ${player.handling || 'N/A'}</span>
                               <span class="text-[7px] sm:text-[9px]">K ${player.kicking || 'N/A'}</span>
                               <span class="text-[7px] sm:text-[9px]">R ${player.reflexes || 'N/A'}</span>
                               <span class="text-[7px] sm:text-[9px]">S ${player.speed || 'N/A'}</span>
                               <span class="text-[7px] sm:text-[9px]">Pos ${player.positioning || 'N/A'}</span>`
                            : `<span class="text-[7px] sm:text-[9px]">PL ${player.pace}</span>
                               <span class="text-[7px] sm:text-[9px]">SH ${player.shooting}</span>
                               <span class="text-[7px] sm:text-[9px]">PS ${player.passing}</span>
                               <span class="text-[7px] sm:text-[9px]">DR ${player.dribbling}</span>
                               <span class="text-[7px] sm:text-[9px]">DE ${player.defending}</span>
                               <span class="text-[7px] sm:text-[9px]">PH ${player.physical}</span>`
                        }
                    </div>
                </div>
            </div>
            <button class="delete-icon absolute top-0 right-0 bg-red-500 text-white px-2 rounded-full hidden hover:bg-red-600">X</button>
        </div>
        `
        }
        `;
        targetCard.innerHTML = cardContent;

        const deleteButton = targetCard.querySelector(".delete-icon");
        deleteButton.addEventListener("click", () => {
            // Restore the original default card content
            targetCard.innerHTML = targetCard.dataset.defaultContent;
        });
        // Show delete button on hover
        const cardContainer = targetCard.querySelector(".card-container");
        cardContainer.addEventListener("mouseenter", () => {
            deleteButton.classList.remove("hidden");
        });
        cardContainer.addEventListener("mouseleave", () => {
            deleteButton.classList.add("hidden");
        });
    } else {
        console.log("Target card not found.");
    }
}

// Ajouter un gestionnaire d'événements pour chaque carte par défaut
document.querySelectorAll(".default-card").forEach((card) => {
    card.addEventListener("click", (event) => {
        const playerId = card.getAttribute("data-id");
        const filteredPlayers = players.filter((p) => p.Position === playerId);
        openPopup(filteredPlayers);
    });
});
document.getElementById("close-popup").addEventListener("click", closePopup);


// const cards = document.querySelectorAll('.card');
// const select_form = document.getElementById('select_form');

// cards.forEach((card) => {
//     card.addEventListener('click', () => {
//             select_form.style.display = "flex";
//     });
// });
// document.querySelector('#closee').addEventListener('click',()=>{
//     select_form.style.display="none"
// })




/**
 *   Edit player (Function to open the edit modal and pre-fill the player's data)
*/

function editPlayer(index) {
    document.querySelector('#edit-player-modal').classList.remove('hidden');
    const player = players[index];

    function toggleStatsForRole(role) {
        if (role === 'Goalkeeper') {
            document.getElementById('player_spe_ed').style.display = 'none';
            document.getElementById('Golkeaper_stat_ed').style.display = 'grid';
        } else {
            document.getElementById('player_spe_ed').style.display = 'grid';
            document.getElementById('Golkeaper_stat_ed').style.display = 'none';
        }
    }
    
    document.querySelector('#name_ed').value = player.name;
    document.querySelector('#role_ed').value = player.role;
    document.querySelector('#Position_ed').value = player.Position;
    document.querySelector('#image_ed').value = player.image;
    document.querySelector('#Club_ed').value = player.Club;
    document.querySelector('#nationality_ed').value = player.nationality;
    document.querySelector('#flag_ed').value = player.flag;
    document.querySelector('#Logo_ed').value = player.Logo;
    document.getElementById('rating_ed').value = player.rating || '';
    document.getElementById('pace_ed').value = player.pace || '';
    document.getElementById('shooting_ed').value = player.shooting || '';
    document.getElementById('passing_ed').value = player.passing || '';
    document.getElementById('dribbling_ed').value = player.dribbling || '';
    document.getElementById('defending_ed').value = player.defending || '';
    document.getElementById('physical_ed').value = player.physical || '';
    document.getElementById('diving_ed').value = player.diving || '';
    document.getElementById('handling_ed').value = player.handling || '';
    document.getElementById('kicking_ed').value = player.kicking || '';
    document.getElementById('reflexes_ed').value = player.reflexes || '';
    document.getElementById('speed_ed').value = player.speed || '';
    document.getElementById('positioning_ed').value = player.positioning || '';
    document.getElementById('rating_GK_ed').value = player.rating_GK || '';

    toggleStatsForRole(player.role);

    document.querySelector('#save-edited-player').onclick = function () {
        const nom = document.querySelector('#name_ed').value.toLowerCase().trim();
        const image = document.querySelector('#image_ed').value.toLowerCase().trim();
        const Position = document.querySelector('#Position_ed').value.trim();
        const nationality = document.querySelector('#nationality_ed').value.toLowerCase().trim();
        const flag = document.querySelector('#flag_ed').value.toLowerCase().trim();
        const Club = document.querySelector('#Club_ed').value.toLowerCase().trim();
        const Logo = document.querySelector('#Logo_ed').value.toLowerCase().trim();
        const rating = document.querySelector('#rating_ed').value.toLowerCase().trim();
        const pace = document.querySelector('#pace_ed').value.toLowerCase().trim();
        const shooting = document.querySelector('#shooting_ed').value.toLowerCase().trim();
        const passing = document.querySelector('#passing_ed').value.toLowerCase().trim();
        const dribbling = document.querySelector('#dribbling_ed').value.toLowerCase().trim();
        const defending = document.querySelector('#defending_ed').value.toLowerCase().trim();
        const physical = document.querySelector('#physical_ed').value.toLowerCase().trim();
        const role = document.querySelector('#role_ed').value.trim();

        const diving = document.querySelector('#diving_ed').value.trim() || 0;
        const handling = document.querySelector('#handling_ed').value.trim() || 0;
        const kicking = document.querySelector('#kicking_ed').value.trim() || 0;
        const reflexes = document.querySelector('#reflexes_ed').value.trim() || 0;
        const speed = document.querySelector('#speed_ed').value.trim() || 0;
        const positioning = document.querySelector('#positioning_ed').value.trim() || 0;
        const rating_GK = document.querySelector('#rating_GK_ed').value.toLowerCase().trim();

        const nameRegex = /^[A-Za-z\s]+$/;

        if (!nameRegex.test(nom)) {
            alert("Erreur : Le 'nom' doit contenir uniquement des lettres.");
            return;
        }  
        
        if (nom.length < 3 || nom.length > 10) {
            alert("Erreur : Le 'nom' doit avoir entre 3 et 10 caractères.");
            return;
        }
      

        const imageRegex = /\.(jpg|jpeg|png|gif|bmp)$/;
        if (!(imageRegex.test(image) && imageRegex.test(flag) && imageRegex.test(Logo))) {
            alert('Please upload a valid image (jpg, jpeg, png, gif, bmp).');
            return;
        }

        if (!nom || !image || !Position || !nationality || !flag || !Club || !Logo) {
            alert("Erreur : Veuillez remplir tous les champs obligatoires.");
            return;
        }

       
    const generalStats = [rating,pace, shooting, passing, dribbling, defending, physical];
    for (let stat of generalStats) {
        if (parseInt(stat) < 1 || parseInt(stat) > 100) {
            alert("Erreur : Les statistiques du joueur doivent être comprises entre 1 et 100.");
            return;
        }
    }

    if (Position === "GK") {
        const gkStats = [rating_GK, diving, handling, kicking, reflexes, speed, positioning];
        for (let stat of gkStats) {
            if (parseInt(stat) < 1 || parseInt(stat) > 100) {
                alert("Erreur : Les statistiques du gardien de but doivent être comprises entre 1 et 100.");
                return;
            }
        }
    }

        const validPositions = ["RW", "ST", "CM", "LM", "LCB", "RCB", "LW", "CDM", "RB", "LB", "GK", "HC"];
        if (!validPositions.includes(Position)) {
            alert("Erreur : La position saisie est invalide. Veuillez choisir une position valide.");
            return;
        }

        let updatedPlayer = players[index];

        updatedPlayer.name = nom;
        updatedPlayer.role = role;
        updatedPlayer.Position = Position;
        updatedPlayer.image = image;
        updatedPlayer.Club = Club;
        updatedPlayer.nationality = nationality;
        updatedPlayer.flag = flag;
        updatedPlayer.Logo = Logo;
        updatedPlayer.rating = rating;
        updatedPlayer.pace = parseInt(pace);
        updatedPlayer.shooting = parseInt(shooting);
        updatedPlayer.passing = parseInt(passing);
        updatedPlayer.dribbling = parseInt(dribbling);
        updatedPlayer.defending = parseInt(defending);
        updatedPlayer.physical = parseInt(physical);

        if (role === "Goalkeeper") {
            updatedPlayer.rating_GK = parseInt(rating_GK);
            updatedPlayer.diving = parseInt(diving);
            updatedPlayer.handling = parseInt(handling);
            updatedPlayer.kicking = parseInt(kicking);
            updatedPlayer.reflexes = parseInt(reflexes);
            updatedPlayer.speed = parseInt(speed);
            updatedPlayer.positioning = parseInt(positioning);
        }

        localStorage.setItem("players", JSON.stringify(players));

        document.querySelector('#edit-player-modal').classList.add('hidden');
        show_players_remplacement();
    };
}

// change Position en fonction de la valeur de role
document.getElementById("role_ed").addEventListener("change", function() {
    const role = this.value;
    const positionSelect = document.getElementById("Position_ed");
    if (role === "Goalkeeper") {
        positionSelect.value = "GK";
        positionSelect.disabled = true;  
    } else {
        positionSelect.value = "";  
        positionSelect.disabled = false; 
    }
});

// Manage stat visibility Stat
document.addEventListener('DOMContentLoaded', function () {
    const roleSelect = document.getElementById('role_ed');
    
    function toggleStatsForRole(role) {
        if (role === 'Goalkeeper') {
            document.getElementById('player_spe_ed').style.display = 'none';
            document.getElementById('Golkeaper_stat_ed').style.display = 'grid';
        } else {
            document.getElementById('player_spe_ed').style.display = 'grid';
            document.getElementById('Golkeaper_stat_ed').style.display = 'none';
        }
    }


    roleSelect.addEventListener('change', function () {
        toggleStatsForRole(roleSelect.value);
    });
    toggleStatsForRole(roleSelect.value); 
});

//close modal_edit
function closeEditModal() {
    document.querySelector('#edit-player-modal').classList.add('hidden');
}
document.querySelector('#close_edit').addEventListener('click', closeEditModal);


/**
 * Delete player
 * 
 */


function deletePlayer(index) {
    if (confirm("Êtes-vous sûr de vouloir supprimer ce joueur ?")) {
        const playerToDelete = players[index]; 
        const positionId = playerToDelete.Position;

        players.splice(index, 1);
        localStorage.setItem("players", JSON.stringify(players));

        const targetCard = document.querySelector(`.default-card[data-id="${positionId}"]`);
        if (targetCard && targetCard.dataset.defaultContent) {
            targetCard.innerHTML = targetCard.dataset.defaultContent;
        }
        show_players_remplacement();
        show_players_spec();
    }
}













