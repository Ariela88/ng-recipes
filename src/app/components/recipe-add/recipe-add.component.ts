import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataService } from 'src/app/services/data.service';
import { Recipe } from 'src/app/model/recipe';

@Component({
  selector: 'app-recipe-add',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './recipe-add.component.html',
  styleUrls: ['./recipe-add.component.scss']
})
export class RecipeAddComponent {

  constructor(private data: DataService) { }



  submitRecipe() {

    const newRecipe: Recipe = {
      createdAt: 1696234492000,
      url: "https://blog.giallozafferano.it/dulcisinforno/wp-content/uploads/2021/01/Pasta-cacio-e-pepe-2634.jpg",
      name: "spaghetti cacio e pepe",
      ingredients: [
        "spaghetti",
        "pepe",
        "olio EVO",
        "pecorino romano"
      ],
      description: "gratta il pecorino",
      category: 1,

    }
    this.data.postRecipe(newRecipe).subscribe(addedRecipe=>console.log(addedRecipe))
  }
}


