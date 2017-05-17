"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require("@angular/core");
var movie_list_service_1 = require("./../movie-list.service");
var MovieListComponent = (function () {
    function MovieListComponent(movieListService) {
        this.movieListService = movieListService;
    }
    //crear lista de peliculas 
    MovieListComponent.prototype.crearClick = function () {
        var user = 1;
        this.movieListService.createMovieList(this.nombreLista, user);
        this.nombreLista = "Lista creada exitosamente";
    };
    MovieListComponent.prototype.textReset = function () {
        this.nombreLista = "";
    };
    //movielists de un user o de todos si es admin
    MovieListComponent.prototype.verListas = function () {
        var _this = this;
        this.actoresFavoritos = null;
        this.peliculasActoresFavoritos = null;
        //Para Admin(ve todas)
        /*
          this.movieListService.getMovieLists()
            .then(movieLists => {if(movieLists.length==0){
                                    this.encontro=false;
                                }else{
                                    this.movieLists = movieLists;
                                    this.encontro=true;
                                });
        */
        //Para user: asignar user logueado
        var user = 1;
        this.movieListService.getMovieListsByUser(user)
            .then(function (movieLists) {
            if (movieLists.length == 0) {
                _this.encontro = false;
            }
            else {
                _this.movieLists = movieLists;
                _this.encontro = true;
            }
        });
    };
    //actores favoritos del usuario
    MovieListComponent.prototype.verActoresFavoritos = function () {
        var _this = this;
        this.movieLists = null;
        this.peliculasActoresFavoritos = null;
        //Para user: asignar user logueado
        var user = 1;
        this.movieListService.getActoresFavoritos(user)
            .then(function (actores) {
            if (actores.length == 0) {
                _this.encontro = false;
            }
            else {
                _this.actoresFavoritos = actores;
                _this.encontro = true;
            }
        });
    };
    //peliculas con mas de un actor favorito
    MovieListComponent.prototype.verPeliculasVariosActoresFavoritos = function () {
        var _this = this;
        this.movieLists = null;
        this.actoresFavoritos = null;
        var user = 1;
        this.movieListService.getPeliculasVariosActoresFavoritos(user)
            .then(function (peliculas) {
            if (peliculas.length == 0) {
                _this.encontro = false;
            }
            else {
                _this.peliculasActoresFavoritos = peliculas;
                _this.encontro = true;
            }
        });
    };
    //interseccion de peliculas entre dos listas
    MovieListComponent.prototype.verInterseccion = function () {
        console.log(this.idLista1);
        console.log(this.idLista2);
        if (this.idLista1 == null || this.idLista2 == null) {
            console.log('Seleccione una lista');
        }
        else {
            this.movieListService.getInterseccion(this.idLista1, this.idLista2);
        }
    };
    MovieListComponent.prototype.setLista1 = function (idMovie) {
        this.idLista1 = idMovie;
    };
    MovieListComponent.prototype.setLista2 = function (idMovie) {
        this.idLista2 = idMovie;
    };
    MovieListComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.encontro = true;
        this.idLista1 = null;
        this.idLista2 = null;
        var user = 1;
        this.movieListService.getMovieListsByUser(user)
            .then(function (movieLists) { _this.dropDownMovieLists = movieLists; });
    };
    return MovieListComponent;
}());
MovieListComponent = __decorate([
    core_1.Component({
        selector: 'movie-list',
        templateUrl: './partials/movie-list.component.html',
    }),
    __metadata("design:paramtypes", [movie_list_service_1.MovieListService])
], MovieListComponent);
exports.MovieListComponent = MovieListComponent;
//# sourceMappingURL=movie-list.component.js.map