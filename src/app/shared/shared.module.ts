import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SimpleDatatableModule } from './simple-datatable/simple-datatable.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  imports: [
    CommonModule,
    SimpleDatatableModule,
    //FormsModule,
    //ReactiveFormsModule

  ],
  exports: [SimpleDatatableModule]
})
export class SharedModule { }
