import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';
import { Recipe } from '../model/recipe';

@Directive({
  selector: '[appRepeat]',
  standalone: true
})
export class RepeatDirective {

  recipe?: Recipe;


  @Input() set appRepeat(value: number) {

    for (let i = 0; i < value; i++) {
      this.viewContainerRef.createEmbeddedView(this.template)

    }
  }

  constructor(private viewContainerRef: ViewContainerRef, private template: TemplateRef<any>) { }

}
