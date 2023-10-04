import { Injectable } from '@angular/core';
import { DishType, Recipe } from '../model/recipe';
import { BehaviorSubject, Observable, catchError } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DataService {


  selectedCategorie: string = "-1";
  recipes: Recipe[] = []

  private allRecipes: Recipe[] = [];
  private filteredRecipesSubject: BehaviorSubject<Recipe[]> = new BehaviorSubject<Recipe[]>([]);
  filteredRecipes$: Observable<Recipe[]> = this.filteredRecipesSubject.asObservable();
  selectedCategory: string = '-1';
  readonly DB_URL = "https://651a7a94340309952f0d59cb.mockapi.io/recipe";

  constructor(private http: HttpClient) {
    this.getAllRecipes().subscribe(recipes => {
      this.allRecipes = recipes;
      this.filteredRecipesSubject.next(this.allRecipes);
    });
   }

  getAllRecipes(): Observable<Recipe[]> {
    return this.http.get<Recipe[]>(this.DB_URL);
  }

  getRecipe(recipeId: string): Observable<Recipe> {
    return this.http.get<Recipe>(this.DB_URL + '/' + recipeId);
  }

  postRecipe(newRecipe: Recipe): Observable<Recipe> {
    return this.http.post<Recipe>(this.DB_URL, newRecipe, { headers: { 'content-type': 'application/json' } })
  }

  deleteRecipe(recipeId: string): Observable<Recipe> {
    return this.http.delete<Recipe>(this.DB_URL + '/' + recipeId);
  }
  updateRecipe(id: string, updatedRecipe: Recipe): Observable<Recipe> {
    const url = `${this.DB_URL}/${id}`;
    return this.http.put<Recipe>(url, updatedRecipe);
  }


  filterByCategory(category: DishType) {
    if (category === DishType['tutti']) {
      this.filteredRecipesSubject.next(this.allRecipes);
    } else {
      const filteredRecipes = this.allRecipes.filter(recipe => recipe.category === category);
      this.filteredRecipesSubject.next(filteredRecipes);
    }
  }




}
