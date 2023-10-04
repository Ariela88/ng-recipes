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
    CategoryToStringPipe
  ],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  recipes: Recipe[] = [];
  categories?: DishType[];
  recipe?:Recipe;

  selectedCategory: string = '-1';

  constructor(

    private router: Router,
    private data: DataService
  ) { }

  filter(category: string) {
    const categoryNumber = parseInt(category, 10);
    this.data.filterByCategory(categoryNumber);
    console.log(categoryNumber);
  }
}
