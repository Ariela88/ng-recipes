import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Router, RouterModule } from '@angular/router';
import { MatMenuModule } from '@angular/material/menu';
import { CategoryToStringPipe } from 'src/app/pipes/category-to-string.pipe';
import { DishType, Recipe } from 'src/app/model/recipe';
import { DataService } from 'src/app/services/data.service';
import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    CommonModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    RouterModule,
    MatMenuModule,
    CategoryToStringPipe,
    MatFormFieldModule,
    MatSelectModule

  ],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  allRecipes: Recipe[] = [];
  recipes: Recipe[] = [];
  selectedCategory: string = '-1';
  recipe?:Recipe;
  categories = Object.entries(DishType).slice(Object.entries(DishType).length/2);





  constructor(

    private router: Router,
    private data: DataService
  ) { }

  filter() {
    this.data.filterByCategory(parseInt(this.selectedCategory));
  }
}
