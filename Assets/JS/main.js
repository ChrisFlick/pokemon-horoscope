'use strict'

let pokeType;

$(document).ready(function() {
    let pokemon = getPokemon('pikachu');
   

    pokemon.then(function(response) {
        displayPokemon(response)
    });

    $('#search').on('submit', function() {
        event.preventDefault()  
        pokemon = getPokemon($('#pokemonName').val().toLowerCase())
        

        pokemon.then(function(response) {
            displayPokemon(response)

            let sound = new Audio('../assets/sound/pokemon.mp3')
            sound.volume = .1;
            sound.play();

        }).catch(function(error) {
            console.log(error);
            // debugger;
        });
    });

});


/***********************
****** Image Links *****
***********************/

let aquariusImg = $("<img>").attr("src", "../Assets/images/aquarius.jpg");
let ariesImg = $("<img>").attr("src", "../Assets/images/aries.jpg");
let cancerImg = $("<img>").attr("src", "../Assets/images/cancer.jpg");
let capricornImg = $("<img>").attr("src", "../Assets/images/capricorn.jpg");
let geminiImg = $("<img>").attr("src", "../Assets/images/gemini.jpg");
let leoImg = $("<img>").attr("src", "../Assets/images/leo.jpg");
let libraImg = $("<img>").attr("src", "../Assets/images/libra.jpg");
let piscesImg = $("<img>").attr("src", "../Assets/images/pisces.jpg");
let sagittariusImg = $("<img>").attr("src", "../Assets/images/sagittarius.jpg");
let scorpioImg = $("<img>").attr("src", "../Assets/images/scorpio.jpg");
let taurusImg = $("<img>").attr("src", "../Assets/images/taurus.jpg");
let virgoImg = $("<img>").attr("src", "../Assets/images/virgo.jpg");

/*********************
****** Functions *****
*********************/

function displayPokemon(response) {
    console.log(response)

    let $sprite = $('<img>')
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

    $('#sprite').empty();
    $('#sprite').append($sprite);   

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

function horoscopeType(type) {
    let horoscope;

    if (type === 'fire' || type === 'fighting') {
        horoscope = 'aries'
    } else if (type === 'rock' || type === 'steel') {
        horoscope = 'taurus'
    } else if (type === 'fairy') {
        horoscope = 'gemini'
    } else if (type === 'dark') {
        horoscope = 'cancer'
    } else if (type === 'dragon' ) {
        horoscope = 'leo'
    } else if (type === 'flying') {
        horoscope = 'virgo'
    } else if (type === 'ghost' || type === 'psychic') {
        horoscope = 'libra'
    } else if (type === 'bug') {
        horoscope = 'scorpio'
    } else if (type === 'normal' || type === 'ground') {
        horoscope = 'sagitarius'
    } else if (type === 'electric') {
        horoscope = 'capricorn';
    } else if (type === 'water' || type === 'ice') {
        horoscope = 'aquarius'
    } else if (type === 'grass' || type === 'poison') {
        horoscope = 'pisces'
    }

    return horoscope
}
