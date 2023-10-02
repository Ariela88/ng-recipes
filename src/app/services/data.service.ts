import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Recipe } from '../model/recipe';
import { ActivatedRoute } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) { }

  readonly DB_URL = "https://651a7a94340309952f0d59cb.mockapi.io/recipe"



  getAllRecipes(): Observable<Recipe[]> {

    return this.http.get<Recipe[]>(this.DB_URL);

  }



  getRecipe(recipeId: string): Observable<Recipe> {

    return this.http.get<Recipe>(this.DB_URL + '/' + recipeId)



  }



  postRecipe(newRecipe: Recipe): Observable<Recipe> {

    return this.http.post<Recipe>(this.DB_URL, newRecipe, { headers: { 'content-type': 'application/json' } })




  }



}
