import { Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Expense, Expenses } from 'src/app/models/expenses.models';
import { headerTable } from 'src/app/shared/constants/constants-table-header';

import { ExpensesServiceService } from 'src/app/services/expenses-service.service';
import { Subject, takeUntil } from 'rxjs';
import { ExpensesAddEditComponent } from '../expenses-add/expenses-add-edit.component';

@Component({
  selector: 'app-expenses-list',
  templateUrl: './expenses-list.component.html',
  styleUrls: ['./expenses-list.component.scss']
})
export class ExpensesListComponent implements OnInit, OnDestroy {
  
  expense = {} as Expense;
  @Input() expensesDataTable: Expenses = {items: [], count: 0 };
  @Input() isDefaultPaginationPage=false;
  private destroy$: Subject<void> = new Subject();
  tableauHeader = headerTable;

  @ViewChild('modal', {static: false}) modal = {} as ExpensesAddEditComponent;

  constructor(router: Router, private expensesServiceService : ExpensesServiceService) { }

  ngOnInit(): void {
    this.expensesServiceService.modificationExpense
    .asObservable()
    .pipe(takeUntil(this.destroy$))
    .subscribe((modificationState) => {
      if(modificationState === true) {
        this.isDefaultPaginationPage = true;
      } else {
        this.isDefaultPaginationPage = false;
      }
    });
  }

  editExpense(event: any) {
    if(event) {
      this.expense = event.valeur;
      this.modal.open(true)
    }
  }

  addExpense() {
    this.modal.open(false);
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
