var { Observable } = require("data/observable");
var { ObservableArray } = require("data/observable-array");
var http = require("http");

exports.createViewModel = function createViewModel() {
    var viewModel = new Observable();
    viewModel.title = 'Pokedex index';
    viewModel.pokedexList = new ObservableArray([]);
    viewModel.isLoading = false;

    viewModel.load = function loadPokedexList() {
        return http.getJSON('http://pokeapi.co/api/v2/pokedex/').then(function (response) {
            if (response.results) {
                viewModel.pokedexList.push(response.results);
            }

        }).catch(function(error) {
            //Handle error;
            console.log(error);
            return null;
        });
    };

    return viewModel;
}