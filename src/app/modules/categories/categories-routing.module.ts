import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoriesListComponent } from './categories-list/categories-list.component';

const routes: Routes = [
  { path: '', component: CategoriesListComponent },
  { path: 'add', component: CategoriesListComponent },
  { path: 'edit/:id', component: CategoriesListComponent },
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CategoriesRoutingModule {}
