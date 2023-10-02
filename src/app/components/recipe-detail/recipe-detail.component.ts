import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataService } from 'src/app/services/data.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Recipe } from 'src/app/model/recipe';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import { CardComponent } from '../card/card.component';
import { Observable } from 'rxjs';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-recipe-detail',
  standalone: true,
  imports: [CommonModule,
            MatCardModule,
            MatButtonModule,
            CardComponent,
            FormsModule,
            
            ReactiveFormsModule
          ],
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.scss']
})
export class RecipeDetailComponent implements OnInit{
  recipe?: Recipe;

    newRecipe: Recipe = {
      name: '',           
      createdAt: 0,       
      ingredients: [],
      description: '',
      category: 0,
      url: ''
    };
  
  isEditing = false;

  constructor(private dataServ: DataService, private route: ActivatedRoute, private router: Router){
   
  }

 

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.dataServ.getRecipe(id).subscribe(recipe => {
        this.recipe = recipe;
        this.newRecipe = { ...recipe };  
      });
    }
  }

  delete(recipeId: string){

    this.dataServ.deleteRecipe(recipeId).subscribe(result => {
      this.router.navigateByUrl('/list')
    });
  }

  startEditing() {
    this.isEditing = true;
}

saveRecipe(){
  if (this.recipe && this.recipe.id) {
    this.dataServ
      .updateRecipe(this.recipe.id, this.newRecipe)
      .subscribe((addedRecipe) => (this.recipe = addedRecipe));
}
}
cancelEditing() {
  this.isEditing = false;
}

}