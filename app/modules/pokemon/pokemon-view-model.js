var { Observable } = require("data/observable");
var http = require("http");

exports.createViewModel = function createViewModel(name) {
    var viewModel = new Observable();
    viewModel.name = name;
    viewModel.pokemonData = new Observable({
        sprite: '',
        types: '',
        abilities: ''
    });
    viewModel.isLoading = false;

    viewModel.load = function loadPokedexList(name) {
        return http.getJSON('http://pokeapi.co/api/v2/pokemon/' + name).then(function (response) {

            if (response.sprites && response.sprites.front_default) {
                viewModel.pokemonData.sprite = response.sprites.front_default;
            }

            var types = response.types.map(function(type) {
                return type.type.name;
            }).join("/");
            viewModel.pokemonData.set('types',types);
            console.log(viewModel.pokemonData);


        }).catch(function(error) {
            //Handle error;
            console.log(error);
            return null;
        });
    };

    return viewModel;
}