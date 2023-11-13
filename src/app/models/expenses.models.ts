
/**
 *  Model reprensentant une depense
 */

export interface Expense {
    id: number,
    nature: string,
    amount: number,
    comment: string,
    purchasedOn: string,
    updatedAt?: string,
    invites?: number,
    distance?:number
}

/**
 *  Model reprensentant la liste dépenses
 */
export interface  Expenses {
    items: Expense[],
    count: number
}
  
