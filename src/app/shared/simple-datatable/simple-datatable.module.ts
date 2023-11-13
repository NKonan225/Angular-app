import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SimpleDatatableComponent } from './simple-datatable.component';



@NgModule({
  declarations: [SimpleDatatableComponent],
  imports: [
    CommonModule
  ],
  exports: [SimpleDatatableComponent],
})
export class SimpleDatatableModule { }
