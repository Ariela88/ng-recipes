import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import { Recipe } from 'src/app/model/recipe';
import {RouterModule } from '@angular/router';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [CommonModule,
            MatButtonModule,
            MatCardModule,
            RouterModule],
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent {

  constructor(){}

  @Input() recipeData?: Recipe;
  @Output() recipeSelected = new EventEmitter<Recipe>();

  select(){
    this.recipeSelected.emit(this.recipeData);
  }

}