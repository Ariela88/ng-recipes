import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'categoryToString',
  standalone: true
})
export class CategoryToStringPipe implements PipeTransform {

  transform(value: number): string {

    const categoryStrings = [
      'antipasti',
      'primi piatti',
      'secondi piatti',
      'contorno',
      'dolci',
      'cocktails'
    ]

    return categoryStrings[value]
  }

}
