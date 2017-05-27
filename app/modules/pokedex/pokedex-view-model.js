var { Observable } = require("data/observable");
var { ObservableArray } = require("data/observable-array");
var http = require("http");

exports.createViewModel = function createViewModel(name) {
    var viewModel = new Observable();
    viewModel.name = name;
    viewModel.pokemonList = new ObservableArray([]);
    viewModel.isLoading = false;

    viewModel.load = function loadPokedexList(url) {
        return http.getJSON(url).then(function (response) {
            if (response.pokemon_entries) {
                viewModel.pokemonList.push(response.pokemon_entries);
            }

        }).catch(function(error) {
            //Handle error;
            console.log(error);
            return null;
        });
    };

    return viewModel;
}