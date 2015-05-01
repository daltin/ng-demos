module.exports = function(app) {
    var jsonfileservice = require('./utils/jsonfileservice')();

    app.get('/api/maa', getMaa);
    app.get('/api/comics', getComics);
    app.get('/api/movies', getMovies);

    function getMaa(req, res, next) {
        var json = jsonfileservice.getJsonFromFile('/../../data/maa.json');
        res.send(json);
    }
    
    function getComics(req, res, next) {
        var json = jsonfileservice.getJsonFromFile('/../../data/comics.json');
        res.send(json);
    }
    
    function getMovies(req, res, next) {
        var json = jsonfileservice.getJsonFromFile('/../../data/movies.json');
        res.send(json);
    }
};