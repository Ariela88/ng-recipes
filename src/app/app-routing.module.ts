import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RecipesListComponent } from './components/recipes-list/recipes-list.component';
import { RecipeDetailComponent } from './components/recipe-detail/recipe-detail.component';
import { RecipeAddComponent } from './components/recipe-add/recipe-add.component';
import { RecipeNotFoundComponent } from './components/recipe-not-found/recipe-not-found.component';
import { FavouritesComponent } from './components/favourites/favourites.component';

const routes: Routes = [

{path: 'list', component: RecipesListComponent},
{path: '', redirectTo: 'list',pathMatch:'full'},
{ path: 'favourites', component: FavouritesComponent },
{path: 'new', loadComponent: ()=> import('./components/recipe-add/recipe-add.component').then(cmp => cmp.RecipeAddComponent)},
{path: 'recipe/:id', loadComponent: ()=> import('./components/recipe-detail/recipe-detail.component').then(cmp => cmp.RecipeDetailComponent)},
{path: '**', component: RecipeNotFoundComponent},



];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
