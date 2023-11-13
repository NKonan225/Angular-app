import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExpensesAddEditComponent } from './expenses-add-edit.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [ExpensesAddEditComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    SharedModule
  ],
  exports: [ExpensesAddEditComponent]
})
export class ExpensesAddEditModule { }
