import { Pipe, PipeTransform } from '@angular/core';
import { DishType } from '../model/recipe';

@Pipe({
  name: 'categoryToString',
  standalone: true
})
export class CategoryToStringPipe implements PipeTransform {

  


  transform(value: number): string {

    return DishType[value]

  }

}
