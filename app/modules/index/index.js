var indexViewModel = require("./index-view-model");
var frameModule = require("ui/frame");

var page, pageData;

exports.onNavigatingTo = function onNavigatingTo(args) {
    page = args.object;
    pageData = indexViewModel.createViewModel();
    page.bindingContext = pageData;
};

exports.onLoaded = function onLoaded(args) {
    pageData.set('isLoading', true);
    pageData.load().then(function (response) {
        pageData.set('isLoading', false);
    }).catch(function (error) {
        pageData.set('isLoading', false);
    });
};

exports.openPokedex = function openPokedex(args) {
    var topmost = frameModule.topmost();
    topmost.navigate({
        moduleName: 'modules/pokedex/pokedex',
        context: args.object.bindingContext
    });
};
