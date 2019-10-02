'use strict'

let pokeType;
let pokemon

$(document).ready(function() {
    pokemon = getPokemon('pikachu');
   

    pokemon.then(function(response) {
        pokemon = response
        displayPokemon(response)
    });

    $('#search').on('submit', function() {
        event.preventDefault()  
        pokemon = getPokemon($('#pokemonName').val().toLowerCase())
        

        pokemon.then(function(response) {
            pokemon = response
            displayPokemon(pokemon)

            let sound = new Audio('../assets/sound/pokemon.mp3')
            sound.volume = .1;
            sound.play();

        }).catch(function(error) {
            console.log(error);
            // debugger;
        });
    });

    // $('#evolve').on('click', function() {
    //     let species = pokemon.species.url
    //     species = getSpecies(species)

    //     console.log(species)

    //     let evolution = species.responseJSON.evolution_chain.url
    //     console.log(evolution)
    // })
});


/***********************
****** Image Links *****
***********************/

let aquariusImg = $("<img>").attr("src", "../Assets/images/aquarius.png");
let ariesImg = $("<img>").attr("src", "../Assets/images/aries.png");
let cancerImg = $("<img>").attr("src", "../Assets/images/cancer.png");
let capricornImg = $("<img>").attr("src", "../Assets/images/capricorn.png");
let geminiImg = $("<img>").attr("src", "../Assets/images/gemini.png");
let leoImg = $("<img>").attr("src", "../Assets/images/leo.png");
let libraImg = $("<img>").attr("src", "../Assets/images/libra.png");
let piscesImg = $("<img>").attr("src", "../Assets/images/pisces.png");
let sagittariusImg = $("<img>").attr("src", "../Assets/images/sagittarius.png");
let scorpioImg = $("<img>").attr("src", "../Assets/images/scorpio.png");
let taurusImg = $("<img>").attr("src", "../Assets/images/taurus.png");
let virgoImg = $("<img>").attr("src", "../Assets/images/virgo.png");

/*********************
****** Functions *****
*********************/

function displayPokemon(response) {
    console.log(response)

    let $sprite = $('<img>')
    let $spriteAnchor = $("<a>");
    let $name = $('#name')
    let $type = $('#type')
    let $height = $('#height')
    let $weight = $('#weight')

    pokeType = response.types;
    console.log(pokeType)
    
    
    $name.text(response.name + " #" + response.id)

    let types = pokeType[0].type.name
    for (let i = 1; i < pokeType.length; i++) {
        types += ", " + pokeType[i].type.name;
    }
    $type.text("Type: (" + types + ")");
    

    $height.text('Height: 0.' + response.height + "m");

    $weight.text('Weight: ' + response.weight / 10 + 'kg');
    
    $sprite.attr('src', response.sprites.front_default);
    $sprite.css('width', '300px');
    // Attach a link to Bulbapedia.net
    $spriteAnchor.attr("href", `https://bulbapedia.bulbagarden.net/wiki/${pokemon.name}_(Pok%C3%A9mon)`)
    .attr("target", "_blank")
    // Assign alt image attribute
    .attr("alt", `${pokemon.name}`);
    $spriteAnchor.append($sprite);

    $('#sprite').empty();
    $('#sprite').append($spriteAnchor);

    let horoscope = getHoroscop(horoscopeType(pokeType[0].type.name))

    horoscope.then(function(response) {
        displayHoroscope(response)
    });
    
}

function displayHoroscope(response) {
    $('#horoscope').empty();
    // Display horoscope
    let horoResponse = JSON.parse(response);
    let horoSign = horoResponse.sunsign;
    let horoSignEl = $("<h1>").text(horoSign);
    let horoText = horoResponse.horoscope;
    let horoTextEl = $("<p>").text(horoText);
    let date = $('<span>');


    $('#horoscope').append(date)

    $("#horoscope").append(horoSignEl).append(horoTextEl);
    console.log(horoResponse)
}

function getPokemon(mon) {
    let queryURL = `https://pokeapi.co/api/v2/pokemon/${mon}`

    return $.ajax({
        url: queryURL,
        method: 'GET',
    })
}

function getHoroscop(sign) {
    let queryURL = `http://sandipbgt.com/theastrologer/api/horoscope/${sign}/today/`

    return $.ajax({
        url: queryURL,
        method: 'GET',
    })
}

function getSpecies(queryURL) {
    return $.ajax({
        url: queryURL,
        method: 'GET'
    })
}

function horoscopeType(type) {
    let horoscope;

    if (type === 'fire' || type === 'fighting') {
        horoscope = 'aries'
        
        $('#horoscopeImg').empty();
        $('#horoscopeImg').append(ariesImg);

    } else if (type === 'rock' || type === 'steel') {
        horoscope = 'taurus'

        $('#horoscopeImg').empty();
        $('#horoscopeImg').append(taurusImg);

    } else if (type === 'fairy') {
        horoscope = 'gemini'

        $('#horoscopeImg').empty();
        $('#horoscopeImg').append(geminiImg);

    } else if (type === 'dark') {
        horoscope = 'cancer'

        $('#horoscopeImg').empty();
        $('#horoscopeImg').append(cancerImg);

    } else if (type === 'dragon' ) {
        horoscope = 'leo'

        $('#horoscopeImg').empty();
        $('#horoscopeImg').append(leoImg);

    } else if (type === 'flying') {
        horoscope = 'virgo'

        $('#horoscopeImg').empty();
        $('#horoscopeImg').append(virgoImg);

    } else if (type === 'ghost' || type === 'psychic') {
        horoscope = 'libra'
        
        $('#horoscopeImg').empty();
        $('#horoscopeImg').append(libraImg);

    } else if (type === 'bug') {
        horoscope = 'scorpio'

        $('#horoscopeImg').empty();
        $('#horoscopeImg').append(scorpioImg);

    } else if (type === 'normal' || type === 'ground') {
        horoscope = 'sagitarius'

        $('#horoscopeImg').empty();
        $('#horoscopeImg').append(sagittariusImg);

    } else if (type === 'electric') {
        horoscope = 'capricorn';

        $('#horoscopeImg').empty();
        $('#horoscopeImg').append(capricornImg);

    } else if (type === 'water' || type === 'ice') {
        horoscope = 'aquarius'

        $('#horoscopeImg').empty();
        $('#horoscopeImg').append(aquariusImg);

    } else if (type === 'grass' || type === 'poison') {
        horoscope = 'pisces'

        $('#horoscopeImg').empty();
        $('#horoscopeImg').append(piscesImg);
    }

    return horoscope
}
