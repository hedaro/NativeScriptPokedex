var pokedexViewModel = require("./pokemon-view-model");

var page, pageData;

exports.onNavigatingTo = function onNavigatingTo(args) {
    page = args.object;
    pageData = pokedexViewModel.createViewModel(page.navigationContext.name);
    page.bindingContext = pageData;
};

exports.onLoaded = function onLoaded(args) {
    pageData.set('isLoading', true);
    pageData.load(page.navigationContext.name).then(function (response) {
        pageData.set('isLoading', false);
    }).catch(function (error) {
        pageData.set('isLoading', false);
    });
};