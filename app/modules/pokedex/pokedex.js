var pokedexViewModel = require("./pokedex-view-model");
var frameModule = require("ui/frame");
var page, pageData;

exports.onNavigatingTo = function onNavigatingTo(args) {
    page = args.object;
    pageData = pokedexViewModel.createViewModel(page.navigationContext.name);
    page.bindingContext = pageData;
};

exports.onLoaded = function onLoaded(args) {
    pageData.set('isLoading', true);
    pageData.load(page.navigationContext.url).then(function (response) {
        pageData.set('isLoading', false);
    }).catch(function (error) {
        pageData.set('isLoading', false);
    });
};

exports.viewPokemon = function viewPokemon(args) {
    var topmost = frameModule.topmost();
    topmost.navigate({
        moduleName: 'modules/pokemon/pokemon',
        context: args.object.bindingContext.pokemon_species
    });
};