import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExpensesRoutingModule } from './expenses-routing.module';
import { ExpensesListModule } from './expenses-list/expenses-list.module';
import { ExpensesComponent } from './expenses.component';
import { SharedModule } from '../shared/shared.module';



@NgModule({
  declarations: [
    ExpensesComponent
  ],
  imports: [
    CommonModule,
    ExpensesRoutingModule,
    ExpensesListModule,
    SharedModule
  ],
  exports: [ExpensesComponent],
})
export class ExpensesModule { }
