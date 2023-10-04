export interface Recipe {

  createdAt: number
  url: string
  name: string
  ingredients?: string[]
  description: string
  category: DishType;
  id?: string;
  isFavourite:boolean;
  rating:number;

}

export enum DishType{
  antipasto,
  primo,
  secondo,
  dessert,
  cocktail
}
