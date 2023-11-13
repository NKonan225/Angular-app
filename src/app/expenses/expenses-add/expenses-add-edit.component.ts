import { Component, OnInit, Input, ViewChild, ElementRef, OnDestroy, OnChanges, SimpleChanges, ChangeDetectionStrategy } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ExpensesServiceService } from 'src/app/services/expenses-service.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { Expense,  } from 'src/app/models/expenses.models';
import { TypeExpenseEnum } from 'src/app/shared/enum/type-expense.enum';

@Component({
  selector: 'app-expenses-add-edit',
  templateUrl: './expenses-add-edit.component.html',
  styleUrls: ['./expenses-add-edit.component.scss']
})
export class ExpensesAddEditComponent implements OnInit, OnDestroy, OnChanges {

  @Input() expense = {} as Expense;
  @ViewChild('myModal', {static: false}) modal= {} as ElementRef;

  formContent: FormGroup = new FormGroup({});
  private destroy$: Subject<void> = new Subject();
  expesensesType=[TypeExpenseEnum.TYPE_TRIP,TypeExpenseEnum.TYPE_RESTAURANT];
  editMode=false;

  constructor(private fb: FormBuilder, private expensesServiceService: ExpensesServiceService) { }

  ngOnInit(): void {
    this.initForm();
  }

  ngOnChanges(changes: SimpleChanges) {
    if(this.expense) {
      this.patchExpensesValues();
    } 
  }
  patchExpensesValues() {
    this.formContent.patchValue({
      nature: this.expense?.nature,
      amount: this.expense?.amount,
      comment: this.expense?.comment,
      purchasedOn: this.expense.purchasedOn,
      updatedAt: this.expense?.updatedAt?.slice(0,10),
      invites: this.expense?.invites,
      distance: this.expense?.distance,
    })
  }

  initForm() {

    this.formContent = this.fb.group(
      {
        nature: [''],
        amount: [''],
        comment: [''],
        purchasedOn: [''],
        updatedAt: [''],
        invites: [''],
        distance: [''],
      }
    );

  }

  changeTypeExpense(e: any) {
    this.formContent?.get('nature')?.setValue(e.target.value);
  }

  getTypeExpenseSelected(): string {
    return this.formContent?.get('nature')?.value;
  }

  open(mode: boolean) {
    this.modal.nativeElement.style.display = 'block';
    this.editMode = mode;
    if(!this.editMode) {
      this.formContent.reset();
    }
  }

  /*
  openEmptyForm() {
    this.modal.nativeElement.style.display = 'block';
    this.formContent.reset();
    this.expense = {} as Expense;
  } */

  close() {
    this.modal.nativeElement.style.display = 'none';
  }

  submitForm() {
    let newId = Math.floor(Math.random() * 6) + 1

    const nature = this.getTypeExpenseSelected();

    let newExpense= {} as Expense;

    if(nature === TypeExpenseEnum.TYPE_TRIP) {
      newExpense  = {
        id: newId,
        nature: this.formContent.get('nature')?.value,
        amount: this.formContent.get('amount')?.value,
        comment: this.formContent.get('comment')?.value,
        purchasedOn: this.formContent.get('purchasedOn')?.value,
        updatedAt: this.formContent.get('updatedAt')?.value,
        distance: this.formContent.get('distance')?.value
      }
    }

    if(nature === TypeExpenseEnum.TYPE_RESTAURANT) {
      newExpense  = {
        id: newId,
        nature: this.formContent.get('nature')?.value,
        amount: this.formContent.get('amount')?.value,
        comment: this.formContent.get('comment')?.value,
        purchasedOn: this.formContent.get('purchasedOn')?.value,
        updatedAt: this.formContent.get('updatedAt')?.value,
        invites: this.formContent.get('invites')?.value
      }
    }

    this.expensesServiceService.addExpense(newExpense)
    .pipe(takeUntil(this.destroy$))
    .subscribe(
      () => {
        this.expensesServiceService.modificationExpense.next(true);
        this.close();
      }
    );

  }

  editForm() {
    const nature = this.getTypeExpenseSelected();

    let expense = this.formContent.value;

    if(nature === TypeExpenseEnum.TYPE_TRIP) {
      delete expense['invites'];
    } 
    else if(nature === TypeExpenseEnum.TYPE_RESTAURANT) {
      delete expense['distance'];
    }
    expense = {
      id: this.expense.id,
      ...expense
    }
    this.expensesServiceService.updateExpense(expense, expense.id)
    .pipe(takeUntil(this.destroy$))
    .subscribe(
      () => {
        this.expensesServiceService.modificationExpense.next(false);
        this.close();
      }
    );

  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

}
