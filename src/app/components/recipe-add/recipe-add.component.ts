import { CommonModule } from '@angular/common';
import { DataService } from 'src/app/services/data.service';
import { DishType, Recipe } from 'src/app/model/recipe';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Component, ElementRef, ViewChild, inject } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  MatAutocompleteSelectedEvent,
  MatAutocompleteModule,
} from '@angular/material/autocomplete';
import { MatChipInputEvent, MatChipsModule } from '@angular/material/chips';
import { MatSelectModule } from '@angular/material/select';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { MatIconModule } from '@angular/material/icon';
import { NgFor, AsyncPipe } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { Router } from '@angular/router';
import { CategoryToStringPipe } from 'src/app/pipes/category-to-string.pipe';

@Component({
  selector: 'app-recipe-add',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,

    MatFormFieldModule,
    MatChipsModule,
    NgFor,
    MatIconModule,
    MatAutocompleteModule,
    ReactiveFormsModule,
    AsyncPipe,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    CategoryToStringPipe,
  ],

  templateUrl: './recipe-add.component.html',
  styleUrls: ['./recipe-add.component.scss'],
})
export class RecipeAddComponent {
  recipe?: Recipe;
  value = 'Clear me';
  categoryOptions: number[] = [0, 1, 2, 3, 4, 5];
  newRecipe: Recipe = {
    name: '',
    createdAt: 0,
    ingredients: [],
    description: '',
    category: DishType.dessert,
    url: '',
    isFavourite: false,
    rating: 1
  };

  constructor(private dataServ: DataService, private router: Router) {
    this.filteredIngredients = this.ingredientCtrl.valueChanges.pipe(
      startWith(null),
      map((ingredient: string | null) =>
        ingredient ? this._filter(ingredient) : this.allingredients.slice()
      )
    );
  }

  separatorKeysCodes: number[] = [ENTER, COMMA];
  ingredientCtrl = new FormControl('');
  filteredIngredients: Observable<string[]>;
  ingredients: string[] = ['Uova'];
  allingredients: string[] = ['Uova', 'Latte', 'Burro', 'Olio EVO', 'Pollo'];

  @ViewChild('ingredientInput') ingredientInput?: ElementRef<HTMLInputElement>;

  announcer = inject(LiveAnnouncer);

  submitRecipe() {
    this.newRecipe.ingredients = [...this.ingredients];

    this.dataServ
      .postRecipe(this.newRecipe)
      .subscribe((addedRecipe) => (this.recipe = addedRecipe));
    this.router.navigateByUrl('/list');
  }

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();
    if (value) {
      this.ingredients.push(value);
    }
    event.chipInput!.clear();

    this.ingredientCtrl.setValue(null);
  }

  remove(ingredient: string): void {
    const index = this.ingredients.indexOf(ingredient);

    if (index >= 0) {
      this.ingredients.splice(index, 1);

      this.announcer.announce(`Removed ${ingredient}`);
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.ingredients.push(event.option.viewValue);
    this.ingredientInput!.nativeElement.value = '';
    this.ingredientCtrl.setValue(null);
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.allingredients.filter((ingredient) =>
      ingredient.toLowerCase().includes(filterValue)
    );
  }
}
