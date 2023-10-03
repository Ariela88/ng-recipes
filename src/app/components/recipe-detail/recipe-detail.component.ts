import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataService } from 'src/app/services/data.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Recipe } from 'src/app/model/recipe';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { CardComponent } from '../card/card.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatChipsModule } from '@angular/material/chips';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { CategoryToStringPipe } from 'src/app/pipes/category-to-string.pipe';
import { MatSelectModule } from '@angular/material/select';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-recipe-detail',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    CardComponent,
    FormsModule,
    MatIconModule,
    MatFormFieldModule,
    MatChipsModule,
    MatAutocompleteModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    CategoryToStringPipe,
    MatSelectModule,
  ],
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.scss'],
})
export class RecipeDetailComponent implements OnInit {


  recipe?: Recipe;
  categoryOptions: number[] = [0, 1, 2, 3, 4, 5];
  newRecipe: Recipe = {
    name: '',
    createdAt: 0,
    ingredients: [],
    description: '',
    category: 0,
    url: '',
    isFavourite: false,
  };

  isEditing = false;

  constructor(
    private dataServ: DataService,
    private route: ActivatedRoute,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.dataServ.getRecipe(id).subscribe((recipe) => {
        this.recipe = recipe;
        this.newRecipe = { ...recipe };
      });
    }
  }

  delete(recipeId: string) {
    this.dataServ.deleteRecipe(recipeId).subscribe((result) => {
      this.router.navigateByUrl('/list');
    });
  }

  startEditing() {
    this.isEditing = true;
  }

  saveRecipe() {
    if (this.recipe && this.recipe.id) {
      this.dataServ
        .updateRecipe(this.recipe.id, this.newRecipe)
        .subscribe((addedRecipe) => {
          this.newRecipe = addedRecipe;
          this.cdr.detectChanges();
        });
      this.router.navigateByUrl('/list');
    }
  }

  cancelEditing() {
    this.isEditing = false;
  }
}
