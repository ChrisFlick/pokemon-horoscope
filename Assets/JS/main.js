$(document).ready(function() {
    let pokemon = getPokemon('bulbasaur');

    pokemon.then(function(response) {
        console.log(response)

        $('#pokemon').empty()

        let $sprite = $('<img>')
        let $name = $('#name')
        let $height = $('#height')
        let $weight = $('#weight')
        
        $name.text(response.name + " #" + response.id)
        $height.text('Height: 0.' + response.height + "m");

        $weight.text('Weight: ' + response.weight / 10 + 'kg')
    

        

        $sprite.attr('src', response.sprites.front_default)

        $('#sprite').append($sprite)    


    })
})


/*********************
****** Functions *****
*********************/

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