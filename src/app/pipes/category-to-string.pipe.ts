import { Pipe, PipeTransform } from '@angular/core';
import { DishType } from '../model/recipe';

@Pipe({
  name: 'categoryToString',
  standalone: true
})
export class CategoryToStringPipe implements PipeTransform {



  transform(value: number): string {

//     const categoryStrings = [
//       'antipasti',
//       'primi piatti',
//       'secondi piatti',
//       'contorno',
//       'dolci',
//       'cocktails'
//     ]
// console.log(categoryStrings[value])
    return DishType[value]

  }

}
