import { Injectable } from '@angular/core';
import { API } from '../shared/constants/constants';
import { Observable, Subject, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Expense, Expenses } from '../models/expenses.models';

@Injectable({
  providedIn: 'root'
})
export class ExpensesServiceService {

  private readonly URL_EXPENSES = API.PREFIXE+ '/expenses';
  public modificationExpense: Subject<boolean> = new Subject();

  constructor(private httpClient: HttpClient) { }


  getExpenses(): Observable<Expenses> {
    return this.httpClient.get<Expenses>(`${this.URL_EXPENSES}`);
  }


  getExpenseById(id: string): Observable<Expense> {
    return this.httpClient.get<Expense>(`${this.URL_EXPENSES}/${id}`);
  }

  addExpense(expense: Expense): Observable<Expense> {
    return this.httpClient
      .post<Expense>(`${this.URL_EXPENSES}`, expense)
      .pipe(tap(() => this.modificationExpense.next(false)));
  }

  updateExpense(expense: Expense, idExpense: number): Observable<Expense> {
    return this.httpClient
      .put<Expense>(`${this.URL_EXPENSES}/${idExpense}`, expense)
      .pipe(tap(() => this.modificationExpense.next(false)));
  }

}
