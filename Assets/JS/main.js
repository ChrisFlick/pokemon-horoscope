let pokeType

$(document).ready(function() {
    let pokemon = getPokemon('mew');

    pokemon.then(function(response) {
        displayPokemon(response)
    });

})


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

    $('#sprite').empty()
    $('#sprite').append($sprite)    

    
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