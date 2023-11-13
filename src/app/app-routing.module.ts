import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'expenses',
    loadChildren: () => import('./expenses/expenses.module').then((m) => m.ExpensesModule),
  },
  { path: '**', redirectTo: '/expenses', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
