import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';
import 'rxjs/add/operator/switchMap';

import { MovieDetail } from './../model/movie-detail';
import { PeliculaService } from './../pelicula.service';

import { MovieList } from './../model/movie-list';
import { MovieListService } from './../movie-list.service';

@Component({
  selector:'movie-list-detail',
  template:`
    <div *ngIf="movieList" class="center-align">
      <div class="card-panel teal lighten-2 black-text">
        <h2>{{movieList.nombre}} </h2>
        <span>Propietario: {{movieList.ownerId}}</span>
      </div>

      <div class="card-panel teal lighten-2 black-text">
        <h3>Peliculas:</h3>
        <div class="container">
        <table class="centered">
        <thead>
        <tr>
          <th>Nombre</th>
          <th>Año</th>
        </tr>
        </thead>
        <tbody>
        <tr *ngFor="let pelicula of movieList.listaPeliculas">
          <td><a class="blue-text text-darken-4" [routerLink]="['/pelicula', pelicula.id]">{{pelicula.nombre}}</a></td>
          <td>{{pelicula.anioEstreno}}</td>
        </tr>
        </tbody>
        </table>
        </div>
      </div>

    </div>
  `
})

export class MovieListDetailComponent implements OnInit {
  movieList: MovieList;

  ngOnInit(): void {
    this.route.params
      .switchMap((params: Params) => this.movieListService.getMovieList(+params['id']))
      .subscribe(movielist => {this.movieList = movielist;});
  }

  constructor(private movieListService: MovieListService, private route: ActivatedRoute, private location: Location) {}
}