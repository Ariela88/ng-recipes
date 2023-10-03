import { CommonModule } from '@angular/common';
import { DataService } from 'src/app/services/data.service';
import { Recipe } from 'src/app/model/recipe';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Component, ElementRef, ViewChild, inject } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  MatAutocompleteSelectedEvent,
  MatAutocompleteModule,
} from '@angular/material/autocomplete';
import { MatChipInputEvent, MatChipsModule } from '@angular/material/chips';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { MatIconModule } from '@angular/material/icon';
import { NgFor, AsyncPipe } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { Router } from '@angular/router';

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
    MatButtonModule
  ],

  templateUrl: './recipe-add.component.html',
  styleUrls: ['./recipe-add.component.scss'],
})
export class RecipeAddComponent {

  recipe?: Recipe;
  newRecipe: Recipe = {
    name: '',
    createdAt: 0,
    ingredients: [],
    description: '',
    category: 0,
    url: '',
    isFavourite:false
  };

  constructor(private dataServ: DataService, private router:Router) {
    this.filteredIngredients = this.fruitCtrl.valueChanges.pipe(
      startWith(null),
      map((fruit: string | null) =>
        fruit ? this._filter(fruit) : this.allingredients.slice()
      )
    );
  }

  separatorKeysCodes: number[] = [ENTER, COMMA];
  fruitCtrl = new FormControl('');
  filteredIngredients: Observable<string[]>;
  ingredients: string[] = ['Uova'];
  allingredients: string[] = ['Uova', 'Latte', 'Burro', 'Olio EVO', 'Pollo'];

  @ViewChild('fruitInput') fruitInput?: ElementRef<HTMLInputElement>;

  announcer = inject(LiveAnnouncer);

  submitRecipe() {
    this.newRecipe.ingredients = [...this.ingredients];

    this.dataServ
      .postRecipe(this.newRecipe)
      .subscribe((addedRecipe) => (this.recipe = addedRecipe));
      this.router.navigateByUrl('/list')
  }

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();
    if (value) {
      this.ingredients.push(value);
    }
    event.chipInput!.clear();

    this.fruitCtrl.setValue(null);
  }

  remove(fruit: string): void {
    const index = this.ingredients.indexOf(fruit);

    if (index >= 0) {
      this.ingredients.splice(index, 1);

      this.announcer.announce(`Removed ${fruit}`);
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.ingredients.push(event.option.viewValue);
    this.fruitInput!.nativeElement.value = '';
    this.fruitCtrl.setValue(null);
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.allingredients.filter((fruit) =>
      fruit.toLowerCase().includes(filterValue)
    );
  }
}
