import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Recipe } from 'src/app/model/recipe';
import { StorageService } from 'src/app/services/storage.service';
import { CardComponent } from '../card/card.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-favourites',
  standalone: true,
  imports: [CommonModule, CardComponent],
  templateUrl: './favourites.component.html',
  styleUrls: ['./favourites.component.scss'],
})
export class FavouritesComponent implements OnInit {

  favourites: Recipe[] = [];

  constructor(private storage: StorageService, private route: Router) { }

  ngOnInit(): void {
    this.storage.favouritesSubject.subscribe((arrayOfFavourites) => {
      this.favourites = arrayOfFavourites;

    });
  }

  openDetail(recipe: Recipe) {
    this.route.navigateByUrl('/recipe/' + recipe.id);

  }

}
