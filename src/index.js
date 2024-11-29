let show_form=document.getElementById('show_form');
let form=document.getElementById('form');

document.querySelector('#close').addEventListener('click',()=>{
    form.style.display="none"
})
show_form.addEventListener('click',function(){
    form.style.display="flex"
})

//recuperation des données localStorage
let players=JSON.parse(localStorage.getItem("players") || "[]");
show_players_remplacement();


// ajouter une player  dans localstorage
document.getElementById('add_new').addEventListener('click',function(){

    if (players.length >= 24) {
        alert("Erreur : Vous ne pouvez pas ajouter plus de 24 joueurs.");
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



    if (!nom || typeof nom !== "string") {
        alert("Erreur : La  'nom' est invalide ou non définie.");
        return;
    }
    
   if (!nom || !image || !Position || !nationality || !flag || !Club || !Logo || !rating || !role) {
    alert("Erreur : Veuillez remplir tous les champs obligatoires.");
    return;
}
// Validate 
if ( rating < 1 || rating > 100 ||(Position !== 'Goalkeeper' && (
    pace < 1 || pace > 100 ||
    shooting < 1 || shooting > 100 ||
    passing < 1 || passing > 100 ||
    dribbling < 1 || dribbling > 100 ||
    defending < 1 || defending > 100 ||
    physical < 1 || physical > 100
)) ||
    (Position === 'Goalkeeper' && (
        diving < 1 || diving > 100 ||
        handling < 1 || handling > 100 ||
        kicking < 1 || kicking > 100 ||
        reflexes < 1 || reflexes > 100 ||
        speed < 1 || speed > 100 ||
        positioning < 1 || positioning > 100
    ))
){
    alert("Erreur : Toutes les notes doivent être comprises entre 1 et 100.");
    return;
}
    const validPositions = ["RW", "ST", "CM", "CB", "LW", "CDM", "RB", "LB", "GK", "HC"];

    if (!validPositions.includes(Position)) {
        alert("Erreur : La position saisie est invalide. Veuillez choisir une position valide.");
        return;
    }
    let exists = players.some(player => player.name.toLowerCase() === nom);
    if (exists) {
        alert("Erreur : Le joueur existe déjà.");
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

    players.unshift(newPlayer);
    
    localStorage.setItem("players", JSON.stringify(players));
    show_players_remplacement();
    

    document.getElementById('playerForm').reset();
    toggleStatsForRole('');

})

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
            

        } else {
            document.getElementById('player_spe').style.display = 'grid';
            document.getElementById('Golkeaper_stat').style.display = 'none';

        }
    }

    // Listen for role change
    roleSelect.addEventListener('change', function () {
        toggleStatsForRole(roleSelect.value);
    });

    toggleStatsForRole(roleSelect.value);
});

/*****************************************************************************************************************************************************************/
/**
     * show players 
*/
function show_players_remplacement() {
    const parent = document.querySelector('.show');
    parent.innerHTML = "";
    players.forEach((player, index) => {
        const isGoalkeeper = player.role.toLowerCase() === "goalkeeper";

        parent.innerHTML += `
        <div class="relative w-[7em] h-44 sm:w-[10em] sm:h-55 md:w-[12em] md:h-80 flex-col flex items-center justify-center rounded-lg cursor-pointer text-white transition-transform duration-300 hover:brightness-110 hover:scale-105 group">
            <div class="absolute inset-0 bg-cover bg-center rounded-lg" style="background-image: url('./assets/new-card.png');" aria-hidden="true">
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
 * @param {*} players openPopup afficher les joueurs
 */

function openPopup(players) {
    const popup = document.getElementById("player-popup");
    const playerList = document.getElementById("player-list");

    playerList.innerHTML = players
        .map(
            (player) => `
        <div class="card relative w-full p-4 flex items-center justify-between bg-gray-100 rounded-lg cursor-pointer hover:bg-gray-200" data-player-id="${player.name}" >
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

    popup.classList.remove("hidden");

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
 * function replaceDefaultCardWithPlayer
 *  */ 
function replaceDefaultCardWithPlayer(player) {
    const targetCard = document.querySelector(`.default-card[data-id="${player.Position}"]`);

    if (targetCard) {
        targetCard.innerHTML = `
        <div class="card relative w-[5em] h-40 sm:w-[10em] sm:h-55 md:w-[90%] md:h-30 flex-col flex items-start justify-start rounded-lg cursor-pointer text-white transition-transform duration-300 hover:brightness-110 hover:scale-105">
            <div class="absolute inset-0 bg-cover bg-center rounded-lg" style="background-image: url('./assets/new-card.png');" aria-hidden="true">
                <div class="flex flex-col items-center justify-center absolute inset-0 rounded-lg">
                    <div class="flex flex-row-reverse items-center gap-2 md:gap-2 justify-between">
                        <img src="${player.image}" alt="${player.name}" class="rounded-full w-12 h-12 sm:w-20 sm:h-20 md:w-12 md:h-12">
                        <div class="flex flex-col items-center">
                            <div class="text-xs sm:text-lg font-bold">${player.rating}</div>
                            <div class="text-xs sm:text-xr">${player.Position}</div>
                        </div>
                    </div>
                    <div class="text-xs sm:text-[11px] font-semibold">${player.name}</div>
                    <div class="flex gap-2 md:gap-4 items-center justify-center md:mb-0.5 mb-2">
                        <img src="${player.Logo}" alt="${player.name}" class="w-4 h-4 sm:w-20 sm:h-20 md:w-6 md:h-4">
                        <img src="${player.flag}" alt="${player.name}" class="w-4 h-3 sm:w-20 sm:h-20 md:w-6 md:h-4">
                    </div>
                    <div class="text-xs sm:text-sm flex justify-center px-0.5">
                        <span class="text-[7px] sm:text-[9px]">PL ${player.pace}</span>
                        <span class="text-[7px] sm:text-[9px]">SH ${player.shooting}</span>
                        <span class="text-[7px] sm:text-[9px]">PS ${player.passing}</span>
                        <span class="text-[7px] sm:text-[9px] pl-2">DR ${player.dribbling}</span>
                        <span class="text-[7px] sm:text-[9px]">DE ${player.defending}</span>
                        <span class="text-[7px] sm:text-[9px]">PH ${player.physical}</span>
                    </div>
                </div>
            </div>
        </div>
        `;
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





const cards = document.querySelectorAll('.card');
const select_form = document.getElementById('select_form');

cards.forEach((card) => {
    card.addEventListener('click', () => {
            select_form.style.display = "flex";
    });
});

document.querySelector('#closee').addEventListener('click',()=>{
    select_form.style.display="none"
})



/**
 * edit player
*/
function editPlayer(index) {
    document.querySelector('#close').addEventListener('click',()=>{
        form.style.display="none"
    })

    form.style.display="flex"
    
    const player = players[index];
    document.getElementById('name').value = player.name;
    document.getElementById('image').value = player.image;
    document.getElementById('Position').value = player.Position;
    document.getElementById('nationality').value = player.nationality;
    document.getElementById('flag').value = player.flag;
    document.getElementById('Club').value = player.Club;
    document.getElementById('Logo').value = player.Logo;
    document.getElementById('rating').value = player.rating;
    document.getElementById('pace').value = player.pace;
    document.getElementById('shooting').value = player.shooting;
    document.getElementById('passing').value = player.passing;
    document.getElementById('dribbling').value = player.dribbling;
    document.getElementById('defending').value = player.defending;
    document.getElementById('physical').value = player.physical;
    document.getElementById('role').value = player.role;


    document.getElementById('add_new').innerText = "Save Changes";
    document.getElementById('add_new').addEventListener('click', function saveChanges() {
        let updatedPlayer = {
            
            name: document.getElementById('name').value.toLowerCase().trim(),
            role: document.getElementById('role').value.toLowerCase().trim(),
            image: document.getElementById('image').value.toLowerCase().trim(),
            Position: document.getElementById('Position').value.trim(),
            nationality: document.getElementById('nationality').value.toLowerCase().trim(),
            flag: document.getElementById('flag').value.toLowerCase().trim(),
            Club: document.getElementById('Club').value.toLowerCase().trim(),
            Logo: document.getElementById('Logo').value.toLowerCase().trim(),
            rating: document.getElementById('rating').value.toLowerCase().trim(),
            pace: document.getElementById('pace').value.toLowerCase().trim(),
            shooting: document.getElementById('shooting').value.toLowerCase().trim(),
            passing: document.getElementById('passing').value.toLowerCase().trim(),
            dribbling: document.getElementById('dribbling').value.toLowerCase().trim(),
            defending: document.getElementById('defending').value.toLowerCase().trim(),
            physical: document.getElementById('physical').value.toLowerCase().trim()
        };

        players[index] = updatedPlayer; 
        localStorage.setItem("players", JSON.stringify(players)); 
        show_players_remplacement(); 
        show_players_spec();

        document.getElementById('add_new').innerText = "Add New";
        document.getElementById('add_new').removeEventListener('click', saveChanges);
    });
}



/**
 * Delete player
 */

function deletePlayer(index) {
    if (confirm("Êtes-vous sûr de vouloir supprimer ce joueur ?")) {
        players.splice(index, 1); 
        localStorage.setItem("players", JSON.stringify(players)); 
        show_players_remplacement(); 
        show_players_spec();
    }
}









document.addEventListener('DOMContentLoaded', function () {
    const roleSelect = document.getElementById('role');
    // const playerStats = document.getElementById('player-stats');

    /**
     * 
     * @param {role} role Function to hide statis for Goalkeeper
     */
    
    function toggleStatsForRole(role) {
        if (role === 'Goalkeeper') {
            document.getElementById('pace').parentElement.style.display = 'none';
            document.getElementById('shooting').parentElement.style.display = 'none';
            document.getElementById('passing').parentElement.style.display = 'none';
            document.getElementById('dribbling').parentElement.style.display = 'none';
            document.getElementById('defending').parentElement.style.display = 'none';
            document.getElementById('physical').parentElement.style.display = 'none';

            document.getElementById('Golkeaper_stat').style.display = 'grid';
            

        } else {
            document.getElementById('rating').parentElement.style.display = 'block';
            document.getElementById('pace').parentElement.style.display = 'block';
            document.getElementById('shooting').parentElement.style.display = 'block';
            document.getElementById('passing').parentElement.style.display = 'block';
            document.getElementById('dribbling').parentElement.style.display = 'block';
            document.getElementById('defending').parentElement.style.display = 'block';
            document.getElementById('physical').parentElement.style.display = 'block';
        }
    }

    // Listen for role change
    roleSelect.addEventListener('change', function () {
        toggleStatsForRole(roleSelect.value);
    });

    toggleStatsForRole(roleSelect.value);
});
