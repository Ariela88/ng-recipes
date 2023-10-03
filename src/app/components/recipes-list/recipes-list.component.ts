import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataService } from 'src/app/services/data.service';
import { Recipe } from 'src/app/model/recipe';
import { CardComponent } from '../card/card.component';
import { Router } from '@angular/router';
import {MatSidenavModule} from '@angular/material/sidenav';

@Component({
  selector: 'app-recipes-list',
  standalone: true,
  imports: [CommonModule,
            CardComponent,
            MatSidenavModule
            ],
  templateUrl: './recipes-list.component.html',
  styleUrls: ['./recipes-list.component.scss']
})
export class RecipesListComponent implements OnInit{

  recipes: Recipe[] = [];

  constructor(private dataServ: DataService, public route: Router){}

  

  ngOnInit(): void {
    this.dataServ.getAllRecipes().subscribe(recipe => this.recipes = recipe);
  }
  
  
  
  
  
  
  openDetail(recipe: Recipe){
    this.route.navigateByUrl('/recipe/' + recipe.id);
    console.log(recipe)
  }
}
