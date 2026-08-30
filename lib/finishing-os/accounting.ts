import type { JournalEntryLine, Money } from './types';

export type AccountMap = {
  cash: string;
  accountsReceivable: string;
  salesRevenue: string;
  salesTaxPayable: string;
  tipsPayable: string;
  processorFees: string;
  uncategorizedExpense: string;
};

const round = (n:number) => Math.round((n + Number.EPSILON) * 100) / 100;

export function assertBalanced(lines: JournalEntryLine[]): void {
  const debits = round(lines.reduce((sum,line)=>sum+line.debit,0));
  const credits = round(lines.reduce((sum,line)=>sum+line.credit,0));
  if (debits !== credits) throw new Error(`Unbalanced journal entry: debits ${debits} credits ${credits}`);
}

export function postInvoice(args:{subtotal:Money; tax:Money; accounts:AccountMap}):JournalEntryLine[]{
  const total=round(args.subtotal+args.tax);
  const lines:JournalEntryLine[]=[
    {accountId:args.accounts.accountsReceivable,debit:total,credit:0,memo:'Customer invoice'},
    {accountId:args.accounts.salesRevenue,debit:0,credit:round(args.subtotal),memo:'Detailing revenue'},
  ];
  if(args.tax>0) lines.push({accountId:args.accounts.salesTaxPayable,debit:0,credit:round(args.tax),memo:'Sales tax collected'});
  assertBalanced(lines);
  return lines;
}

export function postPayment(args:{invoiceAmount:Money; tip:Money; processorFee?:Money; accounts:AccountMap}):JournalEntryLine[]{
  const fee=round(args.processorFee||0);
  const gross=round(args.invoiceAmount+args.tip);
  const net=round(gross-fee);
  const lines:JournalEntryLine[]=[
    {accountId:args.accounts.cash,debit:net,credit:0,memo:'Payment deposit'},
    {accountId:args.accounts.accountsReceivable,debit:0,credit:round(args.invoiceAmount),memo:'Invoice payment'},
  ];
  if(args.tip>0) lines.push({accountId:args.accounts.tipsPayable,debit:0,credit:round(args.tip),memo:'Tip liability'});
  if(fee>0) lines.push({accountId:args.accounts.processorFees,debit:fee,credit:0,memo:'Payment processing fee'});
  assertBalanced(lines);
  return lines;
}

export function postExpense(args:{amount:Money; expenseAccountId?:string; paidFromAccountId:string; accounts:AccountMap}):JournalEntryLine[]{
  const amount=round(args.amount);
  const lines:JournalEntryLine[]=[
    {accountId:args.expenseAccountId||args.accounts.uncategorizedExpense,debit:amount,credit:0,memo:'Business expense'},
    {accountId:args.paidFromAccountId,debit:0,credit:amount,memo:'Expense payment'},
  ];
  assertBalanced(lines);
  return lines;
}

export function grossMargin(args:{revenue:Money; materials:Money; directLabor:Money}){
  const grossProfit=round(args.revenue-args.materials-args.directLabor);
  const pct=args.revenue<=0?0:round(grossProfit/args.revenue*100);
  return {grossProfit,grossMarginPct:pct};
}
