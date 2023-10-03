import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import { Recipe } from 'src/app/model/recipe';
import {RouterModule } from '@angular/router';
import {MatIconModule} from '@angular/material/icon';
import { CategoryToStringPipe } from 'src/app/pipes/category-to-string.pipe';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [CommonModule,
            MatButtonModule,
            MatCardModule,
            RouterModule,
            MatIconModule,
            CategoryToStringPipe
          ],
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent {

  constructor(public storage:StorageService){}

  @Input() recipeData?: Recipe;
  @Output() recipeSelected = new EventEmitter<Recipe>();
  @Input() isFavourite: boolean = false;
  @Input() bColor: string = 'white';

  select(){
    this.recipeSelected.emit(this.recipeData);
  }

}
