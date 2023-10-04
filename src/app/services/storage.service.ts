import { Injectable } from '@angular/core';
import { Recipe } from '../model/recipe';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  favouritesSubject = new BehaviorSubject<Recipe[]>([]);

  constructor() {

    if (localStorage.getItem('favourites')) {

      this.favouritesSubject.next(JSON.parse(localStorage.getItem('favourites')!))
    }
  }


  saverecipe(recipe: Recipe) {
    recipe.isFavourite = true;
    const actualArray = this.favouritesSubject.value;
    const newArray = [...actualArray, recipe];
    this.favouritesSubject.next(newArray);
    localStorage.setItem('favourites', JSON.stringify(newArray));
  }

  removerecipe(recipe: Recipe) {
    recipe.isFavourite = false;

    const actualArray = this.favouritesSubject.value;
    const newArray = actualArray.filter((p) => p.id !== recipe.id);
    this.favouritesSubject.next(newArray);
    localStorage.setItem('favourites', JSON.stringify(newArray));
  }

  toggleFavourites(recipe: Recipe) {
    if (this.isFavourite(recipe)) {
      this.removerecipe(recipe)

    } else {
      this.saverecipe(recipe)
    }
  }


  isFavourite(recipe: Recipe): boolean {

    return this.favouritesSubject.value.some(r => r.id === recipe.id);
  }
}


