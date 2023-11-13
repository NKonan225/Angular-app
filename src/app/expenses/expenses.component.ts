import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { ExpensesServiceService } from '../services/expenses-service.service';
import { Subject, takeUntil } from 'rxjs';
import { Expenses } from '../models/expenses.models';

@Component({
  selector: 'app-expenses',
  templateUrl: './expenses.component.html',
  styleUrls: ['./expenses.component.scss']
})
export class ExpensesComponent implements OnInit, OnDestroy {

  expensesData: Expenses = {count: 0, items: []};
  private destroy$: Subject<void> = new Subject();
  isDefaultPaginationPage = false;
  constructor(private expensesServiceService : ExpensesServiceService,
    private changeDetectorRef: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.initTable();

    this.expensesServiceService.modificationExpense
      .asObservable()
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        this.initTable();
        this.changeDetectorRef.markForCheck();
      });

  }

  initTable() {
    this.expensesServiceService
    .getExpenses()
    .pipe(takeUntil(this.destroy$))
    .subscribe(
      (data: Expenses) => {
        this.expensesData = data;
        this.changeDetectorRef.markForCheck();
      }
    );

  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

}
