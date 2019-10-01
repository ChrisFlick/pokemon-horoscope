let pokeType

$(document).ready(function() {
    let pokemon = getPokemon('pikachu');

    pokemon.then(function(response) {
        displayPokemon(response)
    });

    $('#search').on('submit', function() {
        event.preventDefault()
        pokemon = getPokemon($('#pokemonName').val())

        pokemon.then(function(response) {
            displayPokemon(response)
        });
    });

    // let horoscope = getHoroscop('gemini');

    // horoscope.then(function(response) {
    //     displayHoroscope(response)
    // })
});


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


    pokeType = response.types[0].type.name;
    
    
    $name.text(response.name + " #" + response.id)
    $type.text(pokeType)

    $height.text('Height: 0.' + response.height + "m");

    $weight.text('Weight: ' + response.weight / 10 + 'kg')
    
    $sprite.attr('src', response.sprites.front_default)
    $sprite.css('width', '1000px')

    $('#sprite').empty()
    $('#sprite').append($sprite)    

    
}

function displayHoroscope(response) {
    // Display horoscope
    let horoResponse = JSON.parse(response);
    let horoSign = horoResponse.sunsign;
    let horoSignEl = $("<p>").text(horoSign);
    let horoText = horoResponse.horoscope;
    let horoTextEl = $("<p>").text(horoText);

    $("#horoscope").append(horoSignEl).append(horoTextEl);
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
