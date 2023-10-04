import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataService } from 'src/app/services/data.service';
import { DishType, Recipe } from 'src/app/model/recipe';
import { CardComponent } from '../card/card.component';
import { Router } from '@angular/router';
import { MatSidenavModule } from '@angular/material/sidenav';

@Component({
  selector: 'app-recipes-list',
  standalone: true,
  imports: [CommonModule, CardComponent, MatSidenavModule],
  templateUrl: './recipes-list.component.html',
  styleUrls: ['./recipes-list.component.scss']
})
export class RecipesListComponent implements OnInit {

  recipes: Recipe[] = [];

  constructor(private dataServ: DataService, public route: Router) { }

  ngOnInit(): void {
    this.dataServ.filteredRecipes$.subscribe(filteredRecipes => {
      this.recipes = filteredRecipes;
    });
  }

  openDetail(recipe: Recipe) {
    this.route.navigateByUrl('/recipe/' + recipe.id);
  }
}
