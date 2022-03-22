const pokeCard          = document.querySelector('[data-poke-card]');
const pokeName          = document.querySelector('[data-poke-name]');
const pokeImg           = document.querySelector('[data-poke-img]');
const pokeImgContainer  = document.querySelector('[data-poke-img-container]');
const pokeId            = document.querySelector('[data-poke-id]');
const pokeTypes         = document.querySelector('[data-poke-types]');
const pokeStats         = document.querySelector('[data-poke-stats]');
const pokeMoves         = document.querySelector('[data-poke-moves]');
const pokeSound         = document.querySelector('[data-sound-pokemon]');
const pokeWeight        = document.querySelector('[data-poke-Weight]');
const pokeHeight        = document.querySelector('[data-poke-Height]');
const pokeAbilities     = document.querySelector('[data-poke-abilities]');

const typeColors = {
    electric: '#e7d56b',
    normal: '#B09398',
    fire: '#FF675C',
    water: '#0596C7',
    ice: '#86b5c5',
    rock: '#999799',
    flying: '#539c86',
    grass: '#4A9681',
    psychic: '#be95a3',
    ghost: '#561D25',
    bug: '#76b977',
    poison: '#795663',
    ground: '#D2B074',
    dragon: '#DA627D',
    steel: '#1D8A99',
    fighting: '#2F2F2F',
    default: '#2A1A1F',
};

const searchPokemon = event => {
    event.preventDefault();
    const { value } = event.target.pokemon;
    fetch(`https://pokeapi.co/api/v2/pokemon/${value.toLowerCase()}`)
        .then(data => data.json())
        .then(response => renderPokemonData(response))
        .catch(err => renderNotFound())
}

const renderPokemonData = data => {
    const sprite =  data.sprites.front_default;
    const { stats, types }      = data;
    pokeName.textContent        = data.name;
    pokeImg.setAttribute        ('src', sprite);
    pokeId.textContent          = `Nº ${data.id}`;
    pokeHeight.textContent      = `Height: ${data.height}`;
    pokeWeight.textContent      = `Weight: ${data.weight}`;
    setCardColor                (types);
    renderPokemonTypes          (types);
    renderPokemonStats          (stats);
    renderPokemonMoves          (data);
    renderPokemonabilities      (data);
    soundname                   = data.name;
    soundid                     = data.id;
    if(soundid<=721){
        pokeSound.setAttribute  ('src', `sound/${soundid}-${soundname}.wav`);
    }
    else{
        pokeSound.setAttribute  ('src', 'sound/pokemon-3.mp3')
    }
}

const setCardColor = types => {
    const colorOne = typeColors[types[0].type.name];
    const colorTwo = types[1] ? typeColors[types[1].type.name] : typeColors.default;
    pokeImg.style.background =  `radial-gradient(${colorTwo} 33%, ${colorOne} 33%)`;
    pokeImg.style.backgroundSize = ' 5px 5px';

}

const renderPokemonTypes = types => {
    pokeTypes.innerHTML = '';
    types.forEach(type => {
        const typeTextElement = document.createElement("div");
        typeTextElement.style.color = typeColors[type.type.name];
        typeTextElement.textContent = type.type.name;
        pokeTypes.appendChild(typeTextElement);
    });
}

const renderPokemonStats = stats => {
    pokeStats.innerHTML = 'Stats:';
    stats.forEach(stat => {
        const statElement               = document.createElement("div");
        const statElementName           = document.createElement("div");
        const statElementAmount         = document.createElement("div");
        statElementName.textContent     = stat.stat.name;
        statElementAmount.textContent   = stat.base_stat;
        statElement.appendChild         (statElementName);
        statElement.appendChild         (statElementAmount);
        pokeStats.appendChild           (statElement);
    });
}

const renderPokemonMoves = data =>{
    pokeMoves.innerHTML ='Moves:';
    if (data.moves.length > 1 ){
        for(let move=0; move < 4 ; move++){
            const moveElement               = document.createElement("div");
            const moveElementName           = document.createElement("div");
            moveElementName.textContent     = data.moves[move].move.name;
            moveElement.appendChild         (moveElementName);
            pokeMoves.appendChild           (moveElement);
        }
    }else if (data.moves.length = 1){
        for(let move=0; move < 1 ; move++){
        const moveElement               = document.createElement("div");
        const moveElementName           = document.createElement("div");
        moveElementName.textContent     = data.moves[move].move.name;
        moveElement.appendChild         (moveElementName);
        pokeMoves.appendChild           (moveElement);
        }
    }

}

const renderPokemonabilities = data =>{
    pokeAbilities.innerHTML = 'Abilities:';
        if (data.abilities.length >= 2){
            for(let ability=0; ability < data.abilities.length ; ability++){
                const abilityElement               = document.createElement("div");
                const abilityElementName           = document.createElement("div");
                abilityElementName.textContent     = data.abilities[ability].ability.name;
                abilityElement.appendChild         (abilityElementName);
                pokeAbilities.appendChild          (abilityElement);
            }
        }else if (data.abilities.length <2){
            for(let ability=0; ability < data.abilities.length ; ability++){
                const abilityElement               = document.createElement("div");
                const abilityElementName           = document.createElement("div");
                abilityElementName.textContent     = data.abilities[ability].ability.name;
                abilityElement.appendChild         (abilityElementName);
                pokeAbilities.appendChild          (abilityElement);
            }
    }
}

function renderNotFound() {
    pokeName.textContent        = 'Pokemon no encontrado';
    pokeImg.setAttribute        ('src', 'img/DitoBailando.gif');
    pokeImg.style.background    = '#fff';
    pokeTypes.innerHTML         = '';
    pokeStats.innerHTML         = '';
    pokeId.textContent          = '';
    pokeMoves.innerHTML         = '';
    pokeAbilities.innerHTML     = '';
    pokeHeight.textContent      = '';
    pokeWeight.textContent      = '';
    pokeSound.setAttribute      ('src', 'sound/error.mp3');
}

