import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExpensesListComponent } from './expenses-list.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { ExpensesAddEditModule } from '../expenses-add/expenses-add-edit.module';



@NgModule({
  declarations: [ExpensesListComponent],
  imports: [
    CommonModule,
    ExpensesAddEditModule,
    SharedModule
  ],
  exports: [ExpensesListComponent],
})
export class ExpensesListModule { }
