import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataService } from 'src/app/services/data.service';
import { ActivatedRoute } from '@angular/router';
import { Recipe } from 'src/app/model/recipe';

@Component({
  selector: 'app-recipe-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.scss']
})
export class RecipeDetailComponent {

  constructor(private route:ActivatedRoute, private data:DataService){}


@Input() recipe:Recipe[]=[]


    ngOnInit(): void {

      const id = this.route.snapshot.paramMap.get('id')
      if(id){
        this.data.getRecipe(id).subscribe(recipe => console.log(recipe))
      }


  }




}


